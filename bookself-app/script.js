const deleteDialog = document.getElementById("delete-dialog");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
const cancelDeleteBtn = document.getElementById("cancel-delete-btn");
const searchInput = document.getElementById("keyword");

document.addEventListener("DOMContentLoaded", function () {
  const BOOKSHELF_KEY = "bookshelf";

  searchInput.addEventListener("input", function () {
    const keyword = searchInput.value.toLowerCase();
    const books = getFromLocalStorage();

    const filteredBooks = books.filter((book) => {
      const title = book.title.toLowerCase();
      return title.includes(keyword);
    });

    renderFilteredBooks(filteredBooks);
  });

  function renderFilteredBooks(books) {
    const bookShelfDone = document.querySelector(".book-done .list-book");
    const bookShelfNotDone = document.querySelector(
      ".not-done-read .list-book"
    );
    bookShelfDone.innerHTML = "";
    bookShelfNotDone.innerHTML = "";

    books.forEach(function (book) {
      renderBook(book, book.isComplete);
    });
  }

  function saveToLocalStorage(books) {
    localStorage.setItem(BOOKSHELF_KEY, JSON.stringify(books));
  }

  function getFromLocalStorage() {
    const booksString = localStorage.getItem(BOOKSHELF_KEY);
    return JSON.parse(booksString) || [];
  }

  function generateBookID() {
    return +new Date();
  }

  function addBookToShelf(title, author, year, isComplete) {
    const book = {
      id: generateBookID(),
      title: title,
      author: author,
      year: year,
      isComplete: isComplete,
    };
    const books = getFromLocalStorage();
    books.push(book);
    saveToLocalStorage(books);
    return book;
  }

  function updateBookStatus(id, isComplete) {
    const books = getFromLocalStorage();
    const index = books.findIndex((book) => book.id == id);
    if (index !== -1) {
      books[index].isComplete = isComplete;
      saveToLocalStorage(books);
    }
  }

  function showDeleteDialog(bookId) {
    deleteDialog.showModal();

    confirmDeleteBtn.addEventListener("click", function () {
      const books = getFromLocalStorage();
      const updatedBooks = books.filter((book) => book.id !== bookId);
      saveToLocalStorage(updatedBooks);
      deleteDialog.close();

      const bookElement = document.querySelector(`[data-book-id="${bookId}"]`);
      if (bookElement) {
        bookElement.remove();
      }

      const bookShelfDone = document.querySelector(".book-done .list-book");
      const bookShelfNotDone = document.querySelector(
        ".not-done-read .list-book"
      );
      bookShelfDone.innerHTML = "";
      bookShelfNotDone.innerHTML = "";
      updatedBooks.forEach(function (book) {
        renderBook(book, book.isComplete);
      });
    });

    cancelDeleteBtn.addEventListener("click", function () {
      deleteDialog.close();
    });
  }

  function renderBook(book, isComplete) {
    const bookShelf = document.querySelector(
      isComplete ? ".book-done .list-book" : ".not-done-read .list-book"
    );
    const bookItem = document.createElement("div");
    const bookTitle = book.title.toUpperCase();
    bookItem.className = "book-item";
    bookItem.setAttribute("data-book-id", book.id);
    bookItem.innerHTML = `
            <h3>Judul: ${bookTitle}</h3>
            <p>Author: ${book.author}, Tahun: ${book.year}</p>
            <button class="btn-delete">Hapus</button>
            <button class="btn-move">${
              isComplete ? "Belum Dibaca" : "Sudah Dibaca"
            }</button>
        `;
    const deleteButton = bookItem.querySelector(".btn-delete");
    deleteButton.addEventListener("click", function () {
      showDeleteDialog(book.id);
    });

    const moveButton = bookItem.querySelector(".btn-move");
    moveButton.addEventListener("click", function () {
      const newStatus = !isComplete;
      updateBookStatus(book.id, newStatus);
      bookItem.remove();
      renderBook(book, newStatus);
    });

    bookShelf.appendChild(bookItem);
  }

  const addBookForm = document.getElementById("add-book-form");
  addBookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const isComplete = document.getElementById("isComplete").checked;
    const newBook = addBookToShelf(title, author, year, isComplete);
    renderBook(newBook, isComplete);
    addBookForm.reset();
  });

  const books = getFromLocalStorage();
  if (books.length > 0) {
    books.forEach((book) => {
      renderBook(book, book.isComplete);
    });
  }
});
