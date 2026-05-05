import { useEffect, useState } from 'react';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    fetch('https://merge-sort-visualizer-zchu.onrender.com/api/quiz')
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch quiz:", err);
        setError('Could not load quiz data. Ensure backend is running.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-center text-slate-500">Loading quiz...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!questions.length) return null;

  const currentQ = questions[currentQIndex];

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);
    
    if (option === currentQ.answer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
        <p className="text-4xl font-black text-blue-600 mb-6">
          {score} / {questions.length}
        </p>
        <button 
          onClick={resetQuiz}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <HelpCircle size={20} className="text-blue-500" />
          Knowledge Check
        </h3>
        <span className="text-sm font-medium text-slate-500">
          Question {currentQIndex + 1} of {questions.length}
        </span>
      </div>

      <p className="text-lg text-slate-800 dark:text-slate-200 mb-6 font-medium">
        {currentQ.question}
      </p>

      <div className="flex flex-col gap-3">
        {currentQ.options.map((option, idx) => {
          const isCorrect = option === currentQ.answer;
          const isSelected = selectedAnswer === option;
          
          let optionClass = "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer";
          
          if (isAnswered) {
            if (isCorrect) {
              optionClass = "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-300";
            } else if (isSelected) {
              optionClass = "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-300";
            } else {
              optionClass = "border-slate-200 dark:border-slate-800 opacity-50 cursor-not-allowed";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all duration-200 flex justify-between items-center",
                optionClass
              )}
            >
              <span>{option}</span>
              {isAnswered && isCorrect && <CheckCircle size={20} className="text-green-500" />}
              {isAnswered && isSelected && !isCorrect && <XCircle size={20} className="text-red-500" />}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="mt-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="p-4 bg-blue-50 dark:bg-slate-800 rounded-xl mb-6">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <strong>Explanation:</strong> {currentQ.explanation}
            </p>
          </div>
          <button
            onClick={handleNext}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
          >
            {currentQIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
}
