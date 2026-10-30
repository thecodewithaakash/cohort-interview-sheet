## 5\. Recovering Lost Local Work

### What I would do

If I accidentally ran a Git command and my branch no longer points to yesterday's work, I would **not run more destructive Git commands immediately**.

First, I would check the current state:

```
git status
git log --oneline --all --decorate
```

Then I would check the Git reflog:

```
git reflog
```

I would look for the commit where my branch was pointing before I ran the incorrect command.

For example:

```
abc1234 HEAD@{0}: reset: moving to HEAD~2
def5678 HEAD@{1}: commit: Add payment validation
```

Here, `def5678` may be the commit containing yesterday's work.

I can inspect it with:

```
git show def5678
```

If it is the correct commit, I can recover it by creating a temporary branch first:

```
git switch -c recovered-work def5678
```

Once I confirm everything is correct, I can move my original branch back if needed.

### Why

My first priority is to **find the lost commit before changing anything else**. Git often still has a reference to commits that are no longer reachable from the current branch.

---

## What is `git reflog`?

`git reflog` records changes to references such as `HEAD` and local branches.

For example:

```
git reflog
```

might show:

```
def5678 HEAD@{0}: reset: moving to HEAD~2
abc9876 HEAD@{1}: commit: Fix checkout bug
```

This tells me where `HEAD` was pointing before the reset.

### Why it helps

A normal `git log` mainly shows commits that are reachable from the current branch. A commit that I accidentally removed from the branch may not appear there.

`reflog` can help me find those previous positions and recover the commit.

---

## How I would verify the recovered commit

Before changing my original branch, I would inspect the commit:

```
git show def5678
```

I could also check its history:

```
git log --oneline def5678
```

If it is a bigger change, I would create a temporary recovery branch:

```
git switch -c recovered-work def5678
```

Then I would check the files and run the project's tests:

```
git status
npm test
```

If everything looks correct, I would move forward with the recovered branch or restore the original branch to that commit.

### Why

I don't want to blindly reset my branch to an unknown commit. First I verify that it actually contains the work I lost.

---

## What habit would reduce the chance of permanent loss?

I would make small, regular commits instead of keeping a large amount of work uncommitted.

For example:

```
git add .
git commit -m "Add payment validation"
```

I would also push important work to a remote feature branch regularly:

```
git push -u origin feature/payment-validation
```

Another useful habit is checking `git status` before running commands such as `reset`, `rebase`, or `restore`.

### Why

If my work is committed and pushed, recovering it is much easier. Even if I make a mistake locally, the remote branch gives me another copy of the work.
