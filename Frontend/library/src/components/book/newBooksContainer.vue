<template>
  <v-container fluid class="darkest-background newBooks-container">
    <v-row>
      <v-col cols="12" class="flex-center">
        <v-icon
          class="lighter-text text-center font-weight-regular"
          size="2.5rem"
        >mdi-book-open-variant</v-icon>
        <h1 class="lighter-text text-center font-weight-light mb-2">New books in library.</h1>
        <p class="lighter-text text-center">
          Material is a design system – backed by open-source code –
          <br />that helps teams build high-quality digital experiences.
        </p>
      </v-col>
    </v-row>
    <v-row class="new-book-row">
      <v-col cols="3" v-for="i in 10" :key="i.id">
        <bookCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import bookCard from "./bookCard";
export default {
  name: "newBooksContainer",
  components: {
    bookCard
  }
};
</script>

<style>
.new-book-row {
  align-self: center;
  width: 90% !important;
}
.y {
  flex-grow: 1;
}
.newBooks-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>