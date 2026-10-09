## 2\. Merge Conflict During PR

### What I would do

If my feature branch has a conflict with `main`, I would first make sure my local repository is clean and then get the latest changes from `main`.

```
git status
git switch main
git pull origin main
```

Then I would switch back to my feature branch and merge the latest `main` into it:

```
git switch feature/my-feature
git merge main
```

If there is a conflict, Git will show the files that need to be fixed.

I would open those files and look for conflict markers:

```
<<<<<<< HEAD
My feature changes
=======
Changes from main
>>>>>>> main
```

I would decide which code should stay, combine the changes if necessary, and remove the conflict markers.

After fixing the files:

```
git status
git add .
git commit
```

Then I would run the project's tests and build before pushing the branch.

---

### Why

I want to resolve the conflict **locally**, where I can understand both changes and test the final result before the PR is merged.

I also update my local `main` first so that I am resolving the conflict against the latest version instead of an old copy.

---

## How I would verify the resolution

After resolving the conflict, I would not assume that Git accepting the merge means everything is correct.

I would run:

```
# Run the project's tests
npm test

# Build the project
npm run build
```

The exact commands depend on the project.

I would also manually test the functionality affected by the conflict. For example, if the conflict was in an API or login feature, I would specifically test that part.

Finally, I would check the changes:

```
git diff HEAD~1
git status
```

### Why

A merge conflict is mainly a **text/code conflict**, but Git cannot understand whether the final code makes business sense. The code can merge successfully and still have a bug.

So I want both automated tests and some manual testing around the affected functionality.

---

## Merge `main` or rebase?

For a shared feature branch, I would normally choose **merge** unless the team specifically prefers rebasing.

```
git switch feature/my-feature
git merge main
```

The main advantage is that merge does not rewrite the existing commits on my feature branch.

Another option is:

```
git switch feature/my-feature
git rebase main
```

Rebase puts my feature commits on top of the latest `main`, which gives a cleaner and more linear history.

### Trade-off

**Merge:**

- Safer for a shared branch.
- Does not rewrite existing commit history.
- May create a merge commit.
- History can become a little more complicated.

**Rebase:**

- Creates a cleaner, linear history.
- Makes the PR history easier to read.
- Rewrites commit history.
- Can be confusing if other developers are already working from the same feature branch.

For my assignment, I would say **I prefer merge for safety on a shared branch, and rebase when the branch is private and the team prefers a clean history.**

---

## What I would do before pushing

Before pushing the resolved branch, I would:

1.  Check that there are no remaining conflict markers.
2.  Run tests.
3.  Run the build/linter if the project has them.
4.  Review the final diff.
5.  Check the Git status.
6.  Push the branch.

```
git status
git diff
npm test
npm run build

git push origin feature/my-feature
```

If I used **rebase** on a branch that was already pushed, I would need to update the remote history:

```
git push --force-with-lease origin feature/my-feature
```

I would use `--force-with-lease`, not plain `--force`.
