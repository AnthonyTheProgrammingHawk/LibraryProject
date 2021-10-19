function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function borrowedBooks(books){
  const borrowed = [];
  books.forEach(book => {if(!book.borrows[0].returned){
    borrowed.push(book);
  }
});
  return borrowed;
};

  const returnedBooks = (books) => {
    const returned = [];
    books.forEach(book => {if(book.borrows[0].returned){
      returned.push(book);
    }
  });
  return returned;
}
function partitionBooksByBorrowedStatus(books) {
  const returned = returnedBooks(books);
  const borrowed = borrowedBooks(books);
  const bookStatus = [];

  bookStatus.push(borrowed);
  bookStatus.push(returned);
  return bookStatus;
}

function getBorrowersForBook(book, accounts) {
  const result = [];
     let borrowArray = book.borrows;
     borrowArray.forEach(borrow=>{
       let account = accounts.find(acc => acc.id === borrow.id);
       account['returned'] =  borrow.returned;
       result.push(account);
})
return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
