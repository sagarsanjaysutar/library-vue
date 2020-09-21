import axios from "axios";
axios.defaults.baseURL = "http://localhost:9090";

export default {
  getNewBooks({ commit }) {
    axios
      .get("/books/newBooks")
      .then((books) => {
        if (books) {
          let bookCount = books.data.length;
          console.log("Successfully got " + bookCount + " new books in store.");
          commit("setNewBook", books.data);
        } else {
          commit("setStatus", "Something went wrong.");
        }
      })
      .catch((err) => {
        commit("setStatus", "Opps, something went wrong.\n" + err);
      });
  },
  getSearchedBooks({ commit }, searchQuery) {
    axios
      .get("/books/searchedBooks", { params: { searchQuery: searchQuery } })
      .then((books) => {
        if (books) {
          let bookCount = books.data.length;
          console.log(
            "Successfully found " +
              bookCount +
              " books in store with " +
              searchQuery
          );
          commit("setSearchedBooks", books.data);
        } else {
          commit("setStatus", "Something went wrong.");
        }
      })
      .catch((err) => {
        commit("setStatus", "Opps, something went wrong.\n" + err);
      });
  },
  getIssuedBooks({ commit, state }) {
    axios
      .get("/books/issuedBooks", { params: { userInfo: state.userInfo.id } })
      .then((books) => {
        if (books) {
          let bookCount = books.data.length;
          console.log(
            "Successfully found " +
              bookCount +
              " books in store for " +
              state.userInfo.name
          );
          commit("setIssuedBooks", books);
        } else {
          commit("setStatus", "Something went wrong.");
        }
      })
      .catch((err) => {
        commit("setStatus", "Opps, something went wrong.\n" + err);
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
        commit("setStatus", err);
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
        commit("setStatus", response.data);
      })
      .catch((err) => {
        commit("setStatus", err);
      });
  },
};
