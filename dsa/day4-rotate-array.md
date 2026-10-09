## 4\. Rotate Array — LeetCode 189

### Problem

Given an array, rotate it to the **right by `k` positions**.

Example:

```
nums = [1, 2, 3, 4, 5, 6, 7]
k = 3

Output:
[5, 6, 7, 1, 2, 3, 4]
```

The important requirement is to modify the array **in-place**.

---

## Approach: Array Reversal

I would use the **Reversal Algorithm**.

Instead of moving every element one by one, I will use `reverse()` three times.

### What I will do

For:

```
[1, 2, 3, 4, 5, 6, 7]
```

and:

```
k = 3
```

First, I reverse the **entire array**:

```
[7, 6, 5, 4, 3, 2, 1]
```

Then I reverse the first `k` elements:

```
[5, 6, 7, 4, 3, 2, 1]
```

Finally, I reverse the remaining elements:

```
[5, 6, 7, 1, 2, 3, 4]
```

That's our answer.

---

## Code

```js
function rotate(nums, k) {
    k = k % nums.length;

    nums.reverse();

    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
}

function reverse(nums, start, end) {
    while (start < end) {
        [nums[start], nums[end]] = [nums[end], nums[start]];

        start++;
        end--;
    }
}
```

### Why `k % nums.length`?

This is an important interview point.

Suppose:

```
nums = [1, 2, 3, 4, 5]
k = 7
```

Rotating 7 times is the same as rotating:

```
7 % 5 = 2
```

times.

So:

```
k = k % nums.length;
```

prevents us from doing unnecessary rotations.

---

## Why this approach?

A simple approach would be to move the last element to the beginning `k` times.

For example:

```
k = 3

Move 7 → [7,1,2,3,4,5,6]
Move 6 → [6,7,1,2,3,4,5]
Move 5 → [5,6,7,1,2,3,4]
```

But this can take **O(n × k)** time.

The reversal approach only needs to process the array a few times.

So:

- **Time:** O(n)
- **Space:** O(1)

This is better, especially when `k` is large.

---

## Dry Run

Input:

```
nums = [1, 2, 3, 4, 5, 6, 7]
k = 3
```

### Step 1 — Reverse everything

```
[7, 6, 5, 4, 3, 2, 1]
```

### Step 2 — Reverse first 3 elements

```
[5, 6, 7, 4, 3, 2, 1]
```

### Step 3 — Reverse remaining elements

```
[5, 6, 7, 1, 2, 3, 4]
```

Final answer:

```
[5, 6, 7, 1, 2, 3, 4]
```

---

## Why not create another array?

I could use another array and directly calculate the new position of each element.

For example:

```
const result = new Array(nums.length);
```

But that requires **O(n) extra space**.

Since the problem asks for an in-place solution, the reversal method is a better choice.

---

## How I would explain it in an interview

> **I will use the reversal approach because I need to rotate the array in-place. First, I reverse the complete array. Then I reverse the first `k` elements and finally reverse the remaining elements. This puts the last `k` elements at the beginning while keeping their correct order.**
>
> **I choose this approach instead of moving elements one by one because that could take O(n × k) time. The reversal approach takes O(n) time and O(1) extra space. I also use `k % nums.length` because rotating by the array length doesn't change the array.**

### Notes:
When you see:
> **"Rotate array + in-place + O(1) extra space"**
> Think:
> **Reverse → Reverse first `k` → Reverse remaining.**
