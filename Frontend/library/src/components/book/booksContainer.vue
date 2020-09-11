<template>
  <v-container fluid class="newBooks-container fill-height">
    <v-row class="new-book-row">
      <v-col lg="3" v-for="book in books" :key="book.id" cols="6" class="pa-4">
        <bookCard :bookDetails="book" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import bookCard from "./bookCard";
export default {
  name: "booksContainer",
  props: {
    books: Array,
  },

  components: {
    bookCard,
  },
};
</script>

<style>
.new-book-row {
  width: 100%;
  place-content: center;
}

.newBooks-container {
  background-color: transparent;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
