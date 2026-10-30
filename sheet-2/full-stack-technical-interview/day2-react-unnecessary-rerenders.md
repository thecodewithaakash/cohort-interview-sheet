# 2. React — Unnecessary Re-renders

## Interview question

A frequently re-rendering parent causes child components to re-render and slows a page. How would you investigate and improve it?

## Answer

I would measure first with React DevTools Profiler, identify expensive or frequent renders, and inspect state placement and props. State used by one subtree may be moved closer to that subtree. I would also check whether the parent creates new objects, arrays, or function references on every render.

- `React.memo` can skip rendering a component when its props are shallowly equal.
- `useMemo` can cache an expensive calculated value.
- `useCallback` can preserve a function reference when that stability helps a memoized child or dependency.

These are optimizations, not guarantees. They add comparison and complexity costs, so I would use them only after identifying a meaningful bottleneck.

```jsx
const filteredUsers = useMemo(
  () => users.filter((user) => user.name.includes(search)),
  [users, search]
);
```

## Follow-ups

- **Profiler:** Shows which components rendered and the render cost.
- **Memoization:** Useful when measured repeated work can actually be skipped.
- **Why not everywhere?** It can add overhead, obscure code, and fail if references change anyway.
