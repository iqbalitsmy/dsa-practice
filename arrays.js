// Maximum and minimum of an array using minimum number of comparisons
const array = [3, 5, 6, 77, 14, 1, 55, 4, 77]

function minAndMax(arr) {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    if (arr.length === 1) return arr[0]

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i]
        } else if (arr[i] > max) {
            max = arr[i]
        }
    }
    return [min, max];
}

// console.log(minAndMax(array));

function arrReverse(arr) {
    if (arr.length === 1) return arr[0]

    const mid = Math.floor(arr.length / 2);

    for (let i = 0; i < mid; i++) {
        const temp = arr[i];
        arr[i] = arr[arr.length - i - 1];
        arr[arr.length - i - 1] = temp;
    }
    return arr;
}

// console.log(arrReverse(array));

// recursion way
function arrReverseRecursion(arr, start, end) {
    const temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;

    if (start + 1 < end - 1) {
        arrReverseRecursion(arr, start + 1, end - 1)
    }

}
// arrReverseRecursion(array, 0, array.length - 1);

// console.log(array)

// max subarray
function maxSubArrayFirst(nums) {
    let maxSum = Number.NEGATIVE_INFINITY;
    let startIndex = -1;
    let endIndex = -1;

    for (let i = 0; i < nums.length; i++) {
        let currentSum = 0;
        for (let j = i; j < nums.length; j++) {
            currentSum += nums[j];
            if (currentSum > maxSum) {
                maxSum = currentSum;
                startIndex = i;
                endIndex = j;
            }
        }
    }
    return { sum: maxSum, subArray: nums.slice(startIndex, endIndex + 1) }
}

// console.log(maxSubArrayFirst([5, 4, -1, 7, 8]))

// subarray needs to be a contiguous segment
// use kadane's algorithm
function maxSubArray(nums) {
    let maxCurrent = 0;
    let maxGlobal = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < nums.length; i++) {
        maxCurrent += nums[i];
        if (maxCurrent > maxGlobal) maxGlobal = maxCurrent
        if (maxCurrent < 0) maxCurrent = 0;   //just ignore less than 1 value
    }
    return maxGlobal;
}
// console.log(maxSubArray([5, 4, -1, 7, 8]))


function containsDuplicate(nums) {
    nums.sort((a, b) => a - b);
    // console.log(arr);
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === nums[i + 1]) {
            return true
        }
    }
    return false;
}
// console.log(containsDuplicate(array))

// set approach 
function containsDuplicate2(nums) {
    const numsSets = new Set(nums);
    return numsSets.size !== nums.length;
}

// console.log(containsDuplicate2(array))

// Chocolate Distribution Problem
function findMinDiff(arr, m) {
    arr.sort((a, b) => a - b);
    console.log(arr)
    let minDiff = Number.POSITIVE_INFINITY;

    for (let i = 0; i < arr.length - m - 1; i++) {
        const dif = Math.abs(arr[i] - arr[m + i - 1])
        if (dif < minDiff) {
            minDiff = dif
        }
    }

    return minDiff;
}

// console.log(findMinDiff([ 7,3,2,4,9,12,56 ], 3))

// Search in Rotated Sorted Array
// https://youtu.be/Le8bc8aHgBA?si=NSB1DKPWK_ZWxFhs

// function search(nums, target) { //love baber
//     let low = 0;
//     let high = nums.length - 1;
//     while (low <= high) {
//         let mid = Math.floor((low + high) / 2);
//         if (nums[mid] === target) return mid;

//         if (nums[low] < nums[mid]) {
//             if (target >= nums[low] && target < nums[mid]) {
//                 high = mid - 1;
//             } else {
//                 low = mid + 1;
//             }
//         } else {
//             if (target > nums[mid] && target <= nums[high]) {
//                 low = mid + 1;
//             } else {
//                 high = mid - 1;
//             }
//         }
//     }
//     return -1;
// }

// https://youtu.be/pj02A23IyBw?si=iTg5FXUWpwBxyXxD
function search(nums, target) {
    let start = 0, end = nums.length - 1;

    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        if (nums[mid] === target) return mid;

        if (nums[mid] >= nums[start]) {     //check sorted or not
            // start mid sorted
            if (target >= nums[start] && target < nums[mid]) {     //target is belong here or not
                end = mid - 1
            } else {
                start = mid + 1;    //else go end side
            }
        } else {    // when unsorted 
            // end mid is sorted
            if (target > nums[mid] && target <= nums[end]) {
                start = mid + 1;
            } else {
                end = mid - 1;  //else go start side
            }
        }
    }
    return -1;
}

// console.log(search([3, 1], 1));

function searchRotated(nums, target) {
    let start = 0, end = nums.length - 1;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (nums[mid] === target) return mid;

        if (nums[start] <= nums[mid]) {
            if (nums[start] <= target && nums[mid] > target) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        } else {
            if (nums[mid] < target && nums[end] >= target) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
    }
    return -1
}
// console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0));

// Next Permutation
function nextPermutation(nums) {
    if (nums.length === 1)
        return nums;

    let idx1 = -1;
    // check from right to left
    for (let i = nums.length - 2; i >= 0; i--) {    //check right side number is less than left side number or not. 
        console.log(i)
        if (nums[i] < nums[i + 1]) {
            idx1 = i;
            break;
        }
    }

    if (idx1 < 0) {     //if array sorted descending order   
        return nums.reverse();
    } else {
        let idx2 = 0;
        // check from right to left
        for (let i = nums.length - 1; i >= 0; i--) {    //check arr[idx1] immediate bigger number
            if (nums[i] > nums[idx1]) {
                idx2 = i
                break;
            }
        }

        [nums[idx1], nums[idx2]] = [nums[idx2], nums[idx1]]     //swap 

        // sorted array after idx1 to make sure immediate next permutation.
        let left = idx1 + 1;
        let right = nums.length - 1;
        while (left < right) {
            [nums[left], nums[right]] = [nums[right], nums[left]]
            left++;
            right--;
        }
    }
    return nums;
}

