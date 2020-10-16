export default {
  setStatus(state, status) {
    state.status = { value: status, show: true };
    console.log(state.status);
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  setSearchedBooks(state, searchedBooks) {
    state.books.searchedBooks = searchedBooks;
  },
  setNewBook(state, newBooks) {
    state.books.newBooks = newBooks;
  },
  setIssuedBooks(state, books) {
    state.books.issuedBooks = books;
  },
  deleteUsers(state, b_id) {
    for (let i = 0; i < state.books.searchedBooks.length; i++) {
      if (state.books.searchedBooks[i].b_id === b_id) {
        state.books.searchedBooks.splice(i, 1);
        break;
      }
    }
  }
};
