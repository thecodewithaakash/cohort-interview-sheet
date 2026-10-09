## 2\. React — Unnecessary Re-render

If a React page becomes slow because a parent component is re-rendering frequently, I would first **find out which components are actually re-rendering** instead of immediately adding `React.memo` everywhere.

### How I would investigate

I would use the **React DevTools Profiler** to check which components are rendering and how much time they are taking.

I would also look at the parent component and check:

- Is its state changing too frequently?
- Is it passing new objects or arrays to children on every render?
- Is it creating new functions on every render?
- Is some state placed too high in the component tree?
- Are there expensive calculations happening during rendering?

For example:

```js
function Parent() {
  const [count, setCount] = useState(0);

  const user = {
    name: "Rahul",
  };

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>

      <Child user={user} />
    </>
  );
}
```

Even though the `user` data hasn't really changed, a new object is created every time `Parent` renders.

So if `Child` is memoized:

```
const Child = React.memo(function Child({ user }) {
  return <div>{user.name}</div>;
});
```

it can **still re-render**, because `user` is a new object reference on every parent render.

---

### When would `React.memo` help?

`React.memo` is useful when a component:

1.  renders frequently,
2.  receives the same props most of the time, and
3.  its rendering is expensive enough that skipping it actually matters.

For example:

```js
const UserCard = React.memo(function UserCard({ name, age }) {
  return (
    <div>
      {name} - {age}
    </div>
  );
});
```

If the parent re-renders but `name` and `age` haven't changed, React can skip rendering `UserCard`.

But `React.memo` only does a **shallow comparison of props** by default. So objects, arrays, and functions can cause issues because their references can change even when their contents are the same.

---

### What does `useMemo` solve?

`useMemo` is mainly useful for avoiding an **expensive calculation** on every render.

For example:

```js
const filteredUsers = useMemo(() => {
  return users.filter((user) => user.name.includes(search));
}, [users, search]);
```

Now React can reuse the previous calculated value until `users` or `search` changes.

So I think of `useMemo` as:

> "Don't recalculate this expensive value unless its dependencies change."

It can also be useful when I need to keep the same object/array reference for a memoized child.

---

### What does `useCallback` solve?

`useCallback` is similar, but instead of memoizing a calculated value, it memoizes a **function reference**.

For example:

```js
const handleDelete = useCallback((id) => {
  deleteUser(id);
}, []);
```

Without `useCallback`, a new function would be created on every render:

```js
const handleDelete = (id) => {
  deleteUser(id);
};
```

This can matter when passing the function to a component wrapped with `React.memo`.

For example:

```js
const UserList = React.memo(function UserList({ onDelete }) {});
```

If `onDelete` gets a new reference every time, `React.memo` may not be able to skip the render.

So my simple understanding is:

- `useMemo` → memoizes a **value/result**
- `useCallback` → memoizes a **function reference**
- `React.memo` → can skip a **component render when props haven't changed**

---

### Why shouldn't we memoize everything?

Memoization itself has a cost. React has to keep the memoized values and compare dependencies or props.

Also, not every component is expensive enough for memoization to make a noticeable difference.

For example, adding:

```js
const value = useMemo(() => name, [name]);
```

for a simple string calculation doesn't really help. It can actually make the code harder to understand without providing a meaningful performance benefit.

I would therefore **measure first and optimize the actual bottleneck**.

Also, sometimes the better solution isn't memoization at all. For example, if a piece of state is only needed by one child, I might move that state closer to the child instead of keeping it in the parent.

### Note:

- "First I'd use React DevTools Profiler to identify which components are unnecessarily rendering and why. Then I'd check state placement and whether the parent is creating new objects, arrays, or functions on every render. `React.memo` can help skip child renders when their props haven't changed. `useMemo` is mainly for avoiding expensive recalculations, while `useCallback` keeps the same function reference between renders. I wouldn't add them everywhere because memoization also has a cost and makes the code more complex. I'd measure the problem first and only optimize where it actually improves performance."
