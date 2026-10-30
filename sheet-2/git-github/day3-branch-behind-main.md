# 3. Branch Is Behind Main

## Scenario

Your feature branch is several commits behind `main`, and you need to update it before opening a PR.

## Answer: Fetch, update, integrate

Fetch remote changes and fast-forward local `main`, then merge it into the feature branch:

```bash
git fetch origin
git switch main
git pull --ff-only origin main
git switch my-feature
git merge main
```

Merge preserves existing commits and may create a merge commit. Rebase replays the feature commits on top of `main`, creating new commit hashes and a linear history. Merge is usually safer for a shared feature branch; rebase can be suitable for a private branch when the team prefers it.

Resolve conflicts carefully, inspect the diff, and run tests/build/lint before pushing. If rebasing a previously pushed branch, coordinate with collaborators and use `git push --force-with-lease`; do not rewrite shared history without agreement.

## Follow-ups

- **Merge vs rebase:** Merge joins histories; rebase replays commits and rewrites their hashes.
- **History after rebase:** Feature commits appear on top of the updated base as new commits.
- **Before pushing:** Verify diff and tests; coordinate any force-with-lease update.
