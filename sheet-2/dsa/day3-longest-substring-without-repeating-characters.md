# 3. Longest Substring Without Repeating Characters — LeetCode 3

## Problem

Return the length of the longest substring of `s` that contains no repeated characters.

## Approach: Sliding window

Maintain a window with unique characters and a Map of each character's latest index. When a repeated character is inside the current window, move the left boundary beyond its previous position.

```js
function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let left = 0;
  let longest = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (lastSeen.has(char) && lastSeen.get(char) >= left) {
      left = lastSeen.get(char) + 1;
    }

    lastSeen.set(char, right);
    longest = Math.max(longest, right - left + 1);
  }

  return longest;
}
```

**Complexity:** O(n) time and O(k) space for up to `k` distinct characters.

## Interview explanation

> I maintain a sliding window that always has unique characters. The Map lets me move the left boundary directly past a repeated character instead of shrinking the window one step at a time. Each index is processed once.
