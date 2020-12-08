<template>
  <span>
    <v-dialog v-model="isFineDialogOpen" width="25vw">
      <v-card light>
        <v-card-title>User fined</v-card-title>
        <v-card-text
          >Due Days : {{ penaltyInfo.dueDays }}
          <br />
          Amount : {{ penaltyInfo.penalty }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="primary"
            @click="
              penalityPaidStatus = true;
              returnBook();
            "
            >Pay</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isAddOrEditBookOpen" width="30rem" persistent>
      <addOrEditBook
        :selectedBook="selectedBook"
        @isAddOrEditBookOpen="
          isAddOrEditBookOpen = $event;
          selectedBook = {};
        "
      />
    </v-dialog>
    <v-toolbar light elevation="5">
      <v-toolbar-title>Welcome {{ userInfo.name }} !</v-toolbar-title>
    </v-toolbar>
    <v-tabs light slider-color="primary lighten-5" slider-size="4">
      <v-tab> Books </v-tab>
      <v-tab> Issue & Return </v-tab>
      <v-tab-item class="pa-3 white">
        <v-data-table
          :headers="headers"
          :items="books"
          :search="searchedBook"
          light
          class="elevation-1"
          :items-per-page="5"
          hide-default-footer
        >
          <template v-slot:top="{ pagination, options, updateOptions }">
            <v-toolbar light flat>
              <v-toolbar-title>
                Books
              </v-toolbar-title>
              <v-spacer></v-spacer>

              <v-text-field
                dense
                hide-details
                v-model="searchedBook"
                light
                solo
                placeholder="Search books"
                prepend-inner-icon="mdi-magnify"
              >
              </v-text-field>

              <v-spacer></v-spacer>
              <v-btn class="accent" @click="isAddOrEditBookOpen = true">
                Add book
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-toolbar>
            <v-data-footer
              :pagination="pagination"
              :options="options"
              @update:options="updateOptions"
              items-per-page-text=""
              :items-per-page-options="[5]"
            />
          </template>
          <template v-slot:item.name="{ item }">
            <v-list-item class="d-flex">
              <v-list-item-content>
                <v-list-item-title> {{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.author }} • {{ item.genere }} </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn icon small color="info " @click.stop="setSelectedBook(item.b_id)">
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item class="pa-3 white">
        <v-card-title class="primary--text">Issue or return book.</v-card-title>
        <v-form class="pa-5">
          <v-row>
            <v-col cols="6">
              <v-text-field
                hide-details
                v-model="s_id"
                solo
                light
                label="Student ID"
                placeholder="Student ID"
              ></v-text-field
            ></v-col>
            <v-col cols="6">
              <v-text-field
                hide-details
                light
                v-model="b_id"
                solo
                label="Book ID"
                placeholder="Book ID"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="d-flex justify-end align-content-end">
              <v-btn class="accent mr-5" large @click="returnBook()">
                Return
              </v-btn>
              <v-btn class="accent" large @click="issueBook()">
                Issue
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-tab-item>
    </v-tabs>
  </span>
</template>

<script>
import addOrEditBook from "./addOrEditBook";
export default {
  name: "employee",
  components: {
    addOrEditBook,
  },
  data: () => {
    return {
      isFineDialogOpen: false,
      isAddOrEditBookOpen: false,
      penalityPaidStatus: false,
      selectedBook: {},
      penaltyInfo: {},
      searchedBook: "",
      b_id: "",
      s_id: "",
      headers: [
        { text: "Name", value: "name", sortable: false, align: "start" },
        { text: "Location ", value: "location", sortable: false, align: "center" },
        { text: "Quantity ", value: "totalQuantity", sortable: false, align: "center" },
        { text: "Actions", value: "actions", sortable: false, align: "center" },
      ],
    };
  },
  methods: {
    issueBook() {
      const issueInfo = {
        b_id: this.b_id,
        s_id: this.s_id,
        e_id: this.userInfo.u_id,
      };
      this.$store.dispatch("issueBook", issueInfo);
      this.issueInfo = {};
    },
    returnBook() {
      const returnInfo = {
        b_id: this.b_id,
        s_id: this.s_id,
        e_id: this.userInfo.u_id,
        penalityPaidStatus: this.penalityPaidStatus,
      };
      this.isFineDialogOpen = false;
      this.$store
        .dispatch("returnBook", returnInfo)
        .then((penaltyInfo) => {
          if (penaltyInfo) {
            this.isFineDialogOpen = true;
            this.penaltyInfo = penaltyInfo;
          }
        })
        .catch((err) => {
          this.$store.commit("setStatus", err);
        });
      this.issueInfo = {};
    },

    setSelectedBook(b_id) {
      for (const book of this.books) {
        if (book.b_id === b_id) {
          this.selectedBook = book;
          break;
        }
      }
      this.isAddOrEditBookOpen = !this.isAddOrEditBookOpen;
    },
  },
  created() {
    this.$store.dispatch("getAllBooks");
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    books() {
      return this.$store.state.books.all;
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

<!-- <v-card class="primary pa-5" elevation="0">
          <v-text-field
            hide-details
            v-model="searchedBook"
            background-color="primaryLight"
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
          <v-list style="height: 22rem; overflow-y: scroll" class="primary">
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

            <v-list-item v-for="book in filteredBooks" :key="book.b_id">
              <v-card width="100%" class="primary" elevation="0" :ref="book._id">
                <v-list style="width: 100%" class="pa-0 primary">
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
                    <v-list-item-action class="d-flex" style="flex-direction:row">
                      <v-btn
                        icon
                        small
                        color="info "
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
                        @click="
                          isDeleteDialogOpen = true;
                          b_id = book.b_id;
                        "
                      >
                        <v-icon small>mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-list-item>
            <v-divider :inset="inset" light></v-divider>
          </v-list>
        </v-card> -->
