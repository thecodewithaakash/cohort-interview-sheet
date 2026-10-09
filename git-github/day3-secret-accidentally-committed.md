## 3\. Secret Accidentally Committed

### What I would do

If an API key is accidentally committed and pushed to GitHub, I would treat it as **compromised immediately**.

First, I would revoke or rotate the exposed API key:

```
Exposed API key
      ↓
Revoke / rotate it
      ↓
Create a new key
      ↓
Update the application
```

Then I would remove the secret from the code and replace it with an environment variable.

For example:

```
const apiKey = process.env.API_KEY;
```

I would add the environment file to `.gitignore`:

```
.env
.env.*
```

Then I would commit the code change and push it.

If the secret is already in Git history, I would also clean the Git history using an appropriate tool such as `git filter-repo` or the repository hosting provider's secret-removal process.

### Why

The most important step is **revoking the key**. Even if I remove the file from the latest commit, the old commit can still exist in Git history, and someone may already have copied the key.

Removing the file only prevents the secret from being visible in the current version. It does not automatically make the secret disappear from previous commits.

---

## Why deleting the commit/file is not enough

Git keeps commit history. For example:

```
Commit 1 → API key added
Commit 2 → API key removed
```

The API key may still be available in **Commit 1**.

Someone could check the old commit or clone the repository and find it.

Also, if the repository was public, the key may already have been copied, cached, or scanned by automated systems.

So I would assume the key is compromised even if I remove it immediately.

---

## What should happen to the exposed key?

I would **revoke it and generate a new one**.

I would not simply continue using the same key after deleting it from GitHub.

For example:

```
Old API_KEY → REVOKE
New API_KEY → Store securely
Application → Use new API_KEY
```

I would also check the API provider's logs, if available, to see whether the exposed key was used by someone else.

### Why

Once a secret has been pushed to a remote repository, I cannot guarantee that nobody has seen or copied it. Rotating the secret makes the exposed value useless.

---

## How I would prevent this in the future

I would keep secrets outside the source code and use environment variables or a proper secret manager.

For example:

```
API_KEY=your-secret-key
```

Then in the application:

```
const apiKey = process.env.API_KEY;
```

I would also add secret scanning to the development workflow.

For example, tools such as **GitHub secret scanning**, pre-commit hooks, or tools like `gitleaks` can help detect secrets before they reach the remote repository.

I would also make sure `.env` files are included in `.gitignore`:

```
.env
.env.local
.env.production
```

For a team project, I would document how developers should configure their local environment without committing actual secrets.
