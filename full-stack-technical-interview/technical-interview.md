# 3. Full-Stack Technical Interview

## SECTION 3 · CUMULATIVE

This section is cumulative. Questions can come from JavaScript, React, Node.js, Express, REST APIs, MongoDB/Mongoose, authentication/authorization, ImageKit and — once taught — TypeScript, Next.js and other full-stack topics.

This week's questions stay within topics already taught, while the bank expands as the course progresses.

## 1. JavaScript — Async Flow

**QUESTION**

You call an API using `fetch()`, update the UI after the response, and also have a `setTimeout()` in the same flow. Explain how JavaScript's event loop affects the order of execution.

- What is the difference between a microtask and a macrotask?
- Where do Promise callbacks fit?
- Why can blocking synchronous JavaScript make the UI feel frozen?

---

## 2. React — Unnecessary Re-render

**QUESTION**

A React page becomes slow because a parent component re-renders frequently and several child components also re-render. How would you investigate and improve it?

- When would `React.memo` help?
- What are `useMemo` and `useCallback` actually solving?
- Why should you avoid adding memoization everywhere?

---

## 3. REST API + Express — Request Flow

**QUESTION**

A protected `GET /api/profile` endpoint is returning `401` for a logged-in user. Explain the complete request flow and how you would debug it.

- Where should authentication middleware run?
- How would you distinguish an authentication failure from an authorization failure?
- Which HTTP status codes would you use for `401` and `403`?

---

## 4. MongoDB + Mongoose — Duplicate Data

**QUESTION**

Your registration API is allowing two users to register with the same email under a race condition. How would you prevent and handle duplicate records?

- Would application-level checking alone be sufficient?
- How can a unique index help?
- How should the API respond when a duplicate-key error occurs?

---

## 5. Authentication + Authorization + ImageKit

**QUESTION**

A student is authenticated but should not be allowed to access another student's private resource or upload area. Design the checks you would apply before allowing the request, and explain where ImageKit fits into the upload flow.

- What is the difference between authentication and authorization?
- What information should the server trust from the client?
- How would you prevent a user from changing an ID in the URL and accessing someone else's data?
