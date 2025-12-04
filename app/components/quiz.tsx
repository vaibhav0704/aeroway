"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import ConfettiExplosion from "react-confetti-explosion";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { RootState } from "@/redux/store";

interface QuizQuestion {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizProps {
  setAnalyticUpdate?: (update: number | ((prev: number) => number)) => void;
}

const Quiz: React.FC<QuizProps> = ({ setAnalyticUpdate }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [playedQuestion, setPlayedQuestion] = useState<number>(0);
  const [isExploding, setIsExploding] = useState<boolean>(false);

  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const isMobileWidth =
    typeof window !== "undefined" ? window.innerWidth < 1024 : false;

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get<QuizQuestion[]>(`/api/quiz/get-quiz`);
        setQuestions(response.data);
        const randomNum = Math.floor(Math.random() * response.data.length);
        setCurrentQuestion(randomNum);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchQuizData();
  }, []);

  const handleClickOption = async (index: number) => {
    if (!auth.userId) {
      router.push("/login");
      return;
    }

    if (selectedOption !== null) return; // prevent double request

    const correct = index === questions[currentQuestion].correctAnswer;

    if (correct) {
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 3000);
    }

    const sendData = {
      userId: auth.userId,
      quizId: questions[currentQuestion]._id,
      correct,
      choose_option: index + 1,
      time_taken: "5:30",
    };

    try {
      const response = await axios.post("/api/quiz/analytic-save", sendData);
      if (response.status === 200 && setAnalyticUpdate) {
        setAnalyticUpdate((prev) => (typeof prev === "number" ? prev + 1 : 1));
      }
    } catch (error) {
      alert("Error while saving quiz");
      console.error("Error saving quiz:", error);
    }

    setSelectedOption(index + 1);
    setPlayedQuestion((prev) => prev + 1);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      alert("Please select an option!");
      return;
    }

    if (!auth.userId) {
      router.push("/login");
      return;
    }

    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setSelectedOption(null);
    const randomNum = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(randomNum);
  };

  const question = questions[currentQuestion];

  return (
    <div className="container max-w-screen xl:max-w-7xl mx-auto px-4 py-10 xl:px-10 relative">
      {isExploding && typeof window !== "undefined" && (
        <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 z-50">
          <ConfettiExplosion
            width={window.innerWidth}
            height={window.innerHeight}
            particleCount={isMobileWidth ? 20 : 100}
            force={0.7}
            duration={3000}
            colors={["#000000"]}
          />
        </div>
      )}

      {question && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-4xl font-semibold bg-linear-to-r from-orange-600 via-orange-300 to-orange-300 text-transparent bg-clip-text mb-2">
              Question:
            </h2>
            <p className="text-gray-700 mb-4">{question.question}</p>

            {selectedOption && question.explanation && (
              <div className="mt-4 p-3 border rounded bg-gray-50">
                <p className="font-medium">Explanation:</p>
                <p className="text-gray-600">{question.explanation}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {question.options.map((option, index) => (
              <QuizOption
                key={index}
                text={option}
                selected={selectedOption === index + 1}
                correct={index === question.correctAnswer}
                selectedOption={selectedOption}
                handleClickOption={() => handleClickOption(index)}
              />
            ))}

            <button
              onClick={handleNextQuestion}
              className="mt-4 py-2 px-4 w-fit rounded bg-linear-to-r text-white from-orange-600 to-orange-300 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface QuizOptionProps {
  selected: boolean;
  correct: boolean;
  selectedOption: number | null;
  handleClickOption: () => void;
  text: string;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  selected,
  correct,
  selectedOption,
  handleClickOption,
  text,
}) => {
  const getBgColor = () => {
    if (selected) return correct ? "#d1fae5" : "#fee2e2";
    if (selectedOption && correct) return "#d1fae5";
    return "#fff";
  };

  const getBorderColor = () => {
    if (selected) return correct ? "#10b981" : "#ef4444";
    if (selectedOption && correct) return "#10b981";
    return "#1f2937";
  };

  return (
    <label
      className="flex justify-between items-center border p-3 rounded cursor-pointer transition"
      style={{ backgroundColor: getBgColor(), borderColor: getBorderColor() }}
    >
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name="option"
          checked={selected}
          readOnly
          onClick={() => !selectedOption && handleClickOption()}
        />
        <p className="text-gray-800 font-medium">{text}</p>
      </div>

      {selected && !correct && <ImCross className="text-red-600" />}
      {selectedOption && correct && <TiTick className="text-green-600" />}
    </label>
  );
};

export default Quiz;
