const STORAGE_KEY = "sheet-02-kanban-tasks";
const statuses = ["Todo", "In Progress", "Completed"];
const priorities = ["Low", "Medium", "High"];

const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#task-title");
const descriptionInput = document.querySelector("#task-description");
const priorityInput = document.querySelector("#task-priority");
const dueDateInput = document.querySelector("#task-due-date");
const formHeading = document.querySelector("#form-heading");
const submitButton = document.querySelector("#submit-button");
const cancelEditButton = document.querySelector("#cancel-edit");
const formError = document.querySelector("#form-error");
const searchInput = document.querySelector("#task-search");
const priorityFilter = document.querySelector("#priority-filter");
const statusFilter = document.querySelector("#status-filter");
const taskCount = document.querySelector("#task-count");
const boardEmpty = document.querySelector("#board-empty");
const storageMessage = document.querySelector("#storage-message");
const board = document.querySelector("#board");

let tasks = loadTasks();
let editingId = null;

function isTask(value) {
  return value
    && typeof value.id === "string"
    && typeof value.title === "string"
    && typeof value.description === "string"
    && priorities.includes(value.priority)
    && statuses.includes(value.status)
    && (value.dueDate === "" || /^\d{4}-\d{2}-\d{2}$/.test(value.dueDate));
}

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || !parsed.every(isTask)) {
      storageMessage.textContent = "Saved task data was invalid, so the board started empty.";
      storageMessage.hidden = false;
      return [];
    }

    return parsed;
  } catch (error) {
    storageMessage.textContent = "Could not read saved tasks. The board is available, but saved data may not load.";
    storageMessage.hidden = false;
    console.error("Could not load saved tasks from LocalStorage.", error);
    return [];
  }
}

function persistTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    storageMessage.hidden = true;
    storageMessage.textContent = "";
  } catch (error) {
    storageMessage.textContent = "Tasks changed, but this browser could not save them. Check storage permissions or available space.";
    storageMessage.hidden = false;
    console.error("Could not save tasks to LocalStorage.", error);
  }
}

function createTaskId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function formatDueDate(value) {
  if (!value) return "No due date";
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function makeStatusSelect(task) {
  const select = document.createElement("select");
  select.setAttribute("aria-label", `Move ${task.title} to another status`);
  select.dataset.action = "status";
  select.dataset.id = task.id;

  for (const status of statuses) {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    option.selected = task.status === status;
    select.append(option);
  }

  return select;
}

function renderTask(task) {
  const card = createElement("article", "task-card");
  const title = createElement("h4", "", task.title);
  const description = createElement("p", "task-description", task.description || "No description");
  const meta = createElement("div", "task-meta");
  const priority = createElement(
    "span",
    `priority priority-${task.priority.toLowerCase()}`,
    task.priority
  );
  const dueDate = createElement("time", "", formatDueDate(task.dueDate));

  if (task.dueDate) dueDate.dateTime = task.dueDate;
  meta.append(priority, dueDate);

  const controls = createElement("div", "task-controls");
  const editButton = createElement("button", "task-action", "Edit");
  editButton.type = "button";
  editButton.dataset.action = "edit";
  editButton.dataset.id = task.id;

  const deleteButton = createElement("button", "task-action delete-button", "Delete");
  deleteButton.type = "button";
  deleteButton.dataset.action = "delete";
  deleteButton.dataset.id = task.id;

  controls.append(makeStatusSelect(task), editButton, deleteButton);
  card.append(title, description, meta, controls);
  return card;
}

function getVisibleTasks() {
  const search = searchInput.value.trim().toLowerCase();
  return tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search);
    const matchesPriority = priorityFilter.value === "All"
      || task.priority === priorityFilter.value;
    const matchesStatus = statusFilter.value === "All"
      || task.status === statusFilter.value;
    return matchesSearch && matchesPriority && matchesStatus;
  });
}

function render() {
  const visibleTasks = getVisibleTasks();
  taskCount.textContent = String(tasks.length);

  for (const status of statuses) {
    const list = board.querySelector(`[data-list="${status}"]`);
    const count = board.querySelector(`[data-count="${status}"]`);
    const columnTasks = visibleTasks.filter((task) => task.status === status);

    list.replaceChildren(...columnTasks.map(renderTask));
    count.textContent = String(columnTasks.length);
  }

  boardEmpty.hidden = visibleTasks.length > 0;
  boardEmpty.textContent = tasks.length === 0
    ? "No tasks yet. Add a task to get your board started."
    : "No tasks match your search or filters. Try changing them.";
}

function resetForm() {
  form.reset();
  priorityInput.value = "Medium";
  editingId = null;
  formHeading.textContent = "Add a task";
  submitButton.textContent = "Add task";
  cancelEditButton.hidden = true;
  formError.textContent = "";
}

function startEditing(task) {
  editingId = task.id;
  titleInput.value = task.title;
  descriptionInput.value = task.description;
  priorityInput.value = task.priority;
  dueDateInput.value = task.dueDate;
  formHeading.textContent = "Edit task";
  submitButton.textContent = "Save changes";
  cancelEditButton.hidden = false;
  formError.textContent = "";
  titleInput.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  if (!title) {
    formError.textContent = "Enter a task title before saving.";
    titleInput.focus();
    return;
  }

  const dueDate = dueDateInput.value;
  if (dueDate && Number.isNaN(new Date(`${dueDate}T00:00:00`).getTime())) {
    formError.textContent = "Enter a valid due date.";
    dueDateInput.focus();
    return;
  }

  const existingTask = tasks.find((task) => task.id === editingId);
  const task = {
    id: editingId ?? createTaskId(),
    title,
    description: descriptionInput.value.trim(),
    priority: priorityInput.value,
    dueDate,
    status: existingTask?.status ?? "Todo",
  };

  tasks = existingTask
    ? tasks.map((item) => item.id === editingId ? task : item)
    : [task, ...tasks];

  persistTasks();
  resetForm();
  render();
});

cancelEditButton.addEventListener("click", resetForm);
searchInput.addEventListener("input", render);
priorityFilter.addEventListener("change", render);
statusFilter.addEventListener("change", render);

board.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const task = tasks.find((item) => item.id === button.dataset.id);
  if (!task) return;

  if (button.dataset.action === "edit") {
    startEditing(task);
  } else if (button.dataset.action === "delete") {
    tasks = tasks.filter((item) => item.id !== task.id);
    if (editingId === task.id) resetForm();
    persistTasks();
    render();
  }
});

board.addEventListener("change", (event) => {
  const select = event.target.closest('select[data-action="status"]');
  if (!select || !statuses.includes(select.value)) return;

  tasks = tasks.map((task) => task.id === select.dataset.id
    ? { ...task, status: select.value }
    : task);
  persistTasks();
  render();
});

render();
