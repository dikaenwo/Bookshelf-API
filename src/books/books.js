const { nanoid } = require('nanoid');

let books = [];

const addBook = (data) => {
  const id = nanoid(16);
  const newBook = {
    id,
    ...data,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  books.push(newBook);
  return newBook;
};

const getAllBooks = () => books;

const getBookById = (id) => {
  return books.find(book => book.id === id);
};

const updateBook = (id, data) => {
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
  }
  return books[index];
};

const deleteBook = (id) => {
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
  }
  return index !== -1;
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};