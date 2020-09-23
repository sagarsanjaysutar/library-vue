<template>
  <v-container fluid class="newBooks-container fill-height">
    <v-row class="new-book-row">
      <v-col lg="3" v-for="book in books" :key="book.id" cols="6" class="pa-4">
        <span>
          <v-dialog v-model="isBookDetailsOpen" width="30rem">
            <v-card class="darkest-background" dark>
              <v-img
                class="white--text align-end"
                height="200px"
                src="../assets/img/b.png"
              >
                <v-card-title class="pl-5">{{ book.name }}</v-card-title>
              </v-img>

              <v-card-subtitle class="lighter-text pb-0 pl-5 pt-2"
                >{{ book.genere }} •
                {{ book.author }}
              </v-card-subtitle>

              <v-card-text class="lighter-text pl-5">
                <div>
                  {{ book.issuedQuantity }} out of {{ book.quantity }} are
                  issued.
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn color="lighter-text" text> Reserve </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-card class="book-card">
            <v-img src="../assets/img/b.png" class="fill-height">
              <div class="card-shadow fill-height flex-end-row">
                <v-row align-content="end">
                  <v-col cols="8" class="flex-end-col" align-self="center">
                    <v-card-title class="lighter-text">{{
                      book.name
                    }}</v-card-title>
                    <v-card-subtitle class="lighter-text"
                      >{{ book.genere }} • {{ book.author }}</v-card-subtitle
                    >
                  </v-col>
                  <v-col
                    cols="4"
                    class="d-flex justify-end pr-5"
                    align-self="center"
                  >
                    <v-btn icon right @click="isBookDetailsOpen = true">
                      <v-icon class="lighter-text"
                        >mdi-information-outline</v-icon
                      >
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-img>
          </v-card>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "booksContainer",
  props: {
    books: Array,
  },
  data: () => {
    return {
      isBookDetailsOpen: false,
    };
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
.book-card {
  border-radius: 10px;
  max-width: 15rem;
  height: 22rem;
}
.book-cover-img {
  background-image: url("../assets/img/a.jpg");
  background-size: cover;
}
@media only screen and (max-width: 480px) {
  .book-card {
    height: 18rem;
  }
}
</style>
