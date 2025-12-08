"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import ConfettiExplosion from "react-confetti-explosion";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";

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

    if (selectedOption !== null) return;

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container max-w-full sm:max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 lg:px-8 py-6 sm:py-10 relative"
    >
      {/* HEADER */}
      <div className="text-center mb-6 sm:mb-10">
        <h1 className="text-3xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-orange-800 via-orange-600 to-orange-100 bg-clip-text text-transparent">
          Quiz
        </h1>
        <p className="text-slate-400 text-xs xs:text-sm sm:text-base md:text-lg">
          Test your knowledge and gain valuable insights
        </p>
      </div>

      {/* CONFETTI */}
      {isExploding && typeof window !== "undefined" && (
        <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 z-50">
          <ConfettiExplosion
            width={window.innerWidth}
            height={window.innerHeight}
            particleCount={window.innerWidth < 768 ? 20 : 100}
            force={0.7}
            duration={3000}
            colors={["#000000"]}
          />
        </div>
      )}

      {question && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-2 sm:gap-6 lg:gap-10">
          {/* Question Section */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 sm:mb-4 bg-gradient-to-r from-orange-600 via-orange-300 to-orange-300 text-transparent bg-clip-text">
              Question:
            </h2>
            <p className="text-gray-700 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              {question.question}
            </p>

            {selectedOption && question.explanation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-2 xs:p-3 sm:p-4 rounded-xl bg-gray-50 shadow-md"
              >
                <p className="font-medium text-gray-800 text-xs xs:text-sm sm:text-base">Explanation:</p>
                <p className="text-gray-600 text-xs xs:text-sm sm:text-base mt-1">{question.explanation}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Options Section */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-2 xs:gap-2 sm:gap-4"
          >
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

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={handleNextQuestion}
              className="mt-4 xs:mt-3 sm:mt-6 py-2 xs:py-2 sm:py-3 px-4 xs:px-3 sm:px-6 rounded-xl bg-gradient-to-r from-orange-600 to-orange-300 text-white shadow-lg transition text-xs xs:text-sm sm:text-base md:text-lg"
            >
              Next
            </motion.button>
          </motion.div>
        </div>
      )}
    </motion.div>
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
    return "#ffffff";
  };

  return (
    <motion.label
      whileHover={{ scale: selectedOption ? 1 : 1.02 }}
      transition={{ duration: 0.2 }}
      className="flex justify-between items-center p-2 xs:p-2 sm:p-3 rounded-xl shadow-md cursor-pointer"
      style={{ backgroundColor: getBgColor() }}
      onClick={() => !selectedOption && handleClickOption()}
    >
      <div className="flex items-center gap-2 xs:gap-2 sm:gap-3">
        <input type="radio" name="option" checked={selected} readOnly className="w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
        <p className="text-gray-800 text-xs xs:text-sm sm:text-base md:text-base font-medium">{text}</p>
      </div>

      {selected && !correct && <ImCross className="text-red-600" size={16} />}
      {selectedOption && correct && <TiTick className="text-green-600" size={20} />}
    </motion.label>
  );
};

export default Quiz;
