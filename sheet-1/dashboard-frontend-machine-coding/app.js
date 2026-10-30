const STORAGE_KEY = "sheet01-interview-practice-tracker";

const starterQuestions = [
  { id: "dsa-1", title: "Two Sum", category: "DSA", difficulty: "Easy", status: "Pending" },
  { id: "dsa-26", title: "Remove Duplicates from Sorted Array", category: "DSA", difficulty: "Easy", status: "Pending" },
  { id: "dsa-283", title: "Move Zeroes", category: "DSA", difficulty: "Easy", status: "Pending" },
  { id: "dsa-189", title: "Rotate Array", category: "DSA", difficulty: "Medium", status: "Pending" },
  { id: "dsa-15", title: "3Sum", category: "DSA", difficulty: "Medium", status: "Pending" },
  { id: "git-1", title: "Wrong Branch, Correct Work", category: "Git", difficulty: "Medium", status: "Pending" },
  { id: "git-2", title: "Merge Conflict During PR", category: "Git", difficulty: "Medium", status: "Pending" },
  { id: "git-3", title: "Secret Accidentally Committed", category: "Git", difficulty: "Medium", status: "Pending" },
  { id: "git-4", title: "PR Review With New Changes", category: "Git", difficulty: "Medium", status: "Pending" },
  { id: "git-5", title: "Recovering Lost Local Work", category: "Git", difficulty: "Medium", status: "Pending" },
  { id: "tech-1", title: "JavaScript — Async Flow", category: "Technical", difficulty: "Medium", status: "Pending" },
  { id: "tech-2", title: "React — Unnecessary Re-render", category: "Technical", difficulty: "Medium", status: "Pending" },
  { id: "tech-3", title: "REST API + Express — Request Flow", category: "Technical", difficulty: "Medium", status: "Pending" },
  { id: "tech-4", title: "MongoDB + Mongoose — Duplicate Data", category: "Technical", difficulty: "Medium", status: "Pending" },
  { id: "tech-5", title: "Authentication + Authorization + ImageKit", category: "Technical", difficulty: "Medium", status: "Pending" }
];

const elements = {
  totalQuestions: document.querySelector("#total-questions"),
  completedDsa: document.querySelector("#completed-dsa"),
  completedInterview: document.querySelector("#completed-interview"),
  machineStatus: document.querySelector("#machine-status"),
  machineStatusLabel: document.querySelector("#machine-status-label"),
  progressSummary: document.querySelector("#progress-summary"),
  progressPercent: document.querySelector("#progress-percent"),
  progressTrack: document.querySelector("#progress-track"),
  progressFill: document.querySelector("#progress-fill"),
  form: document.querySelector("#question-form"),
  titleInput: document.querySelector("#question-title"),
  categoryInput: document.querySelector("#question-category"),
  difficultyInput: document.querySelector("#question-difficulty"),
  statusInput: document.querySelector("#question-status"),
  formError: document.querySelector("#form-error"),
  search: document.querySelector("#question-search"),
  categoryFilter: document.querySelector("#filter-category"),
  statusFilter: document.querySelector("#filter-status"),
  difficultyFilter: document.querySelector("#filter-difficulty"),
  visibleCount: document.querySelector("#visible-count"),
  questionList: document.querySelector("#question-list"),
  storageMessage: document.querySelector("#storage-message")
};

let questions = starterQuestions.map((question) => ({ ...question }));
let machineStatus = "Pending";
let storageAvailable = true;

function showStorageMessage(message) {
  elements.storageMessage.textContent = message;
  elements.storageMessage.hidden = false;
}

function isValidQuestion(question) {
  return question
    && typeof question.id === "string"
    && typeof question.title === "string"
    && ["DSA", "Git", "Technical"].includes(question.category)
    && ["Easy", "Medium", "Hard"].includes(question.difficulty)
    && ["Pending", "In Progress", "Completed"].includes(question.status);
}

function loadSavedData() {
  let saved;

  try {
    saved = window.localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    storageAvailable = false;
    showStorageMessage("This browser blocked local storage, so changes will not remain after you close or refresh this page.");
    return;
  }

  if (saved === null) {
    saveData();
    return;
  }

  try {
    const data = JSON.parse(saved);
    if (
      !data
      || !Array.isArray(data.questions)
      || !data.questions.every(isValidQuestion)
      || !["Pending", "In Progress", "Completed"].includes(data.machineStatus)
    ) {
      throw new Error("Saved tracker data has an unexpected format.");
    }
    questions = data.questions;
    machineStatus = data.machineStatus;
  } catch (error) {
    showStorageMessage("Saved tracker data could not be read. Starter questions are shown; adding or changing them will replace the invalid saved data.");
  }
}

function saveData() {
  if (!storageAvailable) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ questions, machineStatus }));
  } catch (error) {
    storageAvailable = false;
    showStorageMessage("Your browser could not save changes to local storage. Your current changes will remain only until you close or refresh this page.");
  }
}

function createBadge(text, className) {
  const badge = document.createElement("span");
  badge.className = `badge ${className}`;
  badge.textContent = text;
  return badge;
}

