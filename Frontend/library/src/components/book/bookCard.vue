<template>
  <v-card width="15rem" height="20rem" class="ma-5" style="border-radius:10px;">
    <v-img src="../../assets/img/a.jpg" class="fill-height">
      <div class="card-shadow fill-height flex-end-row">
        <v-row align-content="end">
          <v-col cols="8" class="flex-end-col" align-self="center">
            <v-card-title class="lighter-text">Book name</v-card-title>
            <v-card-subtitle class="lighter-text">Thriller . Crime</v-card-subtitle>
          </v-col>
          <v-col cols="4" class="d-flex justify-end pr-5" align-self="center">
            <v-btn flat icon right>
              <v-icon class="lighter-text">mdi-information-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "bookCard"
};
</script>

<style>
.book-cover-img {
  background-image: url("../../assets/img/a.jpg");
  background-size: cover;
}
</style>