// console.log(nextPermutation([1, 3, 2]))

// Best time to Buy and Sell Stock
// *compare the max profit not the price. concern about max profit not price
function maxProfit(prices) {
    let maxRight = prices[prices.length - 1];
    let maxProfit = 0;

    for (let i = prices.length - 2; i >= 0; i--) {
        maxRight = Math.max(maxRight, prices[i]);       //if maxRIght is reassign the maxProfit will remain until find the larger maxProfit.
        maxProfit = Math.max(maxProfit, maxRight - prices[i]);
        console.log(maxRight, maxProfit)
    }
    return maxProfit;
}
// console.log(maxProfit([4, 7, 1, 5, 3, 6, 4]))

// missing number of array
function missingNum(arr) {
    let total = ((arr.length + 2) * (arr.length + 1)) / 2;
    console.log(total)
    for (let i = 0; i < arr.length; i++) {
        total = Math.abs(total - arr[i]);
    }
    return total;
}

// console.log(missingNum([1, 2, 3, 4, 6]))

// Repeat and Missing Number Array
// https://youtu.be/2D0D8HE6uak?si=Ylw5_6FR78d8eVJd

function repeatedNumber(A) {
    let n = A.length;
    const s1n = (n * (n + 1)) / 2;
    const s2n = (n * (n + 1) * (2 * n + 1)) / 6

    let s1 = 0;
    let s2 = 0;

    for (let i = 0; i < A.length; i++) {
        s1 += A[i];
        s2 += (A[i] * A[i]);
    }

    let val1 = s1 - s1n;    //x - y
    let val2 = s2 - s2n;
    val2 = val2 / val1;      //x + y
    let x = parseInt((val1 + val2) / 2);
    let y = parseInt(x - val1);

    return [x, y];
}

// console.log(repeatedNumber([3, 1, 2, 5, 3]))

// Kth-Largest Element in an Array
function findKthLargest(nums, k) {
    nums.sort((a, b) => a - b)

    return nums[nums.length - k]
};

// console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4))

// Trapping Rain Water
// https://youtu.be/UZG3-vZlFM4?si=3q8T3TVuGRrF5WCt

/*if number left and right side number is larger than water will trap */
function trap(height) {
    let left = [height[0]];
    let right = [];
    right[height.length - 1] = height[height.length - 1];

    for (let i = 1; i < height.length; i++) {
        left[i] = Math.max(height[i], left[i - 1]);
        if (i >= 0) {
            right[height.length - i - 1] = Math.max(height[height.length - i - 1], right[height.length - i]);
        }
    }
    let netWater = 0;
    for (let i = 0; i < height.length; i++) {
        netWater += (Math.min(right[i], left[i])) - height[i];
    }
    return netWater;
}

// console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))

// Maximum Product Subarray
// https://www.geeksforgeeks.org/maximum-product-subarray/
function maxProductBruteForce(arr) {
    let result = arr[0];
    for (let i = 0; i < arr.length; i++) {
        let mul = arr[i];

        for (let j = i + 1; j < arr.length; j++) {
            result = Math.max(result, mul);
            mul *= arr[j];
        }
        result = Math.max(result, mul);
    }
    return result;
}

// https://youtu.be/hnswaLJvr6g?si=vpAH5vj9KAprJvFE
function maxProduct(nums) {
    let pre = 1, suff = 1
    let ans = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < nums.length; i++) {
        if (pre === 0) pre = 1;
        if (suff === 0) suff = 1;

        pre = pre * nums[i];
        suff = suff * nums[nums.length - i - 1];
        // console.log(nums[i], "pre:", pre, nums[nums.length - i - 1], "suff:", suff)

        ans = Math.max(ans, Math.max(pre, suff));
        // console.log("ans", ans)
    }
    return ans;
}

// console.log(maxProduct([1, -2, -3, 0, 7, -8, -2]))

// Product of Array Except Self
// https://youtu.be/G9zKmhybKBM?si=7-6DA9Nubu5nc9du

function productExceptSelf(nums) {
    let left = [1];
    let right = [];
    right[nums.length - 1] = 1;
    let res = [];

    for (let i = 1; i < nums.length; i++) {
        left[i] = nums[i - 1] * left[i - 1]
        right[nums.length - i - 1] = nums[nums.length - i] * right[nums.length - i]
    }

    for (let i = 0; i < nums.length; i++) {
        res[i] = left[i] * right[i];
    }
    return res;
}
// https://youtu.be/bNvIQI2wAjk?si=268PyZ8a6s9kBPUm         ----more efficient
// console.log(productExceptSelf([2, 1, 3, 4]))


// flatten function [1, [2, [3, 4], 5], 6] Outputs: [1, 2, 3, 4, 5, 6]
function flatten(arr) {
    let res = [];

    arr.forEach((a) => {
        if (Array.isArray(a)) {
            res = res.concat(flatten(a))
        } else {
            res.push(a)
        }
    });

    return res;
}

console.log(flatten([1, [2, [3, 4], 5], 6]))