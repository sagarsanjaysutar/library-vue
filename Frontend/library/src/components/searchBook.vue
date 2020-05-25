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
          <div class="d-flex justify-center" style="width:50%;">
            <input type="text" class="search-input-box" placeholder="Search for wonderful books." />

            <v-btn large class="darkest-background">
              <span class="lighter-text font-weight-regular text-capitalize">Search books</span>
              <v-icon right class="lighter-text font-weight-regular">mdi-magnify</v-icon>
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
.search-input-box {
  width: 50%;
  opacity: 0.5;
  border: 2px solid #e0e1dd;
  color: white;
  border-radius: 5px;
  margin-right: 10px;
  padding: 10px;
}
</style>