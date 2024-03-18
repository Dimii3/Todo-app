addTaskModal = document.querySelector(".add-task-modal");
showModalBtn = document.querySelector(".add-new-btn");
tasksList = document.querySelector(".tasks");

showModalBtn.addEventListener("click", () => {
  addTaskModal.showModal();
});
