addTaskModal = document.querySelector(".add-task-modal");
showModalBtn = document.querySelector(".add-new-btn");
inputTask = document.querySelector(".task-form__input");
tasksList = document.querySelector(".tasks");
clearBtn = document.querySelector(".clear-btn");
addTaskBtn = document.querySelector(".task-form__btn");
errorText = document.querySelector(".task-form__error");

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
          <p class="task__date">12/02/2024</p>
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
};

const clearTasks = () => {
  stateApp.tasks.length = 0;
  renderTasks();
};

const createTask = (event) => {
  event.preventDefault();
  //   validation
  const taskContent = inputTask.value;
  if (taskContent.includes("<script>") || taskContent.trim().length === 0) {
    errorText.classList.add("show");
    return;
  }
  errorText.classList.remove("show");
  const task = {
    id: taskID,
    title: taskContent,
    isDone: false,
  };
  stateApp.tasks.push(task);
  renderTasks();
  inputTask.value = "";
  taskID++;
  addTaskModal.close();
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
    renderTasks();
  } else if (clickedEl.classList.contains("done-task")) {
    currentTask.classList.toggle("done");
    let taskDone = currentTask.classList.contains("done");
    stateApp.tasks.find((task) => {
      if (task.id === currentTaskID) {
        task.isDone = taskDone;
      }
    });
  }
});

clearBtn.addEventListener("click", clearTasks);
addTaskBtn.addEventListener("click", createTask);
