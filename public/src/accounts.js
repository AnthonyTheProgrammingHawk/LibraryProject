function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => 
  accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1 );
}

function getTotalNumberOfBorrows(account, books) {
  const { id } = account;
  return books.reduce((acc, book) => {
    return (acc + book.borrows.filter(borrow => borrow.id === id)
    .reduce((accBorrows) => accBorrows + 1, 0)
    )
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowed = [];
  books.forEach(book => {
    if (book.borrows.find(item => item.id === account.id && !item.returned)) {
      borrowed.push(book)
    }
  })
  borrowed.forEach(book =>{
    let author = authors.find(person => person.id === book.authorId)
    book['author'] = author;
  })
  return borrowed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
