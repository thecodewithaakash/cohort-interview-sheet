# 5. PR Has Too Many Unrelated Commits

## Scenario

A PR mixes feature work with debugging commits, temporary changes, and unrelated modifications.

## Answer: Make the PR focused

Inspect the commit list and full PR diff first. If the feature branch is private and rewriting is allowed, create a backup branch and use interactive rebase to edit, reorder, or squash commits:

```bash
git switch my-feature
git branch backup/my-feature-before-cleanup
git rebase -i origin/main
```

If the branch is shared or history must not be rewritten, create a clean branch from the target and cherry-pick only the intended commits. Review the final diff and run relevant checks.

A focused history helps reviewers understand the change, assess behavior, and spot regressions. Avoid rewriting commits that collaborators have based work on or branches protected by team policy. If a permitted rewrite affects a remote branch, use `--force-with-lease`.

## Follow-ups

- **Squash, rebase, or new branch?** Depends on ownership, branch sharing, dependencies, and team convention.
- **Why clean history?** Smaller, understandable changes are easier to review and maintain.
- **When not to rewrite?** When teammates depend on the existing commits or policy disallows it.
