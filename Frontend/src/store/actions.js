import axios from "axios";
axios.defaults.baseURL = "http://localhost:9090";

export default {
  getNewBooks({ commit }) {
    axios
      .get("/books/newBooks")
      .then((books) => {
        if (books) {
          commit("setNewBook", books.data);
        } else {
          commit("setStatus", "Something went wrong.");
        }
      })
      .catch((err) => {
        commit("setStatus", "Opps, something went wrong.\n" + err);
      });
  },
  getAllBooks({ commit }) {
    axios
      .get("/books/searchedBooks", { params: { searchQuery: "" } })
      .then((books) => {
        if (books) {
          commit("setAllBooks", books.data);
        } else {
          commit("setStatus", "Something went wrong.");
        }
      })
      .catch((err) => {
        commit("setStatus", "Opps, something went wrong.\n" + err);
      });
  },
  getSearchedBooks({ commit }, searchQuery) {
    return axios
      .get("/books/searchedBooks", { params: { searchQuery: searchQuery } })
      .then((books) => {
        if (books) {
          commit("setSearchedBooks", books.data);
          return books.data;
        } else {
          commit("setStatus", "Something went wrong.");
        }
      })
      .catch((err) => {
        commit("setStatus", "Opps, something went wrong.\n" + err);
      });
  },
  getIssuedBooks({ commit, dispatch, state }) {
    axios
      .get("/books/issuedBooks", { params: { u_id: state.userInfo.u_id } })
      .then((books) => {
        if (books) {
          for (let i = 0; i < books.data.length; i++) {
            dispatch("getSearchedBooks", books.data[i].issuedBook).then((book) => {
              books.data[i].name = book[0].name;
              books.data[i].author = book[0].author;
              books.data[i].genere = book[0].genere;
            });
          }
          commit("setIssuedBooks", books.data);
        } else {
          commit("setStatus", "Something went wrong.");
        }
      })
      .catch((err) => {
        commit("setStatus", "Opps, something went wrong.\n" + err);
      });
  },
  returnBook({ commit }, returnInfo) {
    return axios
      .post("/return-book", returnInfo)
      .then((response) => {
        const isFined = response.data.penaltyInfo ? true : false;

        if (isFined) {
          if (returnInfo.penalityPaidStatus) {
            axios
              .post("/return-book", returnInfo)
              .then((response) => {
                commit("setStatus", response.data.status);
              })
              .catch((err) => {
                commit("setStatus", err.response.data.status);
              });
          } else {
            return response.data.penaltyInfo;
          }
        } else {
          commit("setStatus", response.data.status);
        }
      })
      .catch((err) => {
        commit("setStatus", err.response.data.status);
      });
  },
  issueBook({ commit }, issueInfo) {
    axios
      .post("/issue-book", issueInfo)
      .then((response) => {
        commit("setStatus", response.data.status);
      })
      .catch((err) => {
        commit("setStatus", err.response.data.status);
      });
  },
  reissueBook({ commit }, t_id) {
    axios
      .post("/reissue-book", { t_id })
      .then((response) => {
        commit("setStatus", response.data.status);
        commit("setIssuedBooks", response.data.dueDate);
      })
      .catch((err) => {
        commit("setStatus", err.response.data.status);
      });
  },
  deleteBook({ commit }, b_id) {
    axios
      .delete("/book", {
        params: { b_id },
      })
      .then((res) => {
        commit("setStatus", res.data.status);
        commit("deleteBook", b_id);
      })
      .catch((err) => {
        commit("setStatus", "Opps, something went wrong.\n" + err);
      });
  },
  addBook({ commit }, book) {
    book.coverPage =
      "http://books.google.com/books/content?id=Hd5-722GEgAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api";
    axios
      .post("/book", book)
      .then((res) => {
        if (res.status === 200) {
          commit("setStatus", res.data.status);
          book.b_id = res.data.b_id;
          commit("addBook", book);
        }
      })
      .catch((e) => {
        commit("setStatus", { value: e.response.data.status });
      });
  },
  editBook({ commit }, book) {
    axios
      .put("/book", book)
      .then(({ data, status }) => {
        if (status === 200) {
          commit("setStatus", data.status);
          commit("editBook", book);
        }
      })
      .catch((e) => {
        commit("setStatus", e.response.data.status);
      });
  },

  login({ commit }, data) {
    return axios
      .post("/login", data)
      .then((response) => {
        if (response.status === 200) {
          commit("setUserInfo", response.data);
          return response.status;
        } else {
          commit("setStatus", response.data);
          return response.status;
        }
      })
      .catch((err) => {
        commit("setStatus", err.response.data.status);
        return err.response.status;
      });
  },
  register({ commit }, userInfo) {
    axios
      .post("/register", userInfo)
      .then((response) => {
        commit("setStatus", response.data.status);
      })
      .catch((err) => {
        commit("setStatus", err);
      });
  },
  logout({ commit, state }) {
    axios
      .post("/logout", state.userInfo)
      .then((response) => {
        commit("setUserInfo", {});
        commit("setStatus", response.data.status);
      })
      .catch((err) => {
        commit("setStatus", err);
      });
  },
};
