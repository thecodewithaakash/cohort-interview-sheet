# 4. Subarray Sum Equals K — LeetCode 560

## Problem

Return the number of continuous subarrays whose elements sum to `k`.

## Approach: Prefix sums and a frequency Map

For current prefix sum `sum`, an earlier prefix of `sum - k` means the values between those prefixes sum to `k`. Store how many times each prefix has occurred. Initialize prefix sum zero with frequency one so a matching subarray starting at index zero is counted.

```js
function subarraySum(nums, k) {
  const prefixCounts = new Map([[0, 1]]);
  let sum = 0;
  let count = 0;

  for (const num of nums) {
    sum += num;
    count += prefixCounts.get(sum - k) ?? 0;
    prefixCounts.set(sum, (prefixCounts.get(sum) ?? 0) + 1);
  }

  return count;
}
```

**Complexity:** O(n) time and O(n) extra space. Prefix sums work with negative numbers, unlike a simple positive-only sliding window.

## Interview explanation

> I use the prefix-sum identity: a subarray sum is the difference of two prefix sums. For each position, I add the number of previous prefixes equal to the current sum minus `k`, then record the current prefix.
