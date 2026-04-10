import { useState } from 'react';

function QuestionCard({ number, question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 hover:scale-105 transform">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
          {number}
        </div>

        <div className="flex-1">
          <p className="text-lg text-gray-800 font-medium mb-4">
            {question}
          </p>

          {showAnswer && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-700">{answer}</p>
            </div>
          )}

          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition duration-300 text-sm font-medium"
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
