## 5\. 3Sum — LeetCode 15

### Problem

Given an integer array `nums`, find all **unique triplets** `[a, b, c]` such that:

```
a + b + c = 0
```

Example:

```
nums = [-1, 0, 1, 2, -1, -4]

Output:
[[-1, -1, 2], [-1, 0, 1]]
```

The important part is that we should **not return duplicate triplets**.

---

## Approach: Sorting + Two Pointers

I would use **sorting + Two Pointers**.

### What I will do

First, I will sort the array:

```
[-1, 0, 1, 2, -1, -4]

        ↓ sort

[-4, -1, -1, 0, 1, 2]
```

Then I will use three positions:

- `i` → selects the first number.
- `left` → starts just after `i`.
- `right` → starts at the end.

For every `i`, I will try to find two numbers whose sum is:

```
target = -nums[i]
```

So instead of thinking about three numbers at once:

```
a + b + c = 0
```

I reduce it to a **Two Sum** problem:

```
b + c = -a
```

---

## Code

```js
function threeSum(nums) {
  const result = [];

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicate first numbers
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        // Skip duplicate values
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }

        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}
```

---

## Why this approach?

The easiest solution that comes to mind is **three nested loops**:

```
for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
        for (let k = j + 1; k < nums.length; k++) {
            // check sum
        }
    }
}
```

But this takes:

```
O(n³)
```

time.

For a large array, this becomes expensive.

By sorting the array and using Two Pointers, I can reduce the time complexity to:

```
O(n²)
```

That's why I would choose this approach.

---

## How Two Pointers actually work

Suppose:

```
nums = [-1, 0, 1, 2]
```

If:

```
i = -1
```

then I need:

```
left + right = 1
```

So:

```
left = 0
right = 2
```

We calculate:

```
-1 + 0 + 2 = 1
```

The sum is greater than `0`, so we need a **smaller** number.

Because the array is sorted, we move `right` left:

```
-1 + 0 + 1 = 0
```

We found a valid triplet:

```
[-1, 0, 1]
```

---

## Why does sorting help?

Sorting is very important for the Two Pointer approach.

For example:

```
[-4, -1, -1, 0, 1, 2]
```

Because the numbers are sorted:

- If the sum is **too small**, I move `left` forward to get a larger number.
- If the sum is **too large**, I move `right` backward to get a smaller number.

```
sum < 0  → left++

sum > 0  → right--
```

Without sorting, we wouldn't be able to make these decisions.

---

## Handling duplicates

This is one of the most important parts of 3Sum.

Consider:

```
[-1, -1, 0, 1]
```

If I process both `-1`s as the first number, I could get the same triplet more than once.

So I skip duplicate values:

```
if (i > 0 && nums[i] === nums[i - 1]) {
    continue;
}
```

I also skip duplicate values after finding a valid triplet:

```
while (left < right && nums[left] === nums[left + 1]) {
    left++;
}

while (left < right && nums[right] === nums[right - 1]) {
    right--;
}
```

This ensures the result contains only **unique triplets**.

---

## Dry Run

Input:

```
[-1, 0, 1, 2, -1, -4]
```

After sorting:

```
[-4, -1, -1, 0, 1, 2]
```

For `i = -4`:

```
-4 + -1 + 2 = -3
```

Too small → move `left`.

No valid combination.

For `i = -1`:

```
-1 + 0 + 2 = 1
```

Too large → move `right`.

Then:

```
-1 + 0 + 1 = 0
```

Found:

```
[-1, 0, 1]
```

Continue searching and we also find:

```
[-1, -1, 2]
```

Final result:

```
[
    [-1, -1, 2],
    [-1, 0, 1]
]
```

---

## Complexity

Sorting takes:

```
O(n log n)
```

Then we use Two Pointers for each `i`:

```
O(n²)
```

Overall:

- **Time:** O(n²)
- **Space:** O(1) extra space apart from the output array

---

## How I would explain it in an interview

> **I will use sorting and Two Pointers. First, I sort the array because it allows me to move the left and right pointers intelligently. Then I fix one number using `i` and use two pointers to find the other two numbers whose sum is the negative of the first number.**
>
> **If the total is less than zero, I move the left pointer forward. If it is greater than zero, I move the right pointer backward. When the sum is zero, I store the triplet and skip duplicate values.**
>
> **I choose this approach because the brute-force solution with three loops takes O(n³), while sorting plus Two Pointers reduces it to O(n²). It also handles duplicate triplets efficiently.**

### Notes

When you see:

> **"Find 3 numbers with a target sum + unique combinations"**
> Think:
> **Sort → Fix one number → Two Pointers → Skip duplicates.**
