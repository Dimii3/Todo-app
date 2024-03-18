addTaskModal = document.querySelector(".add-task-modal");
showModalBtn = document.querySelector(".add-new-btn");
inputTask = document.querySelector(".task-form__input");
inputDate = document.querySelector(".task-form__date");
tasksList = document.querySelector(".tasks");
clearBtn = document.querySelector(".clear-btn");
addTaskBtn = document.querySelector(".task-form__btn");
errorText = document.querySelector(".error__text");
errorPopup = document.querySelector(".error");
amountOfTasks = document.querySelector(".tasks-counter__amount");

let taskID = 0;
const stateApp = {
  tasks: [],
};

showModalBtn.addEventListener("click", () => {
  addTaskModal.showModal();
});

const renderTasks = () => {
  tasksList.innerHTML = "";
  stateApp.tasks.forEach((task) => {
    const taskHTML = ` <div id=${task.id} class="task ${task.isDone && "done"}">
        <div class="task-controls">
          <p class="task__date">${task.taskDate}</p>
          <div class="task-buttons">
            <button class="task-buttons__btn done-task"
              ><i class="fa-solid fa-check"></i
            ></button>
            <button class="task-buttons__btn delete-task"
              ><i class="fa-solid fa-xmark"></i
            ></button>
          </div>
        </div>
        <p class="task__text">${task.title}</p>
      </div>`;
    tasksList.insertAdjacentHTML("afterbegin", taskHTML);
  });
  amountOfTasks.textContent = stateApp.tasks.length;
};

const handleError = (msg) => {
  errorPopup.classList.add("show");
  errorText.textContent = msg;
  setTimeout(() => {
    errorPopup.classList.remove("show");
  }, 3000);
};

const clearTasks = () => {
  if (stateApp.tasks.length === 0) {
    handleError("Make sure there are some tasks on your list");
    return;
  }
  clearBtn.disabled = false;
  stateApp.tasks.length = 0;
  localStorage.setItem("tasks", JSON.stringify(stateApp.tasks));
  renderTasks();
};

const createTask = (event) => {
  event.preventDefault();
  //   validation
  const taskDate = inputDate.value;
  const taskContent = inputTask.value;
  if (
    taskContent.includes("<script>") ||
    taskContent.trim().length === 0 ||
    !taskDate ||
    taskContent.trim().length > 150
  ) {
    handleError("invalid or forbidden data");
    return;
  }
  errorText.classList.remove("show");
  const task = {
    id: taskID,
    title: taskContent,
    taskDate: taskDate,
    isDone: false,
  };
  stateApp.tasks.push(task);
  renderTasks();
  inputTask.value = "";
  inputDate.value = "";
  taskID++;
  addTaskModal.close();
  localStorage.setItem("tasks", JSON.stringify(stateApp.tasks));
};

tasksList.addEventListener("click", (event) => {
  const clickedEl = event.target;
  if (
    !clickedEl.classList.contains("delete-task") &&
    !clickedEl.classList.contains("done-task")
  )
    return;
  // get current task
  const currentTask = clickedEl.closest(".task");
  // get the id of current task
  const currentTaskID = +currentTask.id;
  if (clickedEl.classList.contains("delete-task")) {
    const { tasks } = stateApp;
    stateApp.tasks = tasks.filter((task) => task.id !== currentTaskID);
    localStorage.setItem("tasks", JSON.stringify(stateApp.tasks));
    renderTasks();
  } else if (clickedEl.classList.contains("done-task")) {
    currentTask.classList.toggle("done");
    let taskDone = currentTask.classList.contains("done");
    stateApp.tasks.find((task) => {
      if (task.id === currentTaskID) {
        task.isDone = taskDone;
        localStorage.setItem("tasks", JSON.stringify(stateApp.tasks));
      }
    });
  }
});

clearBtn.addEventListener("click", clearTasks);
addTaskBtn.addEventListener("click", createTask);

window.addEventListener("DOMContentLoaded", () => {
  const savedTasks = localStorage.getItem("tasks");
  stateApp.tasks = JSON.parse(savedTasks);
  renderTasks();
});
