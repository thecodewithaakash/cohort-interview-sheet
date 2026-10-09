## 2\. Remove Duplicates from Sorted Array — LeetCode 26

### Problem

Given a **sorted array**, remove the duplicates **in-place** so that each element appears only once.

We don't need to create a new array. We need to modify the existing array and return the number of unique elements.

Example:

```
nums = [1, 1, 2, 2, 3]

After removing duplicates:
nums = [1, 2, 3, _, _]

Return: 3
```

---

## Approach: Two Pointers

I would use the **Two Pointer** approach.

### What I will do

I will use two pointers:

- `i` → points to the position of the **last unique element**
- `j` → scans through the array to find the next unique element

Whenever `nums[j]` is different from `nums[i]`, I have found a new unique number.

Then I move `i` forward and copy `nums[j]` there.

### Code

```js
function removeDuplicates(nums) {
  if (nums.length === 0) {
    return 0;
  }

  let i = 0;

  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }

  return i + 1;
}
```

---

## Why this approach?

The important thing to notice is that the array is **already sorted**.

For example:

```
[1, 1, 2, 2, 3, 3]
```

Because it is sorted, duplicates are always next to each other.

So I don't need a `Set` or `Hash Map` to remember which numbers I have already seen.

I can simply compare:

```
nums[j] !== nums[i]
```

If they are different, I know I found a new unique number.

This makes the solution:

- **Time:** O(n)
- **Space:** O(1)

### Why not use a Set?

I could do something like:

```
const unique = [...new Set(nums)];
```

But this uses **extra space** and does not satisfy the main idea of the problem, which is to modify the array **in-place**.

The Two Pointer approach gives us O(1) extra space.

---

## Dry Run

Input:

```
nums = [1, 1, 2, 2, 3]
```

Initially:

```
i = 0
j = 1

[1, 1, 2, 2, 3]
 ↑  ↑
 i  j
```

`nums[j]` is `1`, same as `nums[i]`.

So we skip it.

Next:

```
i = 0
j = 2

[1, 1, 2, 2, 3]
 ↑     ↑
 i     j
```

`2 !== 1`, so we found a new number.

Move `i` and copy:

```
i++
nums[i] = nums[j]
```

Array becomes:

```
[1, 2, 2, 2, 3]
```

Continue the same process.

Finally:

```
[1, 2, 3, 2, 3]
```

The first 3 elements are the important part:

```
[1, 2, 3]
```

So we return:

```
3
```

---

## How I would explain it in an interview

> **I will use the Two Pointer approach because the array is already sorted, so duplicate values will always be next to each other. One pointer keeps track of the position of the last unique element, while the second pointer scans the array. Whenever I find a different value, I move the first pointer forward and copy that value there.**
>
> **I choose this approach because the problem asks us to modify the array in-place. A Set would use extra memory, while Two Pointers gives us O(1) extra space and O(n) time.**

### Notes

Whenever you see **"sorted array + remove duplicates + in-place"**, think: > **Two Pointers** → one pointer stores the unique values, the other scans the array.