function createEmptyState(isFiltered) {
  const state = document.createElement("div");
  state.className = "empty-state";

  const icon = document.createElement("span");
  icon.className = "empty-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = isFiltered ? "⌕" : "+";

  const heading = document.createElement("h3");
  heading.textContent = isFiltered ? "No matching questions" : "Your tracker is empty";

  const description = document.createElement("p");
  description.textContent = isFiltered
    ? "Try another search or change your filters to see your questions."
    : "Add a question above to start building your practice list.";

  state.append(icon, heading, description);
  return state;
}

function renderQuestion(question) {
  const item = document.createElement("article");
  item.className = "question-item";

  const top = document.createElement("div");
  top.className = "question-top";
  const title = document.createElement("h3");
  title.className = "question-title";
  title.textContent = question.title;
  top.append(title);

  const bottom = document.createElement("div");
  bottom.className = "question-bottom";
  const badges = document.createElement("div");
  badges.className = "badges";
  badges.append(
    createBadge(question.category, "badge-category"),
    createBadge(question.difficulty, `badge-${question.difficulty.toLowerCase()}`)
  );

  const controls = document.createElement("div");
  controls.className = "question-controls";
  const statusLabel = document.createElement("label");
  statusLabel.className = "visually-hidden";
  statusLabel.htmlFor = `status-${question.id}`;
  statusLabel.textContent = `Status for ${question.title}`;

  const statusSelect = document.createElement("select");
  statusSelect.id = `status-${question.id}`;
  statusSelect.className = "status-select";
  ["Pending", "In Progress", "Completed"].forEach((status) => {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    option.selected = status === question.status;
    statusSelect.append(option);
  });
  statusSelect.addEventListener("change", () => {
    questions = questions.map((itemQuestion) => itemQuestion.id === question.id
      ? { ...itemQuestion, status: statusSelect.value }
      : itemQuestion);
    saveData();
    render();
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.type = "button";
  deleteButton.textContent = "Remove";
  deleteButton.setAttribute("aria-label", `Remove ${question.title}`);
  deleteButton.addEventListener("click", () => {
    questions = questions.filter((itemQuestion) => itemQuestion.id !== question.id);
    saveData();
    render();
  });

  controls.append(statusLabel, statusSelect, deleteButton);
  bottom.append(badges, controls);
  item.append(top, bottom);
  return item;
}

function render() {
  const dsaQuestions = questions.filter((question) => question.category === "DSA");
  const interviewQuestions = questions.filter((question) => question.category !== "DSA");
  const completedQuestions = questions.filter((question) => question.status === "Completed").length;
  const completion = questions.length === 0 ? 0 : Math.round((completedQuestions / questions.length) * 100);

  elements.totalQuestions.textContent = String(questions.length);
  elements.completedDsa.innerHTML = `${dsaQuestions.filter((question) => question.status === "Completed").length}<span class="stat-total"> / ${dsaQuestions.length}</span>`;
  elements.completedInterview.innerHTML = `${interviewQuestions.filter((question) => question.status === "Completed").length}<span class="stat-total"> / ${interviewQuestions.length}</span>`;
  elements.machineStatus.value = machineStatus;
  elements.machineStatusLabel.textContent = machineStatus;
  elements.progressSummary.textContent = `${completedQuestions} of ${questions.length} questions completed`;
  elements.progressPercent.textContent = `${completion}%`;
  elements.progressTrack.setAttribute("aria-valuenow", String(completion));
  elements.progressFill.style.width = `${completion}%`;

  const searchText = elements.search.value.trim().toLowerCase();
  const category = elements.categoryFilter.value;
  const status = elements.statusFilter.value;
  const difficulty = elements.difficultyFilter.value;
  const filteredQuestions = questions.filter((question) => {
    return question.title.toLowerCase().includes(searchText)
      && (category === "All" || question.category === category)
      && (status === "All" || question.status === status)
      && (difficulty === "All" || question.difficulty === difficulty);
  });

  elements.visibleCount.textContent = String(filteredQuestions.length);
  elements.questionList.replaceChildren();
  if (filteredQuestions.length === 0) {
    const isFiltered = questions.length > 0
      && (searchText !== "" || category !== "All" || status !== "All" || difficulty !== "All");
    elements.questionList.append(createEmptyState(isFiltered));
    return;
  }

  filteredQuestions.forEach((question) => elements.questionList.append(renderQuestion(question)));
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = elements.titleInput.value.trim();
  if (!title) {
    elements.formError.textContent = "Enter a question or problem before adding it.";
    elements.titleInput.focus();
    return;
  }

  elements.formError.textContent = "";
  questions.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    category: elements.categoryInput.value,
    difficulty: elements.difficultyInput.value,
    status: elements.statusInput.value
  });
  elements.form.reset();
  saveData();
  render();
  elements.titleInput.focus();
});

elements.machineStatus.addEventListener("change", () => {
  machineStatus = elements.machineStatus.value;
  saveData();
  render();
});

[elements.search, elements.categoryFilter, elements.statusFilter, elements.difficultyFilter]
  .forEach((control) => control.addEventListener("input", render));

loadSavedData();
render();
