<template>
  <v-app>
    <searchBook />
    <newBooksContainer />
    <loginContainer />
  </v-app>
</template>

<script>
// @ is an alias to /src

import searchBook from "../components/home/searchBook";
import newBooksContainer from "../components/book/newBooksContainer";
import loginContainer from "../components/home/loginContainer";

export default {
  name: "Home",
  data: () => {
    return {
      isLoginContainerOpen: false
    };
  },
  components: {
    searchBook,
    newBooksContainer,
    loginContainer
  }
};
</script>
