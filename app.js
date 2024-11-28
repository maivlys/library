const addBtn = document.getElementById("add-book-btn");
const dialog = document.getElementById("dialog-form");
const deleteBookBtn = document.querySelectorAll(".bin-btn");
const statusBtn = document.querySelectorAll(".status");

addBtn.addEventListener("click", () => {
  dialog.showModal();
});

deleteBookBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let section = btn.closest("section");
    section.remove();
  });
});

statusBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "Not read") {
      btn.textContent = "Reading";
      btn.classList.remove("not-read");
      btn.classList.add("reading");
    } else if (btn.textContent === "Reading") {
      btn.textContent = "Read";
      btn.classList.remove("reading");
      btn.classList.add("read");
    } else if (btn.textContent === "Read") {
      btn.textContent = "Not read";
      btn.classList.remove("read");
      btn.classList.add("not-read");
    }
  });
});
