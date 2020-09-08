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
  },
  actions: {
    fetchBooks({ commit }, { searchedTerm, getNewBooks }) {
      if (getNewBooks) {
        axios
          .get("/getBooks", { params: { getNewBooks: true } })
          .then((resp) => {
            let bookCount = resp.data.length;
            console.log(
              "Successfully got " + bookCount + " new books in store."
            );
            commit("setNewBook", resp.data);
          })
          .catch((err) => {
            console.log("Error in fetching new books in store. \n-" + err);
          });
      } else {
        axios
          .get("/getBooks", { params: { searchedTerm: searchedTerm } })
          .then((resp) => {
            let bookCount = resp.data.length;
            console.log(
              "Successfully found " +
                bookCount +
                " books with search keyword : " +
                searchedTerm +
                "in store."
            );
            commit("setSearchedBook", resp.data);
          })
          .catch((err) => {
            console.log("Error in fetching searched books. \n-" + err);
          });
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
