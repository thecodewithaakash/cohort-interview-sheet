## 1\. Two Sum — LeetCode 1

### Problem

Given an array of integers `nums` and an integer `target`, return the **indices of two numbers** whose sum is equal to `target`.

Example:

```
nums = [2, 7, 11, 15]
target = 9

2 + 7 = 9

Answer: [0, 1]
```

## Approach: Hash Map

I would use a **Hash Map** for this problem.

### What I will do

While going through the array, for every number I will calculate the number I need:

```
needed = target - current number
```

Then I will check whether `needed` is already present in the Hash Map.

- If it is present → I found the two numbers.
- If it is not present → I store the current number and its index in the Hash Map.

### Why this approach?

The simple brute-force approach is to check every pair using two loops:

```
for each number
    check every other number
```

That works, but it takes **O(n²)** time.

With a Hash Map, I can check whether the required number exists in approximately **O(1)** time.

So the complete solution takes:

- **Time:** O(n)
- **Space:** O(n)

For an interview, I would prefer this because we only need to go through the array once.

---

## JavaScript Solution

```js
var twoSum = function(nums, target) {
    const map = new Map();
    for(let i = 0;i<nums.length;i++){
        const complement = target - nums[i];
        if(map.has(complement)){
            return [map.get(complement), i ]
        }
        map.set(nums[i],i);
    }
    return [];
};
```

### Dry Run

For:

```
nums = [2, 7, 11, 15]
target = 9
```

| i   | Current | Needed | Map before | Action                     |
| --- | ------- | ------ | ---------- | -------------------------- |
| 0   | 2       | 7      | `{}`       | 7 not found → store `2: 0` |
| 1   | 7       | 2      | `{2: 0}`   | 2 found → return `[0, 1]`  |

So:

```
[0, 1]
```

is the answer.

## How I would explain it in an interview

> **I will use a Hash Map because I need to quickly check whether the complement of the current number already exists. For every number, I calculate `target - current`. If that value is already in the map, I have found the required pair and can return their indices. Otherwise, I store the current number and its index.**
>
> **I choose this approach instead of the brute-force two-loop approach because brute force takes O(n²) time, while the Hash Map solution takes O(n) time with O(n) extra space. Since we only need to find one pair, this gives us a good balance between time and space.**

### Notes

I **would not sort the array** for this problem because the question asks for the **original indices**. Sorting changes the positions and makes index tracking more complicated.

That's another reason the Hash Map approach is a clean choice here.
