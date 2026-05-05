import { create } from 'zustand';
import { generateMergeSortSteps, type SortStep } from '../lib/mergeSortEngine';

interface StoreState {
  array: number[];
  steps: SortStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  speed: number;
  
  // Actions
  setArray: (arr: number[]) => void;
  play: () => void;
  pause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
  setCurrentStepIndex: (index: number) => void;
}

const DEFAULT_ARRAY = [8, 3, 5, 2];

export const useStore = create<StoreState>((set, get) => ({
  array: DEFAULT_ARRAY,
  steps: generateMergeSortSteps(DEFAULT_ARRAY),
  currentStepIndex: 0,
  isPlaying: false,
  speed: 500,

  setArray: (arr: number[]) => {
    set({
      array: arr,
      steps: generateMergeSortSteps(arr),
      currentStepIndex: 0,
      isPlaying: false,
    });
  },

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),

  stepForward: () => {
    const { currentStepIndex, steps } = get();
    if (currentStepIndex < steps.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    } else {
      set({ isPlaying: false });
    }
  },

  stepBackward: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1, isPlaying: false });
    }
  },

  reset: () => {
    set({ currentStepIndex: 0, isPlaying: false });
  },

  setSpeed: (speed: number) => set({ speed }),
  
  setCurrentStepIndex: (index: number) => set({ currentStepIndex: index }),
}));
