export type StepType = "DIVIDE" | "CONQUER" | "MERGE" | "DONE";

export interface SortStep {
  id: string;
  type: StepType;
  array: number[];
  activeIndices: number[];
  comparingIndices: number[];
  depth: number;
  explanation: string;
  analogy: string;
}

export function generateMergeSortSteps(initialArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  let stepCounter = 0;
  
  // Create a copy to work with
  const workingArray = [...initialArray];

  function pushStep(
    type: StepType,
    array: number[],
    activeIndices: number[],
    comparingIndices: number[],
    depth: number,
    explanation: string,
    analogy: string
  ) {
    steps.push({
      id: `step-${stepCounter++}`,
      type,
      array: [...array],
      activeIndices: [...activeIndices],
      comparingIndices: [...comparingIndices],
      depth,
      explanation,
      analogy,
    });
  }

  // The recursive merge sort function that also records steps
  function mergeSort(arr: number[], left: number, right: number, depth: number) {
    if (left >= right) {
      if (left === right) {
         pushStep(
          "CONQUER",
          workingArray,
          [left],
          [],
          depth,
          `Base case reached for element ${arr[left]} at index ${left}. A single element is already sorted.`,
          "A single exam paper stack is inherently sorted."
        );
      }
      return;
    }

    const mid = Math.floor((left + right) / 2);

    const currentRange = [];
    for (let i = left; i <= right; i++) currentRange.push(i);

    pushStep(
      "DIVIDE",
      workingArray,
      currentRange,
      [],
      depth,
      `Dividing array from index ${left} to ${right} into two halves.`,
      "Teacher splits the large stack of exam papers into two smaller stacks."
    );

    // Left half
    mergeSort(arr, left, mid, depth + 1);
    // Right half
    mergeSort(arr, mid + 1, right, depth + 1);

    // Merge
    merge(arr, left, mid, right, depth);
  }

  function merge(arr: number[], left: number, mid: number, right: number, depth: number) {
    const leftRange = [];
    for (let i = left; i <= mid; i++) leftRange.push(i);
    const rightRange = [];
    for (let i = mid + 1; i <= right; i++) rightRange.push(i);
    
    pushStep(
      "MERGE",
      workingArray,
      [...leftRange, ...rightRange],
      [],
      depth,
      `Starting to merge sorted left half [${left}...${mid}] and sorted right half [${mid + 1}...${right}].`,
      "The teacher is ready to merge two sorted stacks of exam papers into one sorted stack."
    );

    const temp = new Array(right - left + 1);
    let i = left;
    let j = mid + 1;
    let k = 0;

    while (i <= mid && j <= right) {
      pushStep(
        "MERGE",
        workingArray,
        [...leftRange, ...rightRange],
        [i, j],
        depth,
        `Comparing ${arr[i]} and ${arr[j]}.`,
        `Teacher compares the top papers of both stacks: ${arr[i]} vs ${arr[j]}.`
      );

      if (arr[i] <= arr[j]) {
        pushStep(
          "MERGE",
          workingArray,
          [...leftRange, ...rightRange],
          [i, j],
          depth,
          `${arr[i]} is smaller or equal, placing it in the merged array.`,
          `${arr[i]} goes to the new sorted pile.`
        );
        temp[k++] = arr[i++];
      } else {
        pushStep(
          "MERGE",
          workingArray,
          [...leftRange, ...rightRange],
          [i, j],
          depth,
          `${arr[j]} is smaller, placing it in the merged array.`,
          `${arr[j]} goes to the new sorted pile.`
        );
        temp[k++] = arr[j++];
      }
    }

    while (i <= mid) {
      pushStep(
        "MERGE",
        workingArray,
        [...leftRange, ...rightRange],
        [i],
        depth,
        `Placing remaining element ${arr[i]} from left half.`,
        "Moving remaining paper from the first stack."
      );
      temp[k++] = arr[i++];
    }

    while (j <= right) {
      pushStep(
        "MERGE",
        workingArray,
        [...leftRange, ...rightRange],
        [j],
        depth,
        `Placing remaining element ${arr[j]} from right half.`,
        "Moving remaining paper from the second stack."
      );
      temp[k++] = arr[j++];
    }

    // Copy temp array back to working array and record step by step
    for (let p = 0; p < temp.length; p++) {
      workingArray[left + p] = temp[p];
      pushStep(
        "MERGE",
        workingArray,
        [left + p],
        [],
        depth,
        `Updating main array at index ${left + p} with sorted value ${temp[p]}.`,
        "The newly sorted stack is put back into its place."
      );
    }
    
    // Copy to the actual array reference used in the algorithm
    for (let p = 0; p < temp.length; p++) {
      arr[left + p] = temp[p];
    }
  }

  // Initial array state
  pushStep(
    "DIVIDE",
    workingArray,
    workingArray.map((_, i) => i),
    [],
    0,
    "Initial array. Ready to start Merge Sort.",
    "The teacher looks at the complete, unsorted stack of exam papers."
  );

  if (initialArray.length > 0) {
    mergeSort(workingArray, 0, workingArray.length - 1, 0);
  }

  pushStep(
    "DONE",
    workingArray,
    [],
    [],
    0,
    "Merge Sort is complete! The array is fully sorted.",
    "All papers are finally in a single, perfectly sorted pile. Phew!"
  );

  return steps;
}
