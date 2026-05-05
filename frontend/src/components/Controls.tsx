import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';

export function Controls() {
  const { 
    isPlaying, 
    play, 
    pause, 
    stepForward, 
    stepBackward, 
    reset, 
    speed, 
    setSpeed 
  } = useStore();

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        stepForward();
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, stepForward]);

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2">
        <button 
          onClick={stepBackward}
          className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
          title="Step Backward"
        >
          <SkipBack size={20} />
        </button>
        
        {isPlaying ? (
          <button 
            onClick={pause}
            className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transition-transform active:scale-95"
            title="Pause"
          >
            <Pause size={24} fill="currentColor" />
          </button>
        ) : (
          <button 
            onClick={play}
            className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transition-transform active:scale-95"
            title="Play"
          >
            <Play size={24} fill="currentColor" className="ml-1" />
          </button>
        )}

        <button 
          onClick={stepForward}
          className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
          title="Step Forward"
        >
          <SkipForward size={20} />
        </button>

        <button 
          onClick={reset}
          className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 ml-2"
          title="Reset"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 min-w-[60px]">
          Speed
        </span>
        <input 
          type="range" 
          min="100" 
          max="2000" 
          step="100"
          value={2100 - speed} // Invert so right is faster
          onChange={(e) => setSpeed(2100 - Number(e.target.value))}
          className="w-full md:w-32 accent-blue-600"
        />
        <span className="text-xs text-slate-500 dark:text-slate-400 w-12 text-right">
          {speed < 300 ? 'Fast' : speed > 1000 ? 'Slow' : 'Normal'}
        </span>
      </div>
    </div>
  );
}
