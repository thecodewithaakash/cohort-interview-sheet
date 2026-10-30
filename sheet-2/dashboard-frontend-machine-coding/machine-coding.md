# Sheet 02 — Frontend Machine Coding

## Task: Kanban Task Board

Build a responsive task board with **Todo**, **In Progress**, and **Completed** columns.

### Features

- Add tasks with title, description, priority, and due date.
- Edit and delete tasks.
- Move tasks between statuses.
- Search by title and filter by priority/status.
- Persist tasks in LocalStorage.
- Support desktop and mobile layouts.
- Provide validation, empty state, and no-results state.

### Implementation

The working plain HTML/CSS/JavaScript implementation is in [`kanban-task-board/`](./kanban-task-board/). Open `index.html` in a browser to run it; no package installation is required.

The board stores task records as its source of truth, renders status columns from that list, and derives search/filter results without changing the saved data. LocalStorage reads are validated and storage failures are reported in the interface. Task text is inserted with `textContent` rather than interpreted as HTML.

### Verify

- Create, edit, delete, and move tasks between all three columns.
- Check title validation and optional due date/description.
- Search and combine each filter.
- Confirm empty-board and no-match messages differ.
- Refresh and confirm saved tasks remain.
- Check the responsive layout at desktop and mobile widths.

### Deliverables to add after completing externally

- GitHub repository URL
- Live deployed URL
- Short demo video

Be ready to discuss the UI structure, state model, persistence, validation, and responsive-layout decisions.
