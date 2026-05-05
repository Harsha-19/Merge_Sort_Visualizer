import { useState } from 'react';
import { useStore } from '../store/useStore';

export function InputSystem() {
  const { array, setArray } = useStore();
  const [inputValue, setInputValue] = useState(array.join(', '));
  const [error, setError] = useState('');

  const handleApply = () => {
    setError('');
    
    // Parse input
    const parsed = inputValue.split(',')
      .map(item => item.trim())
      .filter(item => item !== '');

    // Validation
    if (parsed.length === 0) {
      setError('Please enter at least one number.');
      return;
    }

    if (parsed.length > 16) {
      setError('Maximum 16 elements allowed.');
      return;
    }

    const newArray = [];
    for (const item of parsed) {
      const num = parseInt(item, 10);
      if (isNaN(num)) {
        setError(`"${item}" is not a valid integer.`);
        return;
      }
      if (num > 999 || num < -999) {
         setError(`Please keep numbers between -999 and 999 for visual clarity.`);
         return;
      }
      newArray.push(num);
    }

    setArray(newArray);
  };

  const handleRandomize = () => {
    const length = Math.floor(Math.random() * 8) + 5; // 5 to 12 elements
    const randomArray = Array.from({ length }, () => Math.floor(Math.random() * 90) + 10);
    setInputValue(randomArray.join(', '));
    setArray(randomArray);
    setError('');
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex-1 w-full relative">
        <label htmlFor="array-input" className="sr-only">Array Input</label>
        <input
          id="array-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="e.g. 8, 3, 5, 2"
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-slate-800 dark:text-slate-100"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleApply();
          }}
        />
        {error && (
          <p className="absolute -bottom-6 left-1 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button
          onClick={handleApply}
          className="flex-1 sm:flex-none px-6 py-2 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg transition-colors font-medium text-sm"
        >
          Apply
        </button>
        <button
          onClick={handleRandomize}
          className="flex-1 sm:flex-none px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors font-medium text-sm"
        >
          Random
        </button>
      </div>
    </div>
  );
}
