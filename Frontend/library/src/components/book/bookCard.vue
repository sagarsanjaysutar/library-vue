<template>
  <v-card width="15rem" height="20rem" class="ma-5" style="border-radius:10px;">
    <v-img src="../../assets/img/b.png" class="fill-height">
      <div class="card-shadow fill-height flex-end-row">
        <v-row align-content="end">
          <v-col cols="8" class="flex-end-col" align-self="center">
            <v-card-title class="lighter-text">{{bookDetails.name}}</v-card-title>
            <v-card-subtitle class="lighter-text">{{bookDetails.genere}} . {{bookDetails.author}}</v-card-subtitle>
          </v-col>
          <v-col cols="4" class="d-flex justify-end pr-5" align-self="center">
            <v-btn icon right>
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
  name: "bookCard",
  props: ["bookDetails"],
  methods: {
    getImgURL(bookDetail) {
      console.log(bookDetail);
      return bookDetail;
    }
  }
};
</script>

<style scoped>
.book-cover-img {
  background-image: url("../../assets/img/a.jpg");
  background-size: cover;
}
</style>