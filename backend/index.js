const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const quizData = [
  {
    id: 1,
    question: "What is the time complexity of Merge Sort?",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    answer: "O(n log n)",
    explanation: "Merge Sort consistently divides the array in half (log n) and merges them by comparing each element (n), resulting in O(n log n) time complexity in all cases."
  },
  {
    id: 2,
    question: "Is Merge Sort a stable sorting algorithm?",
    options: ["Yes", "No", "Depends on the input", "Only for arrays smaller than 16"],
    answer: "Yes",
    explanation: "Merge Sort is stable because it preserves the relative order of equal elements during the merge phase."
  },
  {
    id: 3,
    question: "What is the space complexity of Merge Sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: "O(n)",
    explanation: "Merge sort requires O(n) auxiliary space to store the merged sub-arrays."
  },
  {
    id: 4,
    question: "Which algorithm design paradigm does Merge Sort use?",
    options: ["Dynamic Programming", "Greedy", "Backtracking", "Divide and Conquer"],
    answer: "Divide and Conquer",
    explanation: "Merge Sort divides the problem into smaller subproblems, solves them recursively, and combines the results."
  },
  {
    id: 5,
    question: "What happens during the 'Conquer' phase of Merge Sort?",
    options: ["The array is split into two halves", "Sub-arrays are sorted recursively", "Two sorted arrays are combined", "The array is reversed"],
    answer: "Sub-arrays are sorted recursively",
    explanation: "The Conquer phase involves sorting the smaller sub-arrays, usually by making recursive calls."
  }
];

app.get('/api/quiz', (req, res) => {
  res.json(quizData);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
