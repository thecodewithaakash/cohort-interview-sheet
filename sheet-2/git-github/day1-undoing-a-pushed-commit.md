# 1. Undoing a Pushed Commit

## Scenario

You pushed a wrong commit to your feature branch. Undo it safely.

## Answer: Revert shared history

First inspect the commit. If the branch is shared or someone may have pulled it, use `git revert`; it makes a new commit that reverses the change while preserving published history.

```bash
git log --oneline
git show <commit>
git revert <commit>
git push
```

`git reset` moves a branch pointer and is generally appropriate for unpublished local history. Resetting a pushed branch rewrites history and may require a force push; that can make collaborators' branches diverge or overwrite their work. If rewriting a private remote branch is agreed upon, use `--force-with-lease` rather than `--force`.

## Follow-ups

- **Revert vs reset:** Revert records an inverse change in a new commit; reset moves the branch reference.
- **If others pulled it:** Prefer revert so their existing history remains valid.
- **Why shared rewrites are risky:** Other developers may have based commits on the old history.
