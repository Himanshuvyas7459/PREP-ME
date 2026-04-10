import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearQuestions } from "../features/questions/questionslice.js";

/* DYNAMIC FALLBACK ENGINE */

const categoriesList = [
  "JavaScript","React","Node.js","Python","Java","C++",
  "Frontend","Backend","DevOps","AWS","Docker",
  "Kubernetes","SQL","MongoDB","TypeScript"
];

const difficultiesList = ["Easy", "Medium", "Hard"];

const topics = {
  JavaScript: ["closures","event loop","hoisting","promises","DOM"],
  React: ["hooks","state","props","useEffect","virtual DOM"],
  "Node.js": ["event loop","API","middleware"],
  Python: ["lists","OOP","decorators"],
  Java: ["JVM","OOP","collections"],
  "C++": ["pointers","memory"],
  Frontend: ["HTML","CSS","responsive design"],
  Backend: ["API","authentication"],
  DevOps: ["CI/CD","monitoring"],
  AWS: ["EC2","S3"],
  Docker: ["containers","images"],
  Kubernetes: ["pods","clusters"],
  SQL: ["joins","queries"],
  MongoDB: ["documents"],
  TypeScript: ["types","interfaces"],
};

const generateFallbackQuestions = (count = 20) => {
  let id = 1;
  const result = [];

  categoriesList.forEach((cat) => {
    for (let i = 0; i < count; i++) {
      const topic =
        topics[cat][Math.floor(Math.random() * topics[cat].length)];

      const difficulty =
        difficultiesList[Math.floor(Math.random() * 3)];

      result.push({
        id: id++,
        category: cat,
        difficulty,
        question: `Explain ${topic} in ${cat}?`,
        answers: `${topic} is an important concept in ${cat}.`,
      });
    }
  });

  return result;
};

/* MAIN COMPONENT */


