<template>
  <v-container class="primaryLight fill-height justify-center" fluid>
    <v-card class="primaryLight" width="90%" elevation="0">
      <v-card-title> Searched books </v-card-title>
      <v-card-subtitle>
        {{ books.length }} books found with the term
        <v-chip style="min-width: 3rem" class="ml-3 mr-3">
          {{ searchedTerm }} </v-chip
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
    let searchTerm = this.$route.query.search;
    if (searchTerm)
      this.$store.dispatch("getBooks", {
        searchedTerm: searchTerm,
        getNewBooks: false,
      });
  },

  created() {
    this.searchedTerm = this.$route.query.search;
  },

  computed: {
    books() {
      return this.$store.state.searchedBooks;
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
