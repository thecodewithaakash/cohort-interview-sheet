# 5. Search in Rotated Sorted Array — LeetCode 33

## Problem

Search for `target` in a rotated ascending array of distinct values. Return its index, or `-1` if it is absent.

## Approach: Modified binary search

At each midpoint, at least one half remains sorted. Determine which half is sorted and whether the target lies within its bounds; discard the other half.

```js
 
var search = function (nums, target) {
 const pivot = findPivot(nums);

  // if you did not find a pivot, it means the array is not rotated.
  if (pivot === -1) {
    // just do normal binarySearch
    return binarySearch(nums, target, 0, nums.length - 1);
  }

  // if pivot is found, you have found 2 ascending sorted arrays
  if (nums[pivot] === target) { // case 1:
    return pivot;
  }

  if (target >= nums[0]) { // case 2:
    return binarySearch(nums, target, 0, pivot - 1);
  }

  // case 3:
  return binarySearch(nums, target, pivot + 1, nums.length - 1);
};

function findPivot(arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);
    if (mid < end && arr[mid] > arr[mid + 1]) {
      return mid;
    }
    if (mid > start && arr[mid] < arr[mid - 1]) {
      return mid - 1;
    }

    if (arr[mid] <= arr[start]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }


  return -1;
}


function binarySearch(arr, target, start, end) {
  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);
    if (target < arr[mid]) {
      end = mid - 1;
    } else if (target > arr[mid]) {
      start = mid + 1;
    } else {
      return mid; // ans found
    }
  }

  return -1;
}
```

**Complexity:** O(log n) time and O(1) extra space.

## Interview explanation

> I keep binary search because one side of the midpoint is always sorted. I identify that side, compare the target with its bounds, and eliminate the half where the target cannot be.
