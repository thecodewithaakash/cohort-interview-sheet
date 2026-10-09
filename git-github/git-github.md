## 2. Git & GitHub  
### SECTION 2  
Answer these like an interview: first explain **what** you would do, then explain **why**. Be ready for follow‑ups.

---

### 1. Wrong Branch, Correct Work  
**Scenario:** You accidentally made 4 commits on `main` instead of your feature branch.  
- How would you move the work to the correct branch without losing it?  
- Would your approach change if the commits were already pushed to the remote?  
- When would you use `cherry-pick` here?  
- What would you do if teammates were already using `main`?  

---

### 2. Merge Conflict During PR  
**Scenario:** Your feature branch has a merge conflict with `main` just before the PR is merged.  
- Walk through the complete process of resolving it safely.  
- How do you verify that the conflict resolution did not break existing functionality?  
- Would you merge `main` into the feature branch or rebase? Explain the trade‑off.  
- What should you do before pushing the resolved branch?  

---

### 3. Secret Accidentally Committed  
**Scenario:** A developer committed an API key to GitHub and immediately realizes the mistake.  
- What steps should they take?  
- Why is deleting the commit/file not enough?  
- What should happen to the exposed key itself?  
- How would you prevent similar secrets from being committed again?  

---

### 4. PR Review With New Changes  
**Scenario:** A reviewer asks for changes on your pull request after you have already pushed several commits.  
- How would you update the PR while keeping the review understandable?  
- Would you create a new commit or amend/squash?  
- When can force‑push become risky?  
- How would you communicate a significant change to the reviewer?  

---

### 5. Recovering Lost Local Work  
**Scenario:** You ran a Git command incorrectly and your local branch no longer points to the commit containing yesterday’s work.  
- How would you investigate and recover it?  
- What is `git reflog` and why can it help?  
- How would you verify the recovered commit before changing the branch?  
- What habit would reduce the chance of permanent loss?  
