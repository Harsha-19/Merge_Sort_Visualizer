import { Clock, HardDrive, ShieldCheck, Activity } from 'lucide-react';

export function ComplexityPanel() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 p-6 h-full">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
        <Activity size={20} className="text-blue-500" />
        Algorithm Profile
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
            <Clock size={16} />
            <span className="text-sm font-medium">Time Complexity</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-mono">
            O(n log n)
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Consistent across Best, Average, and Worst cases due to strictly dividing the array in half and linear merging.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
            <HardDrive size={16} />
            <span className="text-sm font-medium">Space Complexity</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-mono">
            O(n)
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Requires extra space proportional to the array size to hold the temporary merged sub-arrays.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 md:col-span-2">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
            <ShieldCheck size={16} />
            <span className="text-sm font-medium">Stability & Predictability</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Merge sort is a <strong>stable</strong> sort. Equal elements retain their original relative order. Unlike QuickSort, Merge Sort's performance is highly predictable and does not degrade to O(n²) on already sorted or reverse-sorted inputs.
          </p>
        </div>
      </div>
    </div>
  );
}
