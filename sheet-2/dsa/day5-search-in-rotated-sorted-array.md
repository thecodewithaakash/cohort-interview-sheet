# 5. Search in Rotated Sorted Array — LeetCode 33

## Problem

Search for `target` in a rotated ascending array of distinct values. Return its index, or `-1` if it is absent.

## Approach: Modified binary search

At each midpoint, at least one half remains sorted. Determine which half is sorted and whether the target lies within its bounds; discard the other half.

```js
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else if (nums[mid] < target && target <= nums[right]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```

**Complexity:** O(log n) time and O(1) extra space.

## Interview explanation

> I keep binary search because one side of the midpoint is always sorted. I identify that side, compare the target with its bounds, and eliminate the half where the target cannot be.
