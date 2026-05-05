import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

export function Visualizer() {
  const { steps, currentStepIndex } = useStore();
  const currentStep = steps[currentStepIndex];

  if (!currentStep) return null;

  const maxVal = Math.max(...currentStep.array, 1); // Avoid division by zero

  return (
    <div className="flex flex-col items-center justify-center w-full h-[300px] bg-slate-900 rounded-2xl p-6 shadow-xl overflow-hidden relative border border-slate-800">
      <div className="flex items-end justify-center h-full w-full gap-2 relative">
        {currentStep.array.map((value, index) => {
          const isActive = currentStep.activeIndices.includes(index);
          const isComparing = currentStep.comparingIndices.includes(index);
          
          let colorClass = "bg-blue-500";
          if (isComparing) {
            colorClass = "bg-yellow-400";
          } else if (isActive && currentStep.type === "MERGE") {
            colorClass = "bg-green-500";
          } else if (isActive) {
            colorClass = "bg-blue-400";
          } else if (currentStep.type === "DONE") {
             colorClass = "bg-green-500";
          }

          return (
            <motion.div
              key={`${index}`} // using index because values change positions
              layout
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className={cn(
                "w-12 rounded-t-md flex flex-col justify-end items-center text-white font-bold pb-2",
                colorClass
              )}
              style={{
                height: `${(value / maxVal) * 100}%`,
                minHeight: '2rem'
              }}
            >
              <span className="text-sm drop-shadow-md">{value}</span>
            </motion.div>
          );
        })}
      </div>
      
      {/* Current phase indicator inside visualizer or outside, we'll put outside. */}
    </div>
  );
}
