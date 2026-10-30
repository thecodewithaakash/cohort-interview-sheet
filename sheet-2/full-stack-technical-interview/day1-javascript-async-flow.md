# 1. JavaScript — Async Flow

## Interview question

A page calls an API with `fetch()` and also schedules a `setTimeout()`. Explain how the event loop determines the order of callbacks.

## Answer

JavaScript runs synchronous code on the call stack first. Async APIs complete outside the current stack and schedule their callbacks. Promise reactions such as `.then()` are microtasks. Timer callbacks such as `setTimeout()` are tasks (often informally called macrotasks). After the current stack finishes, the browser processes queued microtasks before moving on to a timer task.

```js
console.log("start");
Promise.resolve().then(() => console.log("promise"));
setTimeout(() => console.log("timer"), 0);
console.log("end");
// start, end, promise, timer
```

For a real `fetch()`, network timing matters: the request's Promise only settles after the response becomes available, so its callback is not guaranteed to precede every timer merely because Promise callbacks are microtasks.

Long-running synchronous JavaScript occupies the main thread, preventing it from handling user input, rendering, and other queued work; the page can appear frozen.

## Follow-ups

- **Microtasks:** Promise `.then/.catch/.finally`, `queueMicrotask`.
- **Tasks:** Timers and many browser event callbacks.
- **UI freeze:** The event loop cannot process other main-thread work until synchronous code finishes.
