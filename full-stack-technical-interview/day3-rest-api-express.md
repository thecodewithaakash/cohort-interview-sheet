## 3\. REST API + Express — Request Flow

For a protected endpoint like `GET /api/profile`, if a logged-in user is getting `401`, I would first check the request flow from the frontend to the backend instead of assuming the problem is in the route itself.

### Complete request flow

Suppose the frontend makes this request:

```js
fetch("/api/profile", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

The request roughly goes through these steps:

```
Frontend
   ↓
HTTP Request
   ↓
Express Middleware
   ↓
Authentication Middleware
   ↓
Route Handler
   ↓
Database
   ↓
Response
```

For example, the Express route could look like:

```
router.get("/profile", authMiddleware, getProfile);
```

The `authMiddleware` runs before `getProfile`.

The middleware checks whether the request contains a valid authentication token.

For example:

```js
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authentication required"
    });
  }

  const token = authHeader.split(" ")[1];


  req.user = decodedUser;

  next();
};
```

If everything is valid, it calls `next()`, and the request reaches the controller.

---

### Where should authentication middleware run?

Authentication middleware should run **before the protected route handler**.

For example:

```js
router.get("/profile", authMiddleware, profileController);
```

This is important because I don't want the controller to execute before I know who the user is.

For multiple protected routes, I can also apply the middleware at router level:

```js
router.use(authMiddleware);

router.get("/profile", profileController);
router.get("/orders", ordersController);
router.get("/settings", settingsController);
```

That way, all those routes are protected.

---

## How I would debug the `401`

If the user says they are logged in but `/api/profile` returns `401`, I'd check it step by step.

### 1\. Check the browser request

First, I'd open the browser's Network tab and inspect the actual request.

I'd check whether the request contains:

```
Authorization: Bearer <token>
```

If the header isn't being sent, the problem is probably on the frontend.

For example, maybe the API client isn't attaching the token correctly.

### 2\. Check the backend middleware

I'd add temporary logging:

```
console.log(req.headers.authorization);
```

This tells me whether the token actually reached Express.

If the frontend has the token but Express doesn't receive it, I'd investigate the request configuration, proxy, CORS-related setup, or API client.

### 3\. Check token verification

If the header exists, I'd check whether the token is:

- expired
- malformed
- signed with the wrong secret/key
- missing the expected claims
- being parsed incorrectly

For JWT authentication, for example:

```
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

If verification fails, the middleware should return `401`.

### 4\. Check the user lookup

If the token is valid but contains a user ID, I'd check whether the backend can find that user.

For example:

```
const user = await User.findById(decoded.userId);
```

If the user doesn't exist anymore, I'd treat the request as unauthenticated/invalid depending on the application's authentication design.

---

## Authentication vs Authorization

This is an important distinction.

**Authentication means: "Who are you?"**

**Authorization means: "Are you allowed to do this?"**

For example, imagine an admin-only endpoint:

```
GET /api/admin/users
```

If I don't send a token:

```
401 Unauthorized
```

The server doesn't know who I am.

But suppose I send a valid token and I'm a normal user:

```
{
  "id": "123",
  "role": "user"
}
```

The server knows who I am, but I'm not allowed to access the admin endpoint.

That is an authorization failure:

```
403 Forbidden
```

---

## `401` vs `403`

I remember it like this:

### `401 Unauthorized`

Use `401` when the request **doesn't have valid authentication credentials**.

Examples:

- No token
- Invalid token
- Expired token
- Invalid authentication credentials

Example:

```
return res.status(401).json({
  message: "Authentication required"
});
```

### `403 Forbidden`

Use `403` when the user **is authenticated but doesn't have permission** to perform the action.

For example:

```
if (req.user.role !== "admin") {
  return res.status(403).json({
    message: "Access denied"
  });
}
```

So the flow is basically:

```
Request
   ↓
Do we have valid authentication?
   ↓
No → 401
   ↓
Yes
   ↓
Does this user have permission?
   ↓
No → 403
   ↓
Yes
   ↓
Controller executes
```

### Note:

- "For a protected `/api/profile` route, I would put authentication middleware before the controller. The middleware checks the Authorization header, validates the token, and attaches the user information to `req.user`. If the token is missing or invalid, I return `401`. If authentication succeeds, the request goes to the controller, and authorization checks can decide whether the user has permission for a particular action. A `403` means the user is authenticated but doesn't have permission. If I get an unexpected `401`, I'd first check the browser Network tab to see if the token is being sent, then check the Express middleware, token verification, expiry, secret/configuration, and finally the user lookup."
