# 1. Contains Duplicate — LeetCode 217

## Problem

Given an integer array `nums`, return `true` if any value appears at least twice; otherwise return `false`.

## Approach: Set

Scan the array once while keeping the values already seen in a `Set`. If the current number is already present, a duplicate exists.

```js
function containsDuplicate(nums) {
  const seen = new Set();

  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }

  return false;
}
```

**Complexity:** O(n) time and O(n) extra space.

## Interview explanation

> I use a Set to remember the values encountered so far. Membership checks are O(1) on average, so I can detect a duplicate in one pass instead of comparing every pair with O(n²) nested loops.
