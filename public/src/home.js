const { result } = require("../../test/fixtures/books.fixture");

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const borrowedBooks = []
  books.forEach(book => {if(!book.borrows[0].returned){
    borrowedBooks.push(book)
   }
  });
  return borrowedBooks.length;
}

function getMostCommonGenres(books) {
  const bookGenres = books.map(book => book.genre);
  const result = [];
  bookGenres.map((genre) => {
    const genreLocation = result.findIndex(element => element.name === genre);
    if (genreLocation >= 0){
      result[genreLocation].count = result[genreLocation].count + 1;
    } else {
      result.push({ name: genre, count: 1 });
    }
  })
  result.sort((alpha, beta) => beta.count - alpha.count);
  if(result.length > 5){
    return result.slice(0, 5);
  }
  return result
}

function getMostPopularBooks(books) {
  const borrows = books.map(book => ({name: book.title, count: book.borrows.length}));
  borrows.sort((alpha, beta ) => beta.count - alpha.count);
  return borrows.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  return authors.map(author => {
    author.count = books.filter(book => book.authorId === author.id)
    .reduce((book, author) => book + (author.borrows && author.borrows.length || 0), 0);
    author.name = `${author.name.first} ${author.name.last}`;
    delete author.id;
    return author
  })
  .sort((alpha, beta) => beta.count - alpha.count).slice(0, 5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
