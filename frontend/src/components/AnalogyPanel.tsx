import { useStore } from '../store/useStore';
import { BookOpen, SplitSquareHorizontal, Merge, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function AnalogyPanel() {
  const { steps, currentStepIndex } = useStore();
  const currentStep = steps[currentStepIndex];

  if (!currentStep) return null;

  const icons = {
    DIVIDE: <SplitSquareHorizontal className="text-blue-500" size={32} />,
    CONQUER: <BookOpen className="text-purple-500" size={32} />,
    MERGE: <Merge className="text-green-500" size={32} />,
    DONE: <CheckCircle2 className="text-teal-500" size={32} />
  };

  const colors = {
    DIVIDE: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    CONQUER: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
    MERGE: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    DONE: "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800"
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className={cn(
        "flex items-center gap-4 p-4 rounded-xl border transition-colors duration-300",
        colors[currentStep.type]
      )}>
        <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          {icons[currentStep.type]}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
            Current Phase
          </p>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {currentStep.type}
          </h3>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col relative overflow-hidden">
        <h4 className="font-semibold text-lg mb-2 text-slate-800 dark:text-slate-100">
          Algorithm Explanation
        </h4>
        <AnimatePresence mode="wait">
          <motion.p 
            key={currentStep.explanation}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-slate-600 dark:text-slate-300 flex-1"
          >
            {currentStep.explanation}
          </motion.p>
        </AnimatePresence>

        <div className="h-px bg-slate-200 dark:bg-slate-800 my-4" />

        <h4 className="font-semibold text-lg mb-2 text-slate-800 dark:text-slate-100 flex items-center gap-2">
          Real-Life Analogy
        </h4>
        <AnimatePresence mode="wait">
          <motion.p 
            key={currentStep.analogy}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-slate-600 dark:text-slate-300 italic flex-1"
          >
            "{currentStep.analogy}"
          </motion.p>
        </AnimatePresence>
        
        <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400">
          Depth: {currentStep.depth}
        </div>
      </div>
    </div>
  );
}
