<template>
  <v-container fluid class="darker-background" style="min-height: 85vh">
    <v-row class>
      <v-toolbar class="darker-background" elevation="5" flat dark>
        <v-toolbar-title>Searched books</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <span class="search-box">
            <v-text-field
              dark
              background-color="darkest-background"
              hide-details
              solo
              placeholder="Search for wonderful books."
              v-model="searchedTerm"
              @keyup.enter="fetchBooks"
            >
              <template v-slot:append>
                <v-btn @click="fetchBooks" icon class="darkest-background">
                  <v-icon class="lighter-text font-weight-regular"
                    >mdi-magnify</v-icon
                  >
                </v-btn>
              </template>
            </v-text-field>
          </span>
        </v-toolbar-items>
      </v-toolbar>
    </v-row>
    <v-row>
      <v-col cols="12" class="pl-0 pr-0" v-if="books.length !== 0">
        <v-subheader dark style="font-size: 1em">
          {{ books.length }} books found with the term
          <v-chip style="min-width: 3rem" class="ml-3 mr-3">
            {{ searchedTerm }} </v-chip
          >in it.
        </v-subheader>

        <bookContainer :books="books"></bookContainer>
      </v-col>
    </v-row>
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
      this.$store.dispatch("fetchBooks", {
        searchedTerm: searchTerm,
        getNewBooks: false,
      });
  },
  mounted() {},
  created() {
    this.searchedTerm = this.$route.query.search;
  },
  methods: {
    fetchBooks() {
      this.$store.dispatch("fetchBooks", {
        searchedTerm: this.searchedTerm,
        getNewBooks: false,
      });
      this.$router.replace({
        name: `searchedResults`,
        query: { search: this.searchedTerm },
      });
    },
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
