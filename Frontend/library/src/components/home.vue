<template>
  <v-container fluid class="darker-background pa-5">
    <v-row style="height: 60vh">
      <v-col cols="12" class="flex-center">
        <v-icon class="lighter-text text-center font-weight-regular" size="5rem"
          >mdi-book-open-variant</v-icon
        >
        <h1 class="lighter-text text-center font-weight-light mb-2">
          Search for books.
        </h1>

        <v-form @submit.prevent="fetchBooks()" class="search-form">
          <v-text-field
            dark
            background-color="darkest-background"
            hide-details
            solo
            placeholder="Search for wonderful books."
            v-model="searchedTerm"
          >
            <template v-slot:append>
              <v-btn type="submit" icon class="darkest-background">
                <v-icon class="lighter-text font-weight-regular"
                  >mdi-magnify</v-icon
                >
              </v-btn>
            </template>
          </v-text-field>
        </v-form>

        <p class="lighter-text text-center mt-5">
          Material is a design system – backed by open-source code.
        </p>
      </v-col>
    </v-row>
    <v-row class="darkest-background pt-5">
      <v-col cols="12" class="flex-center">
        <v-icon
          class="lighter-text text-center font-weight-regular"
          size="2.5rem"
          >mdi-book-open-variant</v-icon
        >
        <h1 class="lighter-text text-center font-weight-light mb-2">
          New books in library.
        </h1>
        <p class="lighter-text text-center">
          Material is a design system – backed by open-source code –
          <br />that helps teams build high-quality digital experiences.
        </p>
      </v-col>
      <v-col cols="12" class="pa-0">
        <booksContainer :books="newBooks" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import booksContainer from "./book/booksContainer";

export default {
  name: "Home",
  data: () => {
    return {
      searchedTerm: "",
      isLoginContainerOpen: false,
    };
  },
  methods: {
    fetchBooks() {
      this.$router.push({
        name: `searchedResults`,
        query: { search: this.searchedTerm },
      });
    },
  },
  created() {
    this.$store.dispatch("fetchBooks", { searchedTerm: "", getNewBooks: true });
  },
  computed: {
    newBooks() {
      return this.$store.state.newBooks;
    },
  },
  components: {
    booksContainer,
  },
};
</script>
<style scoped>
.search-form {
  display: flex;
  width: 30%;
}
.searchBook-container {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
}

.book-icon {
  font-size: 2.5rem;
}
.search-input-box {
  opacity: 0.5;
  border: 2px solid #e0e1dd;
  color: white;
  border-radius: 5px;
  margin-right: 10px;
  padding: 10px;
}
@media screen and (max-width: 480px) {
  .search-form {
    width: 100%;
  }
}
</style>
