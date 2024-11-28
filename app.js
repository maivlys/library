const addBtn = document.getElementById("add-book-btn");
const dialog = document.getElementById("dialog-form");
const deleteBook = document.querySelector(".bin-btn");

addBtn.addEventListener("click", () => {
  dialog.showModal();
});
