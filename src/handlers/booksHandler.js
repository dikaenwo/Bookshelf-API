const { 
    addBook, 
    getAllBooks, 
    getBookById, 
    updateBook, 
    deleteBook 
  } = require('../books/books');
  
  const postBookHandler = (request, h) => {
    const { 
      name, year, author, summary, 
      publisher, pageCount, readPage, reading 
    } = request.payload;
  
    if (!name) {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku'
      }).code(400);
    }
  
    
    if (readPage > pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      }).code(400);
    }
  
    const newBook = addBook({
      name, 
      year, 
      author, 
      summary, 
      publisher, 
      pageCount, 
      readPage, 
      reading,
      finished: pageCount === readPage
    });
  
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId: newBook.id }
    }).code(201);
  };
  
  const getBooksHandler = (request, h) => {
    const books = getAllBooks();
    return {
      status: 'success',
      data: {
        books: books.map(book => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    };
  };
  
  const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = getBookById(bookId);
  
    if (!book) {
      return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
      }).code(404);
    }
  
    return {
      status: 'success',
      data: { book }
    };
  };
  
  const putBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const { 
      name, year, author, summary, 
      publisher, pageCount, readPage, reading 
    } = request.payload;

    if (!name) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      }).code(400);
    }

    if (readPage > pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      }).code(400);
    }
  
    const updatedBook = updateBook(bookId, {
      name, 
      year, 
      author, 
      summary, 
      publisher, 
      pageCount, 
      readPage, 
      reading,
      finished: pageCount === readPage
    });
  
    if (!updatedBook) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
      }).code(404);
    }
  
    return {
      status: 'success',
      message: 'Buku berhasil diperbarui'
    };
  };
  
  const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const isDeleted = deleteBook(bookId);
  
    if (!isDeleted) {
      return h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
      }).code(404);
    }
  
    return {
      status: 'success',
      message: 'Buku berhasil dihapus'
    };
  };
  
  module.exports = {
    postBookHandler,
    getBooksHandler,
    getBookByIdHandler,
    putBookByIdHandler,
    deleteBookByIdHandler
  };