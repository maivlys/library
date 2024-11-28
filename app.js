const addBtn = document.getElementById("add-book-btn");
const dialog = document.getElementById("dialog-form");
const deleteBookBtn = document.querySelectorAll(".bin-btn");

addBtn.addEventListener("click", () => {
  dialog.showModal();
});

deleteBookBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let section = btn.closest("section");
    section.remove();
  });
});