function Questions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {
    allQuestions,
    questionsLoading,
    questionsError,
    questionsErrorMessage,
  } = useSelector((state) => state.question);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  /* AUTH + ERROR */
  useEffect(() => {
    if (!user) navigate("/login");

    if (questionsError && questionsErrorMessage) {
      toast.error(questionsErrorMessage);
    }
  }, [user, navigate, questionsError, questionsErrorMessage]);

  /* CACHE */
  useEffect(() => {
    if (allQuestions?.length) {
      localStorage.setItem("cachedQuestions", JSON.stringify(allQuestions));
    }
  }, [allQuestions]);

  const cachedQuestions =
    JSON.parse(localStorage.getItem("cachedQuestions")) || [];

  /* FALLBACK GENERATION */
  const generatedFallback = useMemo(() => generateFallbackQuestions(20), []);

  /* FINAL LOGIC */
  const isUsingFallback =
    questionsError || !navigator.onLine;

  const questions =
    allQuestions && allQuestions.length > 0
      ? allQuestions
      : cachedQuestions.length > 0
      ? cachedQuestions
      : generatedFallback;

  /* FILTERS */
  const categories = ["All", ...categoriesList];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const categoryMatch =
        selectedCategory === "All" || q.category === selectedCategory;

      const difficultyMatch =
        selectedDifficulty === "All" ||
        q.difficulty === selectedDifficulty;

      return categoryMatch && difficultyMatch;
    });
  }, [questions, selectedCategory, selectedDifficulty]);

  /* UI HELPERS */
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Hard": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const addNewInformation = () => {
    dispatch(clearQuestions());
    navigate("/profile");
  };

  if (questionsLoading && !questions.length) {
    return (
      <p className="text-gray-400 text-2xl h-screen flex justify-center items-center">
        Loading...
      </p>
    );
  }

  const isFilterActive =
    selectedCategory !== "All" || selectedDifficulty !== "All";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Your AI-Generated Questions
          </h2>
        </div>

        {/* FALLBACK MESSAGE */}
        {isUsingFallback && (
          <p className="text-yellow-600 text-center mb-6 font-semibold">
            ⚠️ Offline / API issue → Showing smart practice questions
          </p>
        )}

        {/* FILTERS */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="font-bold mb-4">Category</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === cat
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <h3 className="font-bold mb-4">Difficulty</h3>
          <div className="flex gap-2 flex-wrap">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-4 py-2 rounded-full ${
                  selectedDifficulty === diff
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {isFilterActive && (
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedDifficulty("All");
              }}
              className="mt-4 underline text-sm"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* COUNT */}
        <p className="text-center mb-6 font-semibold">
          Showing {filteredQuestions.length} of {questions.length}
        </p>

        {/* QUESTIONS */}
        <div className="grid gap-6">
          {filteredQuestions.map((q, i) => (
            <div key={q.id || i} className="bg-white p-6 rounded-2xl shadow">
              <div className="flex justify-between mb-2">
                <span className="text-purple-600 font-bold">#{q.id}</span>
                <span className={getDifficultyColor(q.difficulty)}>
                  {q.difficulty}
                </span>
              </div>
              <p className="font-medium">Q. {q.question}</p>
              <p className="text-gray-600 mt-2">Ans: {q.answers}</p>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="text-center mt-10">
          <button
            onClick={addNewInformation}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full"
          >
            Add New Information
          </button>
        </div>

      </div>
    </div>
  );
}

export default Questions;
















// import { useState, useMemo, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import { toast } from "react-toastify";
// import { clearQuestions } from "../features/questions/questionslice.js";

// /* FALLBACK QUESTIONS */
// const fallbackQuestions = [
//   {
//     id: 1,
//     category: "JavaScript",
//     difficulty: "Easy",
//     question: "What is closure in JavaScript?",
//     answers:
//       "A closure is a function that remembers variables from its outer scope.",
//   },
//   {
//     id: 2,
//     category: "React",
//     difficulty: "Medium",
//     question: "What are React hooks?",
//     answers:
//       "Hooks allow you to use state and lifecycle features in functional components.",
//   },
//   {
//     id: 3,
//     category: "Node.js",
//     difficulty: "Medium",
//     question: "What is event loop?",
//     answers:
//       "It handles asynchronous operations in Node.js using a non-blocking architecture.",
//   },
//   {
//     id: 4,
//     category: "Python",
//     difficulty: "Easy",
//     question: "What is a list in Python?",
//     answers:
//       "A list is a mutable, ordered collection of elements in Python.",
//   },
//    {
//       id: 5,
//       category: "JavaScript",
//       difficulty: "Easy",
//       question: "What is JavaScript?",
//       answers: "JavaScript is a programming language used for web development."
//     },
//     {
//       id: 6,
//       category: "JavaScript",
//       difficulty: "Easy",
//       question: "What are variables?",
//       answers: "Variables store data values."
//     },
//     {
//       id: 7,
//       category: "JavaScript",
//       difficulty: "Easy",
//       question: "Difference between var, let, const?",
//       answers: "var is function scoped, let & const are block scoped."
//     },
//     {
//       id: 8,
//       category: "JavaScript",
//       difficulty: "Medium",
//       question: "What is hoisting?",
//       answers: "Variables and functions are moved to top of scope."
//     },
//     {
//       id: 9,
//       category: "JavaScript",
//       difficulty: "Medium",
//       question: "What is event loop?",
//       answers: "Handles async operations in JS."
//     },
//     {
//       id: 10,
//       category: "JavaScript",
//       difficulty: "Hard",
//       question: "Explain promises.",
//       answers: "Promises handle async operations with resolve/reject."
//     },
//     {
//       id: 11,
//       category: "JavaScript",
//       difficulty: "Hard",
//       question: "What is async/await?",
//       answers: "Syntactic sugar over promises."
//     },
//     {
//       id: 12,
//       category: "JavaScript",
//       difficulty: "Medium",
//       question: "What is DOM?",
//       answers: "Document Object Model representing HTML structure."
//     },
//     {
//       id: 13,
//       category: "JavaScript",
//       difficulty: "Easy",
//       question: "What is array?",
//       answers: "Collection of elements."
//     },
//     {
//       id: 14,
//       category: "JavaScript",
//       difficulty: "Easy",
//       question: "What is object?",
//       answers: "Key-value pair structure."
//     },
//     {
//       id: 15,
//       category: "JavaScript",
//       difficulty: "Medium",
//       question: "What is this keyword?",
//       answers: "Refers to current object."
//     },
//     {
//       id: 16,
//       category: "JavaScript",
//       difficulty: "Medium",
//       question: "Difference between == and ===?",
//       answers: "== compares value, === compares value + type."
//     },
//     {
//       id: 17,
//       category: "JavaScript",
//       difficulty: "Medium",
//       question: "What is callback?",
//       answers: "Function passed as argument."
//     },
//     {
//       id: 18,
//       category: "JavaScript",
//       difficulty: "Hard",
//       question: "What is debouncing?",
//       answers: "Limits function calls."
//     },
//     {
//       id: 19,
//       category: "JavaScript",
//       difficulty: "Hard",
//       question: "What is throttling?",
//       answers: "Controls execution rate."
//     },
//     {
//       id: 20,
//       category: "JavaScript",
//       difficulty: "Medium",
//       question: "What is JSON?",
//       answers: "Data format for storing/transferring."
//     },
//     {
//       id: 21,
//       category: "JavaScript",
//       difficulty: "Easy",
//       question: "What is function?",
//       answers: "Reusable block of code."
//     },
//     {
//       id: 22,
//       category: "JavaScript",
//       difficulty: "Medium",
//       question: "What is arrow function?",
//       answers: "Short syntax for functions."
//     },
//     {
//       id: 23,
//       category: "JavaScript",
//       difficulty: "Medium",
//       question: "What is map()?",
//       answers: "Transforms array elements."
//     },
//     {
//       id: 24,
//       category: "JavaScript",
//       difficulty: "Medium",
//       question: "What is filter()?",
//       answers: "Filters array elements."
//     },
//     {
//       id: 25,
//       category: "JavaScript",
//       difficulty: "Medium",
//       question: "What is reduce()?",
//       answers: "Reduces array to single value."
//     },
//     {
//       id: 26,
//       category: "JavaScript",
//       difficulty: "Hard",
//       question: "Explain prototype.",
//       answers: "Object inheritance mechanism."
//     },
//     {
//       id: 27,
//       category: "JavaScript",
//       difficulty: "Hard",
//       question: "What is currying?",
//       answers: "Function returning another function."
//     },
//     {
//       id: 28,
//       category: "JavaScript",
//       difficulty: "Hard",
//       question: "What is event delegation?",
//       answers: "Handling events using parent element."
//     },
//     {
//       id: 29,
//       category: "React",
//       difficulty: "Easy",
//       question: "What is React?",
//       answers: "A JavaScript library for building UI."
//     },
//     {
//       id: 30,
//       category: "React",
//       difficulty: "Easy",
//       question: "What is component?",
//       answers: "Reusable UI block."
//     },
//     {
//       id: 31,
//       category: "React",
//       difficulty: "Easy",
//       question: "What is JSX?",
//       answers: "Syntax extension for JavaScript."
//     },
//     {
//       id: 32,
//       category: "React",
//       difficulty: "Medium",
//       question: "What are props?",
//       answers: "Data passed to components."
//     },
//     {
//       id: 33,
//       category: "React",
//       difficulty: "Medium",
//       question: "What is state?",
//       answers: "Component data that can change."
//     },
//     {
//       id: 34,
//       category: "React",
//       difficulty: "Medium",
//       question: "What are hooks?",
//       answers: "Functions to use state and lifecycle."
//     },
//     {
//       id: 35,
//       category: "React",
//       difficulty: "Medium",
//       question: "What is useState?",
//       answers: "Hook for managing state."
//     },
//     {
//       id: 36,
//       category: "React",
//       difficulty: "Medium",
//       question: "What is useEffect?",
//       answers: "Hook for side effects."
//     },
//     {
//       id: 37,
//       category: "React",
//       difficulty: "Hard",
//       question: "What is virtual DOM?",
//       answers: "Lightweight copy of real DOM."
//     },
//     {
//       id: 38,
//       category: "React",
//       difficulty: "Medium",
//       question: "What is key in list?",
//       answers: "Unique identifier for elements."
//     },
//     {
//       id: 39,
//       category: "React",
//       difficulty: "Medium",
//       question: "What is controlled component?",
//       answers: "Form controlled by state."
//     },
//     {
//       id: 40,
//       category: "React",
//       difficulty: "Medium",
//       question: "What is uncontrolled component?",
//       answers: "Uses DOM instead of state."
//     },
//     {
//       id: 41,
//       category: "React",
//       difficulty: "Hard",
//       question: "What is context API?",
//       answers: "Global state management tool."
//     },
//     {
//       id: 42,
//       category: "React",
//       difficulty: "Hard",
//       question: "What is Redux?",
//       answers: "State management library."
//     },
//     {
//       id: 43,
//       category: "React",
//       difficulty: "Medium",
//       question: "What is props drilling?",
//       answers: "Passing props deeply."
//     },
//     {
//       id: 44,
//       category: "React",
//       difficulty: "Medium",
//       question: "What is lazy loading?",
//       answers: "Loading components on demand."
//     },
//     {
//       id: 45,
//       category: "React",
//       difficulty: "Medium",
//       question: "What is memo?",
//       answers: "Prevents unnecessary re-renders."
//     },
//     {
//       id: 46,
//       category: "React",
//       difficulty: "Medium",
//       question: "What is useRef?",
//       answers: "Access DOM or persist values."
//     },
//     {
//       id: 47,
//       category: "React",
//       difficulty: "Hard",
//       question: "What is reconciliation?",
//       answers: "Diffing algorithm for DOM updates."
//     },
//     {
//       id: 48,
//       category: "React",
//       difficulty: "Hard",
//       question: "What are higher-order components?",
//       answers: "Functions that enhance components."
//     },
//     {
//       id: 49,
//       category: "React",
//       difficulty: "Medium",
//       question: "What is fragment?",
//       answers: "Group elements without extra DOM."
//     },
//     {
//       id: 50,
//       category: "React",
//       difficulty: "Medium",
//       question: "What is router?",
//       answers: "Handles navigation."
//     },
//     {
//       id: 51,
//       category: "React",
//       difficulty: "Hard",
//       question: "What is SSR?",
//       answers: "Server-side rendering."
//     },
//     {
//       id: 52,
//       category: "React",
//       difficulty: "Hard",
//       question: "What is hydration?",
//       answers: "Attaching React to server HTML."
//     },
//     {
//       id: 53,
//       category: "React",
//       difficulty: "Medium",
//       question: "What is strict mode?",
//       answers: "Tool for highlighting issues."
//     }
  
// ];

// function Questions() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user } = useSelector((state) => state.auth);
//   const {
//     allQuestions,
//     questionsLoading,
//     questionsError,
//     questionsErrorMessage,
//   } = useSelector((state) => state.question);

//   /* FILTER STATES */
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedDifficulty, setSelectedDifficulty] = useState("All");

//   /* AUTH + ERROR HANDLING */
//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     }

//     if (questionsError && questionsErrorMessage) {
//       toast.error(questionsErrorMessage);
//     }
//   }, [user, navigate, questionsError, questionsErrorMessage]);

//   /* CACHE LAST SUCCESSFUL QUESTIONS */
//   useEffect(() => {
//     if (allQuestions?.length) {
//       localStorage.setItem(
//         "cachedQuestions",
//         JSON.stringify(allQuestions)
//       );
//     }
//   }, [allQuestions]);

//   const cachedQuestions = JSON.parse(
//     localStorage.getItem("cachedQuestions")
//   );

//   /* FALLBACK LOGIC */
//   const isUsingFallback =
//     questionsError || !navigator.onLine || !allQuestions?.length;

//   const questions = isUsingFallback
//     ? cachedQuestions || fallbackQuestions
//     : allQuestions;

//   /* FILTER DATA */
//   const categories = [
//     "All",
//     "Python",
//     "JavaScript",
//     "React",
//     "Node.js",
//     "Frontend",
//     "Backend",
//     "DevOps",
//     "Java",
//     "C++",
//     "AWS",
//     "Docker",
//     "Kubernetes",
//     "SQL",
//     "MongoDB",
//     "TypeScript",
//   ];

//   const difficulties = ["All", "Easy", "Medium", "Hard"];

//   const filteredQuestions = useMemo(() => {
//     return questions.filter((q) => {
//       const categoryMatch =
//         selectedCategory === "All" || q.category === selectedCategory;

//       const difficultyMatch =
//         selectedDifficulty === "All" ||
//         q.difficulty === selectedDifficulty;

//       return categoryMatch && difficultyMatch;
//     });
//   }, [questions, selectedCategory, selectedDifficulty]);

//   /* UI HELPERS */
//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case "Easy":
//         return "bg-green-100 text-green-700";
//       case "Medium":
//         return "bg-yellow-100 text-yellow-700";
//       case "Hard":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   const addNewInformation = () => {
//     dispatch(clearQuestions());
//     navigate("/profile");
//   };

//   /* LOADING ONLY */
//   if (questionsLoading && !questions.length) {
//     return (
//       <p className="text-gray-400 text-2xl h-screen flex justify-center items-center">
//         Loading...
//       </p>
//     );
//   }

//   const isFilterActive =
//     selectedCategory !== "All" || selectedDifficulty !== "All";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
//       <div className="max-w-5xl mx-auto">

//         {/* HEADER */}
//         <div className="text-center mb-12">
//           <h2 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
//             Your AI-Generated Questions
//           </h2>
//           <p className="text-gray-600 text-lg">
//             Personalized interview questions based on your profile
//           </p>
//         </div>

//         {/* ⚠️ FALLBACK MESSAGE */}
//         {isUsingFallback && (
//           <p className="text-yellow-600 text-center mb-6 font-semibold">
//             ⚠️ Showing temporary questions (Offline / API unavailable)
//           </p>
//         )}

//         {/* FILTERS */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
//           <h3 className="text-lg font-bold mb-4">Category</h3>
//           <div className="flex flex-wrap gap-2 mb-6">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setSelectedCategory(cat)}
//                 className={`px-4 py-2 rounded-full ${
//                   selectedCategory === cat
//                     ? "bg-purple-600 text-white"
//                     : "bg-gray-100"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           <h3 className="text-lg font-bold mb-4">Difficulty</h3>
//           <div className="flex flex-wrap gap-2">
//             {difficulties.map((diff) => (
//               <button
//                 key={diff}
//                 onClick={() => setSelectedDifficulty(diff)}
//                 className={`px-4 py-2 rounded-full ${
//                   selectedDifficulty === diff
//                     ? "bg-purple-600 text-white"
//                     : "bg-gray-100"
//                 }`}
//               >
//                 {diff}
//               </button>
//             ))}
//           </div>

//           {isFilterActive && (
//             <button
//               onClick={() => {
//                 setSelectedCategory("All");
//                 setSelectedDifficulty("All");
//               }}
//               className="mt-4 underline text-sm"
//             >
//               Clear Filters
//             </button>
//           )}
//         </div>

//         {/* COUNT */}
//         <p className="mb-6 text-center font-semibold">
//           Showing {filteredQuestions.length} of {questions.length} questions
//         </p>

//         {/* QUESTIONS */}
//         {filteredQuestions.length > 0 ? (
//           <div className="grid gap-6">
//             {filteredQuestions.map((item, index) => (
//               <div
//                 key={item.id || index}
//                 className="bg-white p-6 rounded-2xl shadow-lg"
//               >
//                 <div className="flex justify-between mb-2">
//                   <span className="text-purple-600 font-bold">
//                     #{item.id}
//                   </span>
//                   <span className={getDifficultyColor(item.difficulty)}>
//                     {item.difficulty}
//                   </span>
//                 </div>

//                 <p className="font-medium text-lg">
//                   Q. {item.question}
//                 </p>

//                 <p className="text-gray-600 mt-2">
//                   Ans: {item.answers}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-600">
//             No questions found
//           </p>
//         )}

//         {/* BUTTON */}
//         <div className="text-center mt-10">
//           <button
//             onClick={addNewInformation}
//             className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full"
//           >
//             Add New Information
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Questions;









































// import { useState, useMemo, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import { toast } from "react-toastify";
// import { clearQuestions } from "../features/questions/questionslice.js";

// function Questions() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user } = useSelector((state) => state.auth);
//   const {
//     allQuestions,
//     questionsLoading,
//     questionsError,
//     questionsErrorMessage,
//   } = useSelector((state) => state.question);

//   // hooks at top (VERY IMPORTANT)
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedDifficulty, setSelectedDifficulty] = useState("All");

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     }

