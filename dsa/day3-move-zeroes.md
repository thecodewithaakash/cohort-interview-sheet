## 3\. Move Zeroes — LeetCode 283

### Problem

Given an array, move all `0`s to the end while keeping the **relative order of the non-zero elements**.

The important part is that we should do this **in-place**.

Example:

```
Input:
[0, 1, 0, 3, 12]

Output:
[1, 3, 12, 0, 0]
```

---

## Approach: Two Pointers

I would use the **Two Pointer** approach.

### What I will do

I will use one pointer called `nonZero`.

- `nonZero` tells me where the next non-zero number should go.
- I will use another pointer `i` to scan the complete array.
- Whenever I find a non-zero number, I will swap it with the value at `nonZero`.
- Then I will move `nonZero` forward.

### Code

```js
var moveZeroes = function(arr) {
  let j = 0;
  let i = 1;
  while(i < arr.length){
    if(arr[j] === 0 && arr[i] !== 0){
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
        i++;
        j++;
    }else if(arr[j] !== 0 && arr[i] === 0){
        j++;
    }
    else {
        i++;
    }
   }
   return arr;
};
```

---

## Why this approach?

The main requirement is to **move zeroes to the end while keeping the order of non-zero elements**.

I could create a new array, but that would require extra space.

Instead, the Two Pointer approach modifies the same array.

For example:

```
[0, 1, 0, 3, 12]
```

When I find `1`, I move it to the `nonZero` position:

```
[1, 0, 0, 3, 12]
 ↑
nonZero
```

Then I find `3`:

```
[1, 3, 0, 0, 12]
```

Then `12`:

```
[1, 3, 12, 0, 0]
```

The non-zero values stay in their original relative order:

```
1 → 3 → 12
```

### Complexity

- **Time:** O(n)
- **Space:** O(1)

We scan the array only once and don't create another array.

---

## Dry Run

Input:

```
[0, 1, 0, 3, 12]
```

| `i` | `nums[i]` | `nonZero` | Action             |
| --- | --------- | --------- | ------------------ |
| 0   | 0         | 0         | Skip               |
| 1   | 1         | 0         | Swap `1` with `0`  |
| 2   | 0         | 1         | Skip               |
| 3   | 3         | 1         | Swap `3` with `0`  |
| 4   | 12        | 2         | Swap `12` with `0` |

Final array:

```
[1, 3, 12, 0, 0]
```

---

## Why not use `filter()`?

I could write:

```
const nonZero = nums.filter(num => num !== 0);
```

But this creates a **new array**, so it uses O(n) extra space.

The problem specifically expects an **in-place** solution, so Two Pointers is a better fit.

---

## How I would explain it in an interview

> **I will use Two Pointers because I need to modify the array in-place. One pointer scans the array, and the second pointer keeps track of where the next non-zero element should be placed. Whenever I find a non-zero value, I swap it with the value at the second pointer and move the second pointer forward.**
>
> **I choose this approach because it keeps the relative order of non-zero elements, doesn't require an extra array, and gives O(n) time with O(1) extra space.**

### Notes
When you see:
> **"Move something to the end + maintain order + in-place"**
> Think about **Two Pointers**.
