<template>
  <v-form>
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
          <div class="d-flex" style="width:40%;">
            <v-text-field class="mr-5" placeholder="Search for wonderful books." solo></v-text-field>
            <v-btn large>
              <span class="darkest-text font-weight-regular text-capitalize">Search books</span>
              <v-icon right>mdi-magnify</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "searchBook"
};
</script>

<style>
.searchBook-container {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
}

.book-icon {
  font-size: 2.5rem;
}
</style>