// let storedBooks;
let bookTitle;
let bookAuthor;
let numOfPages;
let option;
let statuss;
let cnt;
let msg;
let book;
let myBooks;
const initialMsg = document.getElementById("initial-msg");

window.onload = function () {
  if (localStorage.getItem("mybooks") !== null) {
    myBooks = JSON.parse(localStorage.getItem("mybooks"));
    cnt = myBooks.length;
    myBooks.forEach((el) => {
      createUI(el);
    });
  } else {
    initialMsg.textContent = "😭 No books here... yet! 😍 ";
    myBooks = [];
    cnt = 0;
  }
};

// --- Array of Books & Constructor ---

function Book(title, author, pages, status, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.id = id;
}

// --- Open Dialog ---
const addBtn = document.getElementById("add-book-btn");
const dialog = document.getElementById("dialog-form");

addBtn.addEventListener("click", () => {
  dialog.showModal();
});

// --- Form processing ---
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const pgsInput = document.getElementById("pgs-input");

let booksContainer = document.getElementById("books-container");

// --- Submit Form ---
const form = document.getElementById("user-input");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  createObject();
  createUI(book);
  form.reset();
  dialog.close();
});

// --- Local Storage ---
function loadFromLocalStorage() {}

function saveToLocalStorage() {
  localStorage.setItem("mybooks", JSON.stringify(myBooks));
}

// --- Functions ---
function createUI(object) {
  let section = document.createElement("section");
  section.classList.add("book-item");

  section.innerHTML = `<div class="one-line-position">
            <h2>${object.title}</h2>
            <button class="bin-btn" id="${object.id}">
              <svg
                id="${object.id}"
                width="25"
                height="25"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="${object.id}"
                  d="M20.979 4.5H15.75V2.25A.75.75 0 0 0 15 1.5H9a.75.75 0 0 0-.75.75V4.5H3.021L3 6.375h1.547l.942 14.719A1.5 1.5 0 0 0 6.984 22.5h10.032a1.5 1.5 0 0 0 1.496-1.404l.941-14.721H21L20.979 4.5ZM8.25 19.5l-.422-12h1.547l.422 12H8.25Zm4.5 0h-1.5v-12h1.5v12Zm1.125-15h-3.75V3.187A.188.188 0 0 1 10.313 3h3.374a.188.188 0 0 1 .188.188V4.5Zm1.875 15h-1.547l.422-12h1.547l-.422 12Z"
                ></path>
              </svg>
            </button>
          </div>

          <p class="author">Author: ${object.author}</p>
          <p class="pages-p">Pages: <span class="pages">${
            object.pages
          }</span></p>
          <div class="one-line-position status-line">
            <span></span>
            <p class="status ${object.status}" id="${object.id}">${createMsg(
    object.status
  )}</p>
          </div>`;

  booksContainer.prepend(section);
  initialMsg.textContent = "";
  changeStatusOption();
  deleteSectionOption();
}

function createObject() {
  bookTitle = titleInput.value.trim(); //getting from user input
  bookTitle = styleTitle(bookTitle); //unify styling

  bookAuthor = authorInput.value.trim();
  bookAuthor = styleAuthorsName(bookAuthor);

  numOfPages = pgsInput.value.trim();

  option = document.querySelector('input[name="reading-status"]:checked');
  statuss = option.value;

  book = new Book(bookTitle, bookAuthor, numOfPages, statuss, cnt);
  myBooks.push(book);

  cnt++;
  saveToLocalStorage();
}

function createMsg(status) {
  if (status.includes("-")) {
    status = status.replace("-", " ");
  }
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function changeStatusOption() {
  let btn = document.querySelector(".status");

  btn.addEventListener("click", (e) => {
    const clickedId = parseInt(e.target.id);

    if (btn.textContent === "Not read") {
      btn.textContent = "Reading";
      btn.classList.remove("not-read");
      btn.classList.add("reading");
      myBooks[clickedId].status = "reading";
    } else if (btn.textContent === "Reading") {
      btn.textContent = "Read";
      btn.classList.remove("reading");
      btn.classList.add("read");
      myBooks[clickedId].status = "read";
    } else if (btn.textContent === "Read") {
      btn.textContent = "Not read";
      btn.classList.remove("read");
      btn.classList.add("not-read");
      myBooks[clickedId].status = "not-read";
    }

    saveToLocalStorage();
  });
}

function deleteSectionOption() {
  let btn = document.querySelector(".bin-btn");

  btn.addEventListener("click", (e) => {
    const clickedId = parseInt(e.target.id);

    myBooks.splice(clickedId, 1);

    let sections = document.querySelectorAll(".book-item");
    sections.forEach((el) => el.remove());
    for (let i = 0; i < myBooks.length; i++) {
      myBooks[i].id = i;
    }

    myBooks.forEach((el) => {
      createUI(el);
    });
    cnt = myBooks.length;
    saveToLocalStorage();
  });
}

function styleTitle(title) {
  title = title.replace("-", " ");
  return title.charAt(0).toUpperCase() + title.slice(1);
}

function styleAuthorsName(name) {
  if (name.includes(".")) {
    name = name.replace(" ", "");
    name = name.split(".");
    for (let i = 0; i < name.length; i++) {
      name[i] = name[i][0].toUpperCase() + name[i].substr(1) + ".";
    }
    name = name.join(" ");
    return name.slice(0, -1);
  } else {
    name = name.split(" ");
    for (let i = 0; i < name.length; i++) {
      name[i] = name[i][0].toUpperCase() + name[i].substr(1);
    }
    return name.join(" ");
  }
}
