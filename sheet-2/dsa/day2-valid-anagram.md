# 2. Valid Anagram — LeetCode 242

## Problem

Given strings `s` and `t`, determine whether `t` is an anagram of `s`: both must contain the same characters with the same frequencies.

## Approach: Character frequencies

If their lengths differ, they cannot be anagrams. Count each character in `s`, then consume those counts using `t`.

```js
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const counts = new Map();
  for (const char of s) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
  }

  for (const char of t) {
    const count = counts.get(char);
    if (!count) return false;
    if (count === 1) counts.delete(char);
    else counts.set(char, count - 1);
  }

  return counts.size === 0;
}
```

**Complexity:** O(n) time and O(k) space, where `k` is the number of distinct characters.

## Interview explanation

> Anagrams have the same character frequencies regardless of order. I count the first string and decrement those counts while scanning the second. A missing character or exhausted count means the strings are not anagrams.
