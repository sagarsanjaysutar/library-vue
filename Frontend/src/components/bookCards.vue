<template>
  <span>
    <v-dialog v-model="isBookDetailsOpen" width="31rem">
      <v-card light>
        <div class="d-flex flex-no-wrap justify-space-between">
          <v-img style="width:40%" :src="selectedBook.coverPage"> </v-img>
          <span style="width:60%">
            <v-card-title>{{ selectedBook.name }}</v-card-title>
            <v-card-subtitle>{{ selectedBook.author }} • {{ selectedBook.genere }}</v-card-subtitle>
            <v-list color="light">
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>ID</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-text> {{ selectedBook.b_id }}</v-list-item-text>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content class="d-flex">
                    <v-list-item-title>Location</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-text> {{ selectedBook.location }}</v-list-item-text>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Issued</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-text>
                    {{ selectedBook.issuedQuantity }} out of
                    {{ selectedBook.totalQuantity }}</v-list-item-text
                  >
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-card-actions class="d-flex justify-end ">
              <v-btn class="light" @click="isBookDetailsOpen = false">Close</v-btn>
            </v-card-actions>
          </span>
        </div>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col lg="2" xs="12" sm="12" md="3" cols="12" v-for="book in books" :key="book.id">
        <v-card class="book-card elevation-1 light" light @click="showBookDetails(book.b_id)">
          <v-img :src="book.coverPage" height="100%"> </v-img>
        </v-card>
        <v-card-title
          @click="showBookDetails(book.b_id)"
          class="primary--text d-inline-block text-truncate pl-0 pb-1"
          style="max-width: 12rem;"
          >{{ book.name }}</v-card-title
        >
        <v-card-subtitle
          @click="showBookDetails(book.b_id)"
          class="primary--text d-inline-block text-truncate pl-0 pb-1"
          style="max-width: 12rem;"
          >{{ book.author }} • {{ book.genere }}
        </v-card-subtitle>
      </v-col>
    </v-row>
  </span>
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
      selectedBook: {},
    };
  },
  methods: {
    showBookDetails(b_id) {
      this.isBookDetailsOpen = true;
      this.selectedBook = this.books.filter((book) => {
        return book.b_id.match(b_id);
      })[0];
    },
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
  max-width: 12rem;
  height: 16rem;
}

@media only screen and (max-width: 480px) {
  .book-card {
    height: 18rem;
  }
}
</style>

<!-- Book coverpage Text 
<div class="card-shadow fill-height flex-end-row">
              <v-row align-content="end">
                <v-col cols="8">
                  <v-card-title class="lighter-text">{{ book.name }}</v-card-title>
                  <v-card-subtitle class="lighter-text "
                    >{{ book.genere }} • {{ book.author }}</v-card-subtitle
                  >
                </v-col>
                <v-col cols="4" class="d-flex justify-end pr-5" align-self="center">
                  <v-btn icon right @click="showBookDetails(book.b_id)">
                    <v-icon class="lighter-text">mdi-information-outline</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div> -->
