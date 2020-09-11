import vue from "vue";
import vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

vue.use(vuex);
axios.defaults.baseURL = "http://localhost:9090";

export const store = new vuex.Store({
  plugins: [createPersistedState()],
  state: {
    books: [],
    searchedBooks: [],
    newBooks: [],
    status: {},
    userInfo: {},
    studentBooks: [],
  },
  mutations: {
    setStatus(state, status) {
      state.status = {
        value: status,
      };
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setSearchedBook(state, searchedBooks) {
      state.searchedBooks = searchedBooks;
    },
    setNewBook(state, newBooks) {
      state.newBooks = newBooks;
    },
    setStudentBooks(state, books) {
      state.studentBooks = books;
    },
  },
  actions: {
    getBooks({ commit, state }, data) {
      if (data.getNewBooks) {
        axios
          .get("/books", { params: { getNewBooks: true } })
          .then((books) => {
            let bookCount = books.data.length;
            console.log(
              "Successfully got " + bookCount + " new books in store."
            );
            commit("setNewBook", books.data);
          })
          .catch((err) => {
            console.log("Error in fetching new books in store. \n-" + err);
          });
      } else if (data.searchedTerm != "" || !data.searchedTerm != undefined) {
        axios
          .get("/books", { params: { searchedTerm: data.searchedTerm } })
          .then((resp) => {
            let bookCount = resp.data.length;
            console.log(
              "Successfully found " +
                bookCount +
                " books with search keyword : " +
                data.searchedTerm +
                "in store."
            );
            commit("setSearchedBook", resp.data);
          })
          .catch((err) => {
            console.log("Error in fetching searched books. \n-" + err);
          });
      } else if (data.getStudentBooks) {
        axios
          .get("/books", { params: { userInfo: state.userInfo.id } })
          .then((books) => {
            commit("setStudentBooks", books);
          })
          .catch((err) => {
            commit("setStatus", err);
          });
      } else {
        console.log("Not proper parameter to getbooks.");
        commit("setStatus", "Opps, something went wrong.");
      }
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
      console.log(userInfo);
      const body = userInfo;
      axios
        .post("/register", body)
        .then((response) => {
          if (response.status === 200) {
            commit("setStatus", response.data.status);
          } else {
            commit("setStatus", response.data.status);
          }
        })
        .catch((err) => {
          console.log(err);
          commit("setStatus", err);
        });
    },
    logout({ commit }) {
      commit("setUserInfo", {});
      return true;
    },
  },
});
