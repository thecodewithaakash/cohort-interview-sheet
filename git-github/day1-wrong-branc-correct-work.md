## 1\. Wrong Branch, Correct Work

### What I would do

If I accidentally made 4 commits on `main`, I would first create the correct feature branch from the current `main`. This keeps all 4 commits on the new branch.

```
# I am currently on main
git switch main

# Create the feature branch with the existing commits
git switch -c feature/my-feature
```

Now the 4 commits are also part of `feature/my-feature`. If those commits should not remain on `main`, I would move `main` back to the commit before those 4 commits.

```
git switch main
git reset --hard HEAD~4
```

Then I would continue working on the feature branch.

### Why

I create the feature branch **before resetting `main`** because I don't want to lose the commits. The new branch keeps a reference to those commits, so I can safely move `main` back.

---

### If the commits were already pushed

My approach would depend on whether other people have pulled the changes.

If nobody is using those commits yet, I could reset `main` locally and force-push the corrected history:

```
git switch main
git reset --hard HEAD~4
git push --force-with-lease origin main
```

I prefer `--force-with-lease` over `--force` because it provides some protection against overwriting someone else's newer changes.

If teammates have already pulled the commits, I would **not rewrite `main` history**. Instead, I would use `git revert` to undo the unwanted commits.

```
git switch main
git revert HEAD~3..HEAD
git push origin main
```

This creates new commits that undo the previous changes.

### Why

Once other developers have based their work on the existing `main` history, rewriting it can cause problems for them. In a shared branch, reverting is usually safer than force-pushing.

---

### When would I use `cherry-pick`?

I would use `cherry-pick` when I only want specific commits on another branch.

For example, if I accidentally made the commits on `main`, but only commits `abc123` and `def456` belong to my feature:

```
git switch feature/my-feature
git cherry-pick abc123 def456
```

### Why

`cherry-pick` copies the changes from specific commits and creates new commits on the current branch. It is useful when I don't want to move the entire branch history.

For this exact scenario, if **all 4 commits belong to the feature**, creating the branch before resetting `main` is simpler than cherry-picking all four.

---

### What if teammates were already using `main`?

I would avoid force-pushing or rewriting `main`.

First, I would create the feature branch so the work is safe:

```
git switch -c feature/my-feature
git push -u origin feature/my-feature
```

Then I would restore `main` using `git revert` rather than `reset`:

```
git switch main
git revert HEAD~3..HEAD
git push origin main
```

I would also tell the team what happened so they know that the accidental commits were reverted.

### Why

`main` is normally a shared branch. My priority would be to **protect the team's existing history and work** rather than simply making my local Git history look clean.
