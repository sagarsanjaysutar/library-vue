<template>
  <v-card
    width="60rem"
    height="30rem"
    color="primary"
    class="elevation-10"
    style="overflow: hidden"
  >
    <v-dialog v-model="showDeleteDialog" persistent max-width="25vw">
      <v-card>
        <v-card-title class="mb-1">Delete this book?</v-card-title>
        <v-card-subtitle>This book will no longer be in system.</v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="showDeleteDialog = false">Cancel</v-btn>
          <v-btn color="error darken-1" outlined @click="deleteBook(b_id)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isFined" width="30rem">
      <v-card class="primaryLight">
        <v-toolbar color="primaryLight">
          <v-toolbar-title>User fined</v-toolbar-title>
        </v-toolbar>
        <v-card-title>Due Days {{ penaltyInfo.dueDays }}</v-card-title>
        <v-card-title>Amount {{ penaltyInfo.penalty }}</v-card-title>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            class="primary"
            large
            @click="
              returnInfo.penalityPaidStatus = true;
              returnBook();
            "
            >Pay</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-toolbar color="primaryLight" elevation="10">
      <v-toolbar-title>Welcome {{ userInfo.name }} !</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical background-color="primary" slider-color="primary lighten-5" slider-size="4">
      <v-tab> Issue & Return </v-tab>

      <v-tab> Books </v-tab>

      <v-tab-item class="primary">
        <v-card-title>Issue or return book.</v-card-title>
        <v-form class="pa-5">
          <v-row>
            <v-col cols="12">
              <v-text-field
                color="accent"
                v-model="s_id"
                outlined
                label="Student ID"
                placeholder="Student ID"
              ></v-text-field
            ></v-col>
            <v-col cols="12">
              <v-text-field
                color="accent"
                v-model="b_id"
                outlined
                label="Book ID"
                placeholder="Book ID"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="d-flex justify-end align-content-end">
              <v-btn class="secondary mr-5" large @click="returnBook()">
                Return
              </v-btn>
              <v-btn class="secondary" large @click="issueBook()">
                Issue
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-tab-item>
      <v-tab-item>
        <v-card class="primary pa-5">
          <v-text-field
            v-model="searchedBook"
            background-color="primaryLight"
            hide-details=""
            solo
            outlined
            placeholder="Search books"
          >
            <template v-slot:append>
              <v-btn icon class="mr-2"><v-icon>mdi-magnify</v-icon></v-btn>
              <v-btn icon><v-icon>mdi-plus</v-icon></v-btn>
            </template>
          </v-text-field>
          <v-card-subtitle>Search, add or delete books.</v-card-subtitle>
          <v-list style="height: 18rem; overflow-y: scroll" class="primary">
            <v-list-item
              v-if="
                filteredBooks.length === 0 || filteredBooks === null || filteredBooks === undefined
              "
              >No books added yet.
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle class="text-center">Name </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="text-center"
                  >Location
                </v-list-item-subtitle> </v-list-item-content
              ><v-list-item-content>
                <v-list-item-subtitle class="text-center">Quantity </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="text-center"> </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-for="book in filteredBooks" :key="book.b_id" dense>
              <v-card
                width="100%"
                class="mb-2 d-flex primaryLight"
                outlined
                elevation="8"
                :ref="book._id"
              >
                <v-list style="width: 100%" class="pa-0 primaryLight">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class
                        >{{ book.name }},
                        <v-list-item-subtitle
                          >{{ book.author }} • {{ book.genere }}
                        </v-list-item-subtitle>
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content>
                      <v-list-item-subtitle>{{ book.location }} </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content>
                      <v-list-item-subtitle>{{ book.totalQuantity }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-card-actions class="align-center justify-start d-flex pl-0">
                  <v-btn
                    icon
                    small
                    color="info "
                    outlined
                    :style="book.role === 'admin' ? 'margin-right: 40px' : ''"
                    @click.stop="
                      isEditable = !isEditable;
                      setInfo(book._id);
                    "
                  >
                    <v-icon small>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    small
                    color="red"
                    outlined
                    @click="
                      showDeleteDialog = true;
                      b_id = book.b_id;
                    "
                  >
                    <v-icon small>mdi-delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-list-item>
          </v-list>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  name: "employee",
  data: () => {
    return {      
      isFined: false,
      penaltyInfo: {},
      searchedBook: "",
      b_id: "",
      s_id:"",
      showDeleteDialog: false,
    };
  },
  methods: {
    issueBook() {
      const issueInfo = {
        b_id:this.b_id,
        s_id:this.s_id,
        e_id:this.userInfo.u_id
      }      
      this.$store.dispatch("issueBook", issueInfo);
      this.issueInfo = {};
    },
    returnBook() {
       const returnInfo = {
        b_id:this.b_id,
        s_id:this.s_id,
        e_id:this.userInfo.u_id
      }
      this.isFined = false;
      this.$store.dispatch("returnBook", returnInfo).then(({ penaltyInfo }) => {
        if (penaltyInfo) {
          this.isFined = true;
          this.penaltyInfo = penaltyInfo;
        }
      });
      this.issueInfo = {};
    },
    deleteBook() {
      this.showDeleteDialog = false;
      this.$store.dispatch("deleteBook", this.b_id);
    },
  },
  created() {
    this.$store.dispatch("getSearchedBooks", "");
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    books() {
      return this.$store.state.books.searchedBooks;
    },
    filteredBooks() {
      return this.books.filter((book) => {
        return book.name.toLowerCase().match(this.searchedBook.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.add-books {
  height: 10rem;
  width: 10rem;
  display: flex;
  flex-direction: column;
}
</style>
