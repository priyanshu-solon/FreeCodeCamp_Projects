// Get references to HTML elements
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// Retrieve tasks from localStorage or initialize an empty array
const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

// Function to add or update a task
const addOrUpdateTask = () => {
  // Find the index of the current task in the taskData array
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  // Create a task object with input values
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

  // If the task is new, add it to the beginning of the array
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    // If the task exists, update it
    taskData[dataArrIndex] = taskObj;
  }

  // Save the updated taskData array to localStorage
  localStorage.setItem("data", JSON.stringify(taskData));
  // Update the task container to reflect changes
  updateTaskContainer();
  // Reset the form
  reset();
};

// Function to update the task container with tasks
const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";

  // Loop through each task and create HTML elements for it
  taskData.forEach(
    ({ id, title, date, description }) => {
        (tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
        </div>
      `)
    }
  );
};

// Function to delete a task
const deleteTask = (buttonEl) => {
  // Find the index of the task to be deleted
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  // Remove the task element from the DOM
  buttonEl.parentElement.remove();
  // Remove the task from the taskData array
  taskData.splice(dataArrIndex, 1);
  // Save the updated taskData array to localStorage
  localStorage.setItem("data", JSON.stringify(taskData));
}

// Function to edit a task
const editTask = (buttonEl) => {
  // Find the index of the task to be edited
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  // Set the currentTask to the task being edited
  currentTask = taskData[dataArrIndex];

  // Populate the form with the task's details
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  // Change the button text to "Update Task"
  addOrUpdateTaskBtn.innerText = "Update Task";

  // Show the task form
  taskForm.classList.toggle("hidden");  
}

// Function to reset the form
const reset = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
}

// If there are tasks in localStorage, update the task container
if (taskData.length) {
  updateTaskContainer();
}

// Event listener to show the task form when the "Add New Task" button is clicked
openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

// Event listener to handle closing the task form
closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
  const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;

  // If the form has unsaved changes, show the confirmation dialog
  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

// Event listener to close the confirmation dialog without discarding changes
cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

// Event listener to discard changes and reset the form
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});

// Event listener to handle form submission
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addOrUpdateTask();
});