//     if (questionsError && questionsErrorMessage) {
//       toast.error(questionsErrorMessage);
//     }
//   }, [user, navigate, questionsError, questionsErrorMessage]);

//   const questions = allQuestions || [];

//   const categories = [
//     "All","Python","JavaScript","React","Node.js","Frontend",
//     "Backend","DevOps","Java","C++","AWS","Docker",
//     "Kubernetes","SQL","MongoDB","TypeScript",
//   ];

//   const difficulties = ["All", "Easy", "Medium", "Hard"];

//   const filteredQuestions = useMemo(() => {
//     return questions.filter((q) => {
//       const categoryMatch =
//         selectedCategory === "All" || q.category === selectedCategory;

//       const difficultyMatch =
//         selectedDifficulty === "All" || q.difficulty === selectedDifficulty;

//       return categoryMatch && difficultyMatch;
//     });
//   }, [questions, selectedCategory, selectedDifficulty]);

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case "Easy":
//         return "bg-green-100 text-green-700";
//       case "Medium":
//         return "bg-yellow-100 text-yellow-700";
//       case "Hard":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   const addNewInformation = () => {
//     dispatch(clearQuestions());
//     navigate("/profile");
//   };

//   // safe returns AFTER hooks
//   if (questionsLoading) {
//     return (
//       <p className="text-gray-400 text-2xl h-screen flex justify-center items-center">
//         Loading...
//       </p>
//     );
//   }

