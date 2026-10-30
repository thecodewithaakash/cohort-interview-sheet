
## Weekly Interview Preparation - SHEET 02
DSA + Git & GitHub + Full-Stack Technical Interview + Frontend Machine Coding

- Week 02 — Attempt everything yourself first. Use AI/GPT for understanding, hints and debugging, not blind copying.

| SECTION | WEEKLY WORK | EVIDENCE |
| --- | --- | --- |
| 1 | DSA (LeetCode) – 5 problems | Accepted screenshots + Drive folder |
| 2 | Git & GitHub – 5 scenario-based questions | Prepared answers for follow-ups |
| 3 | Full-Stack Technical – 5 interview questions | Prepared answers for follow-ups |
| 4 | Machine Coding – 1 frontend task | GitHub repo + live link + demo |

## 1 DSA (LeetCode) SECTION 1

Solve all 5 on LeetCode. Attempt them yourself before looking at solutions.

| # | PROBLEM | LEVEL |
| --- | --- | --- |
| 01 | Contains Duplicate | LeetCode Easy — LC 217 |
| 02 | Valid Anagram | Easy — LC 242 |
| 03 | Longest Substring Without Repeating Characters | Medium — LC 3 |
| 04 | Subarray Sum Equals K | Medium — LC 560 |
| 05 | Search in Rotated Sorted Array | Medium — LC 33 |

Submission: Upload proof of all 5 accepted solutions to your Week 02 DSA Drive folder.


### SECTION 2 - Git & Github

- Answer the scenario first, then prepare yourself for the follow-up questions.

## 1 Undoing a Pushed Commit
- SCENARIO You pushed a commit to your feature branch and later discovered that the change is wrong. How would you safely undo it?
    - When would you use git revert instead of git reset?
    - What changes if other developers have already pulled the commit?
    - Why can rewriting shared history create problems?

## 2 Selective Commit Transfer
- SCENARIO A bug fix exists as one commit on another branch, but you need only that fix on your current branch. What would you do?
    - What is git cherry-pick?
    - What happens if the commit has conflicts?
    - When would you avoid cherry-picking?

## 3 Branch Is Behind Main
- SCENARIO Your feature branch is several commits behind main, and you need to update it before opening a PR. Explain your approach.
    - What is the difference between merge and rebase?
    - What happens to commit history after a rebase?
    - What should you check before pushing after a rebase?

## 4 Accidentally Added node_modules
- SCENARIO You accidentally staged node_modules and notice it before creating the PR. How would you fix the repository?
    - What should be inside .gitignore?
    - How do you remove already-staged files without deleting them from your machine?
    - Why should dependencies normally not be committed?

## 5 PR Has Too Many Unrelated Commits
- SCENARIO A PR contains feature work mixed with debugging commits, temporary changes and unrelated modifications. How would you clean it up before asking for review?
    - Would you squash, rebase interactively, or create a new branch?
    - Why does a clean commit history help reviewers?
    - When should you avoid rewriting history?


## SECTION 3 · CUMULATIVE - Full-Stack Technical Interview

Questions are based on the full-stack topics currently available to you. Future sheets will keep revising previous topics while adding newly taught topics.

## 1 JavaScript — Closure
- QUESTION Explain closures in JavaScript with a practical example. Where can a closure be useful in a real application?
    - How does a closure retain access to variables?
    - Can closures be useful for data privacy?
    - Can excessive closures contribute to memory issues?

## 2 React — useEffect
- QUESTION A React component makes an API request inside useEffect, but the request is being triggered more often than expected. How would you debug it?
    - What does the dependency array control?
    - What happens when dependencies are objects/functions?
    - When should an effect have a cleanup function?

## 3 Express — Middleware
- QUESTION You have authentication, logging, validation and error-handling middleware in an Express application. Explain how you would arrange the request flow.
    - What happens if middleware neither sends a response nor calls next()?
    - Where should error-handling middleware be placed?
    - Why should authorization usually happen after authentication?

## 4 MongoDB — Indexing
- QUESTION A MongoDB query that was fast with a small dataset has become slow as the collection grows. How would you investigate and improve it?
    - What is an index?
    - How can an index improve reads?
    - Can too many indexes have a downside?

## 5 Authentication vs Authorization
- QUESTION A user successfully logs in but should only be allowed to edit their own profile. Explain how you would implement this protection in a backend API.
    - What is authentication?
    - What is authorization?
    - Why should the server not trust a userId simply because it came from the request body or URL?


### Section 4 - Frontend Machine Coding Round
 
**Time:** 2.5 hours  
**Task:** Kanban Task Board

### Build
Build a responsive Kanban board where users can manage tasks across **Todo**, **In Progress**, and **Completed** columns.

### Features

| **Feature** | **Description** |
|-------------|-----------------|
| Add Task | Add a task with **title, description, priority, and due date**. |
| Edit/Delete | Update or remove an existing task. |
| Status | Move tasks between the three columns. |
| Search | Search tasks by title. |
| Filter | Filter tasks by priority and status. |
| Persistence | Store tasks in **LocalStorage** so they survive page refresh. |
| Responsive UI | Support both **desktop and mobile** layouts. |
| UX States | Implement **empty state**, **no-results state**, and **basic validation**. |


### Deliverables
- GitHub repository
- Live deployed link
- Short demo video
- Be ready to explain:
  - Component structure
  - State management
  - Key architectural decisions

