import React, { useEffect, useState } from 'react';
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { serverUrl } from './ServerUrl';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ConfettiExplosion from 'react-confetti-explosion';

const Quiz = ({ setAnalyticUpdate }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [playedQuestion, setPlayedQuestion] = useState(0);
  const auth = useSelector(state => state.auth);  // Check the authentication state
  const [isExploding, setIsExploding] = useState(false);
  const isMobileWidth = window.innerWidth < 1024;
  const navigate = useNavigate(); // Hook to navigate to the login page

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/quiz/get-quiz`);
        setQuestions(response.data);
        const randomNum = Math.floor(Math.random() * response?.data?.length);
        setCurrentQuestion(randomNum);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, []);

  const handleClickOption = async (index) => {
    if (!auth.userId) {
      // Redirect to the login page if not logged in
      window.scrollTo(0, 0)
      navigate('/login'); // Change '/login' to your actual login route if needed
      return;
    }

    const correct = index === questions[currentQuestion].correctAnswer;

    if (correct) {
      setIsExploding(true);
      setTimeout(() => {
        setIsExploding(false);
      }, 3000);
    }

    if (auth?.userId) {
      const sendData = {
        userId: auth.userId,
        quizId: questions[currentQuestion]._id,
        correct,
        choose_option: index + 1,
        time_taken: "5:30"
      };

      try {
        const response = await axios.post(`${serverUrl}/quiz/quiz-analytic-save`, sendData);
        if (response.status === 200 && typeof setAnalyticUpdate === 'function') {
          setAnalyticUpdate(prev => prev + 1);
        }
      } catch (error) {
        alert('Error while saving quiz:', error);
        console.error('Error fetching quiz data:', error);
      }
    }
    setSelectedOption(index + 1);
    setPlayedQuestion(playedQuestion + 1);
  };

  const handleNextQuestion = async () => {
    if (selectedOption === null) {
      alert('Please select an option!');
      return;
    }

    // Prevent quiz progression if the user is not logged in
    if (!auth?.userId) {
      navigate('/login'); // Redirect to login page
      return;
    }

    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    const randomNum = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(randomNum);
  };

  const question = questions && questions[currentQuestion];

  return (
    <>
      <div className="container mx-auto px-4 py-10">
        {isExploding && (
          <div className="w-full h-full flex justify-center items-center absolute top-0 left-0">
            <ConfettiExplosion
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={isMobileWidth ? 20 : 100}
              explosionSpeed={1}
              explosionRadius={100}
              explosionColor="#000000"
            />
          </div>
        )}

        <div className="banner">
          <div className="text-center">
            <h1 className="color-linear d-inline-block mb-30">Quiz</h1>
            <h5 className="text-lg text-center color-gray-500 mb-50">Test your knowledge and gain valuable insights</h5>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-12 mt-100">
                  <h2 className="color-linear d-inline-block wow animate__animated animate__fadeInUp mb-20"><b>Question: </b></h2>
                  <p className="text-base text-lg color-gray-600 wow animate__animated animate__fadeInUp">{question?.question}</p>
                  {
                    selectedOption &&
                    <>
                      <p className="text-base color-gray-600 border-none rounded px-3 py-2">Explanation of the Answer</p>
                      <p className="text-base text-sm color-gray-600 wow animate__animated animate__fadeInUp mt-2">{question?.explanation}</p>
                    </>
                  }
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              {questions && questions[currentQuestion] && (
                <>
                  {questions[currentQuestion].options.map((option, index) => (
                    <QuizOption
                      key={index}
                      label={index + 1}
                      text={option}
                      handleClickOption={() => handleClickOption(index)}
                      correct={index === questions[currentQuestion].correctAnswer}
                      selected={selectedOption === index + 1}
                      selectedOption={selectedOption}
                    />
                  ))}
                </>
              )}

              <button
                className="btn btn-linear d-sm-inline-block hover-up hover-shadow text-sm"
                onClick={handleNextQuestion}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const QuizOption = ({ selected, correct, selectedOption, handleClickOption, text }) => (
  <label
    className="form-control border color-gray-500 mb-50 d-flex text-sm"
    style={{
      justifyContent: "space-between",
      backgroundColor: selected
        ? correct
          ? "#d1fae5" // Green background for correct selection
          : "#fee2e2" // Red background for incorrect selection
        : selectedOption && correct
        ? "#d1fae5"
        : "",
      borderColor: selected
        ? correct
          ? "#10b981" // Green border for correct
          : "#ef4444" // Red border for incorrect
        : selectedOption && correct
        ? "#10b981"
        : "#1f2937", // Default border color
    }}
    onClick={!selectedOption ? handleClickOption : undefined}
  >
    <label className="d-flex">
      <input type="radio" name="option" checked={selected} readOnly />
      <div>
        <p className="font-semibold text-[.9rem] text-blue2">{text}</p>
      </div>
    </label>
    {selected && !correct && <ImCross style={{ color: "#dc3545" }} />}
    {selectedOption && correct && <TiTick fontSize={26} style={{ color: "#28a745" }} />}
  </label>
);

export default Quiz;
