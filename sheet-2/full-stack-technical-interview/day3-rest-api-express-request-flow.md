# 3. REST API + Express — Protected Request Flow

## Interview question

A logged-in user receives `401` from a protected `GET /api/profile`. Explain the request flow and how you would debug it.

## Answer

The request passes through Express middleware, authentication, any authorization and validation checks, the route handler, and then the response. Authentication middleware should run before the protected controller. It validates the credential and attaches trusted identity (for example `req.user`) to the request.

I would inspect the browser Network request to confirm the expected credential is sent, check backend middleware receives it, and verify parsing, expiry, signature/configuration, and any user lookup. I would avoid logging raw tokens or secrets while debugging.

Authentication answers “Who are you?” A missing or invalid credential should normally produce `401`. Authorization answers “May you do this?” An authenticated user without permission should normally receive `403`.

```js
router.get("/profile", authenticate, getProfile);
```

## Follow-ups

- **Middleware order:** Authentication before protected route work; authorization after identity is known.
- **Middleware neither responds nor calls `next()`:** The request hangs.
- **401 vs 403:** Invalid/missing authentication vs authenticated but forbidden.
