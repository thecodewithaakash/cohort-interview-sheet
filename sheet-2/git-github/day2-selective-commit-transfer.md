# 2. Selective Commit Transfer

## Scenario

A fix is one commit on another branch, but you need only that fix on your current branch.

## Answer: Cherry-pick

Inspect the commit, switch to the destination branch, and cherry-pick its hash:

```bash
git show <fix-commit>
git switch my-current-branch
git cherry-pick <fix-commit>
```

Cherry-pick applies that commit's changes to the current branch and creates a new commit there; it does not move the original commit.

If conflicts occur, inspect and resolve them, test the result, stage resolved files, then continue:

```bash
git status
git add <resolved-files>
git cherry-pick --continue
```

Use `git cherry-pick --abort` to cancel the operation. Avoid cherry-picking when merging/rebasing the source branch is cleaner, when the commit depends on other changes, or when repeated picks would duplicate history.

## Follow-ups

- **What is it?** Applying a selected commit's change onto the current branch as a new commit.
- **Conflicts?** Resolve, test, stage, and continue; or abort.
- **When avoid it?** When a branch integration or dependent commit series is more appropriate.