//   if (questionsError) {
//     return (
//       <p className="text-red-400 text-2xl h-screen flex justify-center items-center">
//         {questionsErrorMessage}
//       </p>
//     );
//   }

//   const isFilterActive =
//     selectedCategory !== "All" || selectedDifficulty !== "All";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
//       <div className="max-w-5xl mx-auto">

//         {/* HEADER */}
//         <div className="text-center mb-12">
//           <h2 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
//             Your AI-Generated Questions
//           </h2>
//           <p className="text-gray-600 text-lg">
//             Personalized interview questions based on your profile
//           </p>
//         </div>

//         {/* FILTERS */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
//           <h3 className="text-lg font-bold mb-4">Category</h3>
//           <div className="flex flex-wrap gap-2 mb-6">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setSelectedCategory(cat)}
//                 className={`px-4 py-2 rounded-full ${
//                   selectedCategory === cat
//                     ? "bg-purple-600 text-white"
//                     : "bg-gray-100"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           <h3 className="text-lg font-bold mb-4">Difficulty</h3>
//           <div className="flex flex-wrap gap-2">
//             {difficulties.map((diff) => (
//               <button
//                 key={diff}
//                 onClick={() => setSelectedDifficulty(diff)}
//                 className={`px-4 py-2 rounded-full ${
//                   selectedDifficulty === diff
//                     ? "bg-purple-600 text-white"
//                     : "bg-gray-100"
//                 }`}
//               >
//                 {diff}
//               </button>
//             ))}
//           </div>

