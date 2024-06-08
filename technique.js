// https://youtu.be/xo7XrRVxH8Y?si=-sQp_H-iklIgBMvQ
// 2 pointer => (two sum || input array is sorted) => (3 sum)
// Binary Tree BFS => (Binary tree level order traversal)
// Topological Sort => (Course schedule)
// Binary Tree DFS => (Maximum Depth of Binary Tree)
// Top K Elements (heap)
// Modified Binary Search => (Search in Rotated Sorted Array)
// Subset => (Permutations)
// Sliding window => (Find the longest substring with k unique characters in a given string)

// Sliding window
// Max Sum Subarray of size K
// https://www.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1
function maximumSumSubarray(Arr, K) {
    let sum = 0

    for (let i = 0; i < K; i++) {
        sum += Arr[i];
    }
    let mxSum = sum
    for (let i = K - 1; i < Arr.length - 1; i++) {
        sum = sum + Arr[i + 1] - Arr[i - (K - 1)];
        mxSum = Math.max(mxSum, sum);
    }
    return mxSum;
}

// console.log(maximumSumSubarray([100, 200, 300, 400], 4))
