<template>
  <v-container class="fill-height justify-center" fluid>
    <v-card class="primary" width="90%" elevation="0">
      <v-card-title> Searched books </v-card-title>
      <v-card-subtitle>
        {{ books.length }} books found with the term
        <v-chip style="min-width: 3rem" class="ml-3 mr-3">
          {{ $route.query.search }} </v-chip
        >in it.</v-card-subtitle
      >
      <v-divider></v-divider>
      <bookContainer :books="books"></bookContainer>
    </v-card>
  </v-container>
</template>

<script>
import bookContainer from "./booksContainer";
export default {
  name: "searchedResults",
  data: () => {
    return {
      searchedTerm: "",
    };
  },

  components: {
    bookContainer,
  },
  beforeCreate() {
    const searchedTerm = this.$route.query.search;
    this.$store.dispatch("getSearchedBooks", searchedTerm);
  },

  computed: {
    books() {
      return this.$store.state.books.searchedBooks;
    },
  },
};
</script>

<style>
@media only screen and (max-width: 480px) {
  .search-box {
    width: 100%;
  }
}
</style>
