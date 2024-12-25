const {
    postBookHandler,
    getBooksHandler,
    getBookByIdHandler,
    putBookByIdHandler,
    deleteBookByIdHandler
  } = require('../handlers/booksHandler');
  
  const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: postBookHandler
    },
    {
      method: 'GET',
      path: '/books',
      handler: getBooksHandler
    },
    {
      method: 'GET',
      path: '/books/{bookId}',
      handler: getBookByIdHandler
    },
    {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: putBookByIdHandler
    },
    {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: deleteBookByIdHandler
    }
  ];
  
  module.exports = routes;