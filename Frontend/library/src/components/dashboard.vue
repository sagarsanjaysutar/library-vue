<template>
  <v-container class="primaryLight fill-height justify-center" fluid>
    <v-card class="primary" width="90%">
      <v-card-title>
        <h2>Welcome, {{ userInfo.name }}</h2>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-title> Currently issued books. </v-card-title>
      <bookContainer :books="newBooks" />

      <v-divider></v-divider>
      <v-card-title> Previously issued books. </v-card-title>
      <bookContainer :books="newBooks" />
    </v-card>
  </v-container>
</template>

<script>
import bookContainer from "./book/booksContainer";
export default {
  name: "dashboard",
  components: {
    bookContainer,
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    newBooks() {
      return this.$store.state.newBooks;
    },
  },
};
</script>

<style>
</style>