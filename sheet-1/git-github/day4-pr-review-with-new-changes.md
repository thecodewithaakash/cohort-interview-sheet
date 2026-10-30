## 4\. PR Review With New Changes

### What I would do

If a reviewer asks for changes after I have already pushed several commits, I would first understand and address all the review comments.

I would make the changes locally and run the tests:

```
git switch feature/my-feature

# Make the requested changes

git status
git diff

# Run project tests
npm test
```

Then I would push the updated branch:

```
git add .
git commit -m "Address PR review comments"
git push origin feature/my-feature
```

The existing PR will automatically update with the new commit.

### Why

For an active PR, I usually prefer a **new commit** while the review is still happening. It makes it easy for the reviewer to see exactly what changed based on their feedback.

For example:

```
commit 1 - Add login feature
commit 2 - Add validation
commit 3 - Fix API response
commit 4 - Address PR review comments
```

The reviewer can easily check the last commit and understand what I changed.

---

## Would I create a new commit or amend/squash?

It depends on the stage of the PR.

During the review, I would normally create a **new commit**:

```
git add .
git commit -m "Address review comments"
git push
```

Once the review is complete and the PR is ready to merge, I might squash the commits if the team's workflow prefers a clean history.

For example, the final history could become:

```
Add user authentication
```

instead of having many small commits like:

```
Add authentication
Fix typo
Fix test
Fix review comment
Fix another review comment
```

### Why

New commits make the review process easier to follow. Squashing is more useful at the end when I want the final branch history to be clean.

If the repository has a rule such as **"squash and merge"**, I would follow that team's convention.

---

## When can force-push become risky?

Force-pushing can be risky when other developers are also working on the same branch.

For example:

```
git push --force
```

can overwrite commits that somebody else pushed after my last pull.

If I really need to force-push, I prefer:

```
git push --force-with-lease
```

`--force-with-lease` checks that the remote branch has not changed unexpectedly.

### Why

A force-push rewrites the remote branch history. If someone else has based their work on the old history, they may have to recover their commits or deal with confusing Git conflicts.

So I would avoid force-pushing a shared branch unless the team knows about it.

---

## How I would communicate a significant change

If the reviewer requested something that requires a bigger change, I would explain it clearly in the PR instead of silently making a large change.

For example:

> I changed the authentication flow based on your feedback. This affects both the API validation and the frontend error handling. I also added tests for the new cases. Could you please take another look at these two areas?

If the change is very large or changes the original approach, I would discuss it with the reviewer before spending too much time implementing it.

### Why

A significant change can affect more than the original review comment. Communicating it helps the reviewer understand **what changed, why it changed, and where they should focus their review**.
