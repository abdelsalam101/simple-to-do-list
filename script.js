// Get all the elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

// Add event listener for adding task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim(); // Take whatever is written in the text field
  if (taskText) {
    addTask(taskText, false); // New tasks start uncompleted
    saveTask(taskText, false); // Save with completion status
    taskInput.value = ""; // Clear the text field
  }
});

function addTask(taskText, isCompleted = false) {
  const list = document.createElement("li"); // Create a list item
  list.textContent = taskText; // Add the text to the list item

  const deleteBtn = document.createElement("button"); // Add the delete button
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete-btn"); // Add a class for styling
  list.appendChild(deleteBtn); // Add the delete button to the list item

  if (isCompleted) {
    list.classList.add("completed"); // Set initial completion status
  }

  // Toggle completion on click
  list.addEventListener("click", () => {
    list.classList.toggle("completed"); // Toggle the class
    updateTaskStatus(taskText, list.classList.contains("completed")); // Update status in localStorage
  });

  taskList.appendChild(list); // Add the list item to the task list

  // Delete the task
  deleteBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent triggering the complete task event
    list.remove(); // Remove the task item from the DOM
    deleteTask(taskText); // Remove from localStorage
  });
}

function saveTask(taskText, isCompleted) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push({ text: taskText, completed: isCompleted }); // Save as an object
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  taskList.innerHTML = ""; // Clear the current list
  tasks.forEach(task => addTask(task.text, task.completed)); // Load with text and status
}

function deleteTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks = tasks.filter(task => task.text !== taskText); // Filter by text property
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(taskText, isCompleted) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks = tasks.map(task =>
    task.text === taskText ? { ...task, completed: isCompleted } : task
  ); // Update the matching task
  localStorage.setItem("tasks", JSON.stringify(tasks));
}