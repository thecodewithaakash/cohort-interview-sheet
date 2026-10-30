# 4. Accidentally Added `node_modules`

## Scenario

You staged `node_modules` and notice before creating the PR.

## Answer: Unstage and ignore

If the files are staged but not committed, unstage them without deleting the local files:

```bash
git restore --staged -- node_modules/
```

Add `node_modules/` to `.gitignore`, then stage only the intended changes. If the directory is already tracked, remove it from Git's index while retaining local files:

```bash
git rm -r --cached -- node_modules/
```

The `.gitignore` should exclude local/generated files such as `node_modules/`, secret-bearing environment files, and build output when appropriate. Dependencies should be reproducible from the package manifest and lockfile, not committed as a large platform-dependent directory.

## Follow-ups

- **What belongs in `.gitignore`?** Local dependencies, secrets/local config, and generated output.
- **Unstage without deleting?** `git restore --staged -- node_modules/`.
- **Why not commit dependencies?** They bloat the repository; the lockfile records reproducible versions.
