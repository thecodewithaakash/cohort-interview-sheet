## 4\. MongoDB + Mongoose — Duplicate Data

For user registration, I would not depend only on checking whether the email already exists. The database should also enforce the uniqueness of the email.

### Why application-level checking alone is not enough

A common approach is:

```js
const existingUser = await User.findOne({ email });

if (existingUser) {
  return res.status(409).json({
    message: "Email already registered"
  });
}

const user = await User.create({
  email,
  password
});
```

This looks fine, but there is a **race condition**.

For example, two requests can arrive at almost the same time:

```
Request A → findOne(email) → no user found
Request B → findOne(email) → no user found

Request A → create user
Request B → create user
```

Both requests can pass the application-level check before either one creates the record.

So checking first is useful for a friendly response, but **it isn't enough to guarantee uniqueness**.

---

## How a unique index helps

I would create a unique index on the email field.

With Mongoose:

```js
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
```

The important part here is:

```
unique: true
```

This results in a MongoDB unique index being created for that field.

The database then becomes the final authority for uniqueness.

Even if two requests arrive at almost exactly the same time, MongoDB will not allow both documents with the same indexed email.

One request succeeds and the other gets a duplicate-key error.

---

## I would also normalize the email

Before storing the email, I'd normally normalize it so that something like:

```
User@Example.com
user@example.com
```

doesn't accidentally become two different accounts, depending on the application's requirements.

For example:

```
const email = req.body.email.trim().toLowerCase();
```

Then I would store the normalized value.

The exact normalization rules can depend on the application's requirements, but the important thing is to be consistent.

---

## How should the API handle the duplicate-key error?

When MongoDB rejects the second insert, MongoDB/Mongoose will generally return a duplicate-key error with error code `11000`.

So I would catch that error and return an appropriate client response.

For example:

```js
try {
  const user = await User.create({
    email,
    password
  });

  return res.status(201).json({
    message: "User registered successfully",
    user
  });
} catch (error) {
  if (error.code === 11000) {
    return res.status(409).json({
      message: "Email is already registered"
    });
  }

  return res.status(500).json({
    message: "Something went wrong"
  });
}
```

I would use **`409 Conflict`** because the request conflicts with an existing resource.

So the client gets something like:

```
{
  "message": "Email is already registered"
}
```

---

## The overall approach

I would use both application-level validation and a database constraint, but for different reasons:

```
User submits registration
        ↓
Normalize/validate email
        ↓
Optional findOne() check
        ↓
Create user
        ↓
MongoDB unique index
        ↓
 ┌───────────────┴───────────────┐
 ↓                               ↓
Success                    Duplicate email
 ↓                               ↓
201 Created                    409 Conflict
```

The `findOne()` check can give a quick and user-friendly response in the normal case, but the **unique index is what protects the database against race conditions**.

### Note:

- "I wouldn't rely only on an application-level `findOne()` check because two registration requests can run that check at the same time and both can see that the email doesn't exist. I'd create a unique index on the email field so MongoDB itself guarantees uniqueness. I would still do application-level validation because it gives a better user experience, but the database constraint is the final protection. If two requests race, one insert succeeds and the other gets MongoDB's duplicate-key error, usually error code `11000`. I'd catch that error and return `409 Conflict` with a message like `Email is already registered`."
