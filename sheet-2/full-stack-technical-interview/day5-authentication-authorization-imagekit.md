# 5. Authentication + Authorization + ImageKit

## Interview question

An authenticated student changes an ID in a URL to request another student's private file or upload area. How should the backend protect the resource, and where does ImageKit fit?

## Answer

Authentication verifies the session/token and establishes the user identity. Authorization checks whether that user may access the specific resource. I would take the identity from verified server-side authentication state (for example `req.user.id`), not trust a `userId` supplied in a body or URL. For a requested file, query by both its ID and owner:

```js
const file = await File.findOne({
  _id: req.params.fileId,
  owner: req.user.id,
});

if (!file) return res.status(404).json({ message: "File not found" });
```

ImageKit stores and delivers media; it does not replace application authorization. The backend should authenticate the user, authorize upload access, and issue appropriate upload authentication parameters or perform the upload. It should determine allowed paths/folders from the authenticated identity rather than trusting a client-selected owner. Store the ImageKit file identifier and owner relationship in the application database, then check ownership again before serving private resources.

## Follow-ups

- **Authentication:** Establish who the user is.
- **Authorization:** Decide what the authenticated user may do.
- **ID manipulation:** A URL identifies the requested resource; it does not prove ownership.
- **ImageKit:** Media storage/delivery; the application remains responsible for permissions and ownership.
