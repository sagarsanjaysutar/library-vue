<template>
  <span>
    <v-container fluid class="darker-background searchBook-container">
      <v-row>
        <v-col cols="12" class="flex-center">
          <v-icon
            class="lighter-text text-center font-weight-regular"
            size="2.5rem"
          >mdi-book-open-variant</v-icon>
          <h1 class="lighter-text text-center font-weight-light mb-2">Search for books.</h1>
          <p class="lighter-text text-center">
            Material is a design system – backed by open-source code –
            <br />that helps teams build high-quality digital experiences.
          </p>
          <div class="d-flex justify-center align-center" style="width:50%;">
            <v-form @submit.prevent="fetchBooks()" class="d-flex" style="width:65%;">
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
                    <v-icon class="lighter-text font-weight-regular">mdi-magnify</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <newBooksContainer />
  </span>
</template>

<script>
// @ is an alias to /src

import newBooksContainer from "./book/newBooksContainer";

export default {
  name: "Home",
  data: () => {
    return {
      searchedTerm: "",
      isLoginContainerOpen: false
    };
  },
  methods: {
    fetchBooks() {
      this.$route.
      this.$store.dispatch("fetchBooks", {
        searchedTerm: this.searchedTerm,
        getNewBooks: false
      });
    }
  },
  components: {
    newBooksContainer
  }
};
</script>
<style scoped>
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
</style>