//           {isFilterActive && (
//             <button
//               onClick={() => {
//                 setSelectedCategory("All");
//                 setSelectedDifficulty("All");
//               }}
//               className="mt-4 underline text-sm"
//             >
//               Clear Filters
//             </button>
//           )}
//         </div>

//         {/* COUNT */}
//         <p className="mb-6 text-center font-semibold">
//           Showing {filteredQuestions.length} of {questions.length} questions
//         </p>

//         {/* QUESTIONS */}
//         {filteredQuestions.length > 0 ? (
//           <div className="grid gap-6">
//             {filteredQuestions.map((item, index) => (
//               <div
//                 key={item.id || index}
//                 className="bg-white p-6 rounded-2xl shadow-lg"
//               >
//                 <div className="flex justify-between mb-2">
//                   <span className="text-purple-600 font-bold">
//                     #{item.id}
//                   </span>
//                   <span className={getDifficultyColor(item.difficulty)}>
//                     {item.difficulty}
//                   </span>
//                 </div>

//                 <p className="font-medium text-lg">
//                   Q. {item.question}
//                 </p>

//                 <p className="text-gray-600 mt-2">
//                   Ans: {item.answers}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-600">
//             No questions found
//           </p>
//         )}

//         {/* BUTTON */}
//         <div className="text-center mt-10">
//           <button
//             onClick={addNewInformation}
//             className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full"
//           >
//             Add New Information
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Questions;
