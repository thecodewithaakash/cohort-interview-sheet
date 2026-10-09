## 1\. JavaScript — Async Flow

JavaScript is single-threaded, so it executes synchronous code first. When we use things like `fetch()` or `setTimeout()`, they don't block the main JavaScript thread. Their callbacks are handled later through the **event loop**.

For example:

```js
console.log("1");

fetch("/api/users")
  .then((response) => response.json())
  .then((data) => {
    console.log("2 - API response");
  });

setTimeout(() => {
  console.log("3 - timeout");
}, 0);

console.log("4");
```

The output will generally be:

```
1
4
2 - API response
3 - timeout
```

### Why?

First, JavaScript runs all the normal synchronous code:

```
console.log("1");
console.log("4");
```

Then the asynchronous operations are handled.

A `fetch()` returns a Promise. When the Promise is resolved, its `.then()` callback is placed in the **microtask queue**.

The `setTimeout()` callback goes into the **macrotask/task queue** after its timer is ready.

The event loop gives priority to microtasks, so the Promise callback runs before the `setTimeout()` callback.

### Microtask vs Macrotask

A **microtask** is a task that gets executed after the current synchronous code finishes, before the next macrotask is processed.

Common examples are:

- Promise `.then()`, `.catch()`, `.finally()`
- `queueMicrotask()`
- MutationObserver callbacks in the browser

A **macrotask** (often just called a task) includes things like:

- `setTimeout()`
- `setInterval()`
- DOM events such as clicks
- Some browser/I/O callbacks

So, in a simplified way, the event loop works like:

```
Run synchronous JavaScript
        ↓
Run microtasks
        ↓
Run a macrotask
        ↓
Run microtasks again
        ↓
Continue...
```

### Where do Promise callbacks fit?

Promise callbacks such as `.then()` and `.catch()` go into the **microtask queue**.

That's why this:

```
console.log("start");

Promise.resolve().then(() => {
  console.log("promise");
});

setTimeout(() => {
  console.log("timeout");
}, 0);

console.log("end");
```

prints:

```
start
end
promise
timeout
```

Even though the timeout is set to `0`, it doesn't mean it runs immediately. The current synchronous code has to finish, and the microtask queue is processed before the timer callback.

### Why can synchronous code freeze the UI?

The main JavaScript thread is also responsible for things like handling user interactions and updating the page.

If we run a large synchronous operation, JavaScript can't move on to other work until that operation finishes.

For example:

```
function blockMainThread() {
  const start = Date.now();

  while (Date.now() - start < 5000) {
    // blocking for about 5 seconds
  }
}

blockMainThread();
```

During those 5 seconds, JavaScript is busy running the `while` loop. It can't properly respond to clicks, typing, animations, or other UI work.

That's why the browser can appear **frozen or unresponsive**.

### Note:

- JavaScript runs synchronous code first. Async operations like `fetch()` and timers are handled outside the current call stack, and their callbacks are queued. Promise callbacks are microtasks, so they normally run before timer callbacks, which are macrotasks. If we do too much synchronous work on the main thread, the event loop can't process UI-related work, making the application feel frozen.
