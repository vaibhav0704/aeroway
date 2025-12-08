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
  correctAnswer: number; // index (0-based)
  explanation?: string;
}

interface QuizProps {
  setAnalyticUpdate?: (update: number | ((prev: number) => number)) => void;
}

const Quiz: React.FC<QuizProps> = ({ setAnalyticUpdate }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isExploding, setIsExploding] = useState(false);

  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 1024 : false;

  // FETCH QUIZ DATA
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const res = await axios.get<QuizQuestion[]>(`/api/quiz/get-quiz`);
        setQuestions(res.data);

        // random question
        const randomIndex = Math.floor(Math.random() * res.data.length);
        setCurrentQuestion(randomIndex);
      } catch (err) {
        console.error("Error fetching quiz data:", err);
      }
    };

    fetchQuizData();
  }, []);

  const handleClickOption = async (index: number) => {
    if (!auth.userId) {
      router.push("/login");
      return;
    }

    // prevent double clicking
    if (selectedOption !== null) return;

    const correct = index === questions[currentQuestion].correctAnswer;

    if (correct) {
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 3500);
    }

    const sendData = {
      userId: auth.userId,
      quizId: questions[currentQuestion]._id,
      correct,
      choose_option: index + 1,
      time_taken: "5:30",
    };

    try {
      const resp = await axios.post("/api/quiz/analytic-save", sendData);

      if (resp.status === 200 && setAnalyticUpdate) {
        setAnalyticUpdate((prev) => (typeof prev === "number" ? prev + 1 : 1));
      }
    } catch (err) {
      console.error("Error saving analytic:", err);
      alert("Error while saving quiz");
    }

    setSelectedOption(index);
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

    // add score
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setSelectedOption(null);

    // new random question
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(randomIndex);
  };

  const question = questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container max-w-screen xl:max-w-7xl mx-auto px-4 py-10 xl:px-10 relative"
    >
      {/* Heading */}
      <div className="mb-10 text-center">
        <h4
          className="text-6xl mb-3 
          bg-linear-to-r from-orange-600 via-orange-500 to-orange-200
          text-transparent bg-clip-text"
        >
          Quiz
        </h4>
        <p className="text-slate-500 text-lg">
          Test your knowledge and gain valuable insights
        </p>
      </div>

      {/* CONFETTI */}
      {isExploding && typeof window !== "undefined" && (
        <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 z-50">
          <ConfettiExplosion
            width={window.innerWidth}
            height={window.innerHeight}
            particleCount={isMobile ? 20 : 100}
            force={0.7}
            duration={3000}
          />
        </div>
      )}

      {/* MAIN QUIZ */}
      {question && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: QUESTION */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-4xl font-semibold bg-linear-to-r from-orange-600 via-orange-300 to-orange-300 text-transparent bg-clip-text mb-4">
              Question:
            </h2>

            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              {question.question}
            </p>

            {/* Explanation */}
            {selectedOption !== null && question.explanation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-4 rounded-xl bg-gray-50 shadow-md"
              >
                <p className="font-medium text-gray-800">Explanation:</p>
                <p className="text-gray-600 mt-1">{question.explanation}</p>
              </motion.div>
            )}
          </motion.div>

          {/* RIGHT: OPTIONS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-4"
          >
            {question.options.map((option, index) => (
              <QuizOption
                key={index}
                text={option}
                index={index}
                selectedOption={selectedOption}
                correctIndex={question.correctAnswer}
                handleClickOption={() => handleClickOption(index)}
              />
            ))}

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={handleNextQuestion}
              className="mt-4 py-3 px-6 rounded-xl bg-linear-to-r text-white from-orange-600 to-orange-300 shadow-lg transition font-medium"
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
  text: string;
  index: number;
  selectedOption: number | null;
  correctIndex: number;
  handleClickOption: () => void;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  text,
  index,
  selectedOption,
  correctIndex,
  handleClickOption,
}) => {
  const isSelected = selectedOption === index;
  const isCorrect = correctIndex === index;

  const bg = isSelected
    ? isCorrect
      ? "bg-green-100"
      : "bg-red-100"
    : selectedOption !== null && isCorrect
    ? "bg-green-100"
    : "bg-white";

  return (
    <motion.label
      whileHover={{ scale: selectedOption === null ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
      className={`flex justify-between items-center p-4 rounded-xl shadow-md cursor-pointer ${bg}`}
      onClick={() => selectedOption === null && handleClickOption()}
    >
      <div className="flex items-center gap-3">
        <input type="radio" checked={isSelected} readOnly />
        <p className="text-gray-800 font-medium">{text}</p>
      </div>

      {isSelected && !isCorrect && <ImCross className="text-red-600" size={20} />}
      {selectedOption !== null && isCorrect && (
        <TiTick className="text-green-600" size={24} />
      )}
    </motion.label>
  );
};

export default Quiz;
