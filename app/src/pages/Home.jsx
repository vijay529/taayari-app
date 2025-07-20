import React from "react";
import Slider from "../components/Slider.jsx";
import { User, ClipboardList, CheckCircle, BarChart2 } from "lucide-react";

const Home = () => {
  const slidesArr = [1, 2, 3];
  const badges = ['jee', 'neet', 'upsc', 'Btech', 'Mtech'];
  const steps = [
    {
      icon: <User className="w-8 h-8 text-yellow-700" />,
      title: "Sign Up Free",
      description: "Register quickly to access our educational quizzes.",
    },
    {
      icon: <ClipboardList className="w-8 h-8 text-yellow-700" />,
      title: "Choose a Quiz",
      description: "Browse and select quizzes designed to help you prepare for exams.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-yellow-700" />,
      title: "Attempt Questions",
      description: "Answer carefully crafted questions to test and improve your knowledge.",
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-yellow-700" />,
      title: "View Scores & Improve",
      description: "Get instant results and identify areas for improvement in your preparation.",
    },
  ];
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="h-5"></div>
        <div className="flex justify-center w-full h-80">
          <Slider slidesArr={slidesArr} />
        </div>
        <div className="h-5"></div>
        <div className="bg-cyan-500 rounded-sm p-8 w-full max-w-4xl mx-auto shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white text-lg md:text-xl font-medium text-center md:text-left">
            <b>CHALLENGE</b> yourself with exciting questions and see how you
            rank on the leaderboard.
          </p>
          <button className="whitespace-nowrap bg-white text-cyan-700 font-semibold px-6 py-3 rounded-md hover:bg-cyan-100 text-shadow-sm transition-colors duration-300 flex items-center gap-2 max-w-4xl hover:cursor-pointer">
            Start Quiz <span className="text-xl">→</span>
          </button>
        </div>
        <div className="h-10"></div>
        <div className=" px-4 flex items-center justify-between py-4 relative">
          <div className="top-0 left-0 h-full w-12 absolute bg-linear-to-r from-white/60 to-transparent pointer-events-none"></div>
          <div className="top-0 right-0 h-full w-12 absolute bg-linear-to-r from-transparent to-white/60 pointer-events-none"></div>
          {
            badges.map((item,i)=><div key={i} className="text-xl font-bold text-gray-400">{item}</div>)
          }
        </div>
        <div className="container mt-10 p-2 mb-4 bg-[linear-gradient(to_bottom,_#ffffff_0%,_#fef9c3_30%,_#fef9c3_90%,_#ffffff_100%)] ">
          <h1 className="mx-auto w-fit text-4xl text-gray-600 font-bold ">How it Works?</h1>
          <div className="mt-10 flex flex-col gap-2">
            
          {steps.map((item,i)=><div key={i}
            className="backdrop-blur-xl bg-white/80 border border-gray-200 rounded-2xl shadow-xs p-6 flex flex-col items-center text-center transition-transform"
          >
            <div className="bg-yellow-400 p-4 rounded-full mb-4 shadow-md">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-700">{item.description}</p>
          </div>)}
            
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Home;
