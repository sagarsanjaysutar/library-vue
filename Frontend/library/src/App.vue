<template>
  <v-app>
    <nav>
      <v-toolbar app flat class="darkest-background">
        <v-toolbar-title class="lighter-text">Library</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tabs right style="width:10%" slider-size="3">
          <v-tab class="lighter-text font-weight-regular text-capitalize">Home</v-tab>
          <v-tab class="lighter-text font-weight-regular text-capitalize">About</v-tab>
          <v-tab class="lighter-text font-weight-regular text-capitalize">Contact</v-tab>
        </v-tabs>
        <v-btn class="dark-background ml-5">
          <span class="lighter-text font-weight-regular text-capitalize">Sign in</span>
          <v-icon right class="lighter-text">mdi-account</v-icon>
        </v-btn>
      </v-toolbar>
    </nav>
    <searchBook />
    <newBooksContainer />
  </v-app>
</template>

<script>
import searchBook from "./components/searchBook";
import newBooksContainer from "./components/book/newBooksContainer";
export default {
  name: "App",

  components: {
    searchBook,
    newBooksContainer
  },

  data: () => ({
    //
  })
};
</script>
<style>
@import url("../src/assets/style/style.css");
</style>
