# 4. MongoDB + Mongoose — Duplicate Registration

## Interview question

A registration API permits duplicate email addresses when requests arrive at nearly the same time. How would you prevent and handle duplicates?

## Answer

An application-level `findOne()` check helps produce a friendly response, but is not sufficient: two concurrent requests can both see no matching user before either creates one. The database must enforce uniqueness with a unique index.

```js
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});
```

Normalize email consistently according to product requirements, and ensure the unique index is actually created in the database. If concurrent inserts race, the index allows only one; catch MongoDB duplicate-key error code `11000` and respond with `409 Conflict`. Do not treat other database errors as duplicate registrations.

## Follow-ups

- **Why not just `findOne()`?** It has a race between check and insert.
- **Unique index:** Database-level constraint that guarantees uniqueness.
- **Duplicate error response:** Catch code `11000` and return a suitable `409`.
