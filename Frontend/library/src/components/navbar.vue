<template>
  <span>
    <v-dialog v-model="showLogOut" width="30rem">
      <v-card class="primaryLight">
        <v-card-title class="headline">Ready to Leave?</v-card-title>

        <v-card-text
          >Select "Logout" below if you are ready to end your current session.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="showLogOut = false">Cancel</v-btn>
          <v-btn color="secondary" @click="logout">Logout</v-btn>
        </v-card-actions>
      </v-card></v-dialog
    >
    <v-dialog v-model="showLogin" max-width="30rem"><login @close="showLogin = !$event"/></v-dialog>
    <nav>
      <v-toolbar class="primary" elevation="10">
        <v-toolbar-title class="secondaryLight--text">Library</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          dark
          background-color="primaryLight"
          hide-details
          solo
          placeholder="Search for wonderful books."
          v-model="searchQuery"
          @keyup.enter="getSearchedBooks"
          @click:append="getSearchedBooks"
          append-icon="mdi-magnify"
        >
        </v-text-field>
        <v-spacer></v-spacer>
        <span v-if="isLoggedIn">
          <v-menu offset-y="">
            <template v-slot:activator="{ on }">
              <v-btn icon large v-on="on">
                <v-avatar size="32px" item>
                  <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                </v-avatar>
              </v-btn>
            </template>
            <v-card class="mx-auto primaryLight" min-width="250" tile>
              <v-list class="primaryLight">
                <v-list-item>
                  <v-list-item-avatar size="100">
                    <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="title"
                      >{{ $store.state.userInfo.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ $store.state.userInfo.email }} </v-list-item-subtitle>
                    <v-list-item-subtitle>{{ $store.state.userInfo.type }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item link to="/dashboard">
                  <v-list-item-action>
                    <v-icon>mdi-account-circle</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Profile</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link @click="showLogOut = true">
                  <v-list-item-action>
                    <v-icon>mdi-logout-variant</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Logout</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </span>
        <span v-else>
          <v-btn
            class="ml-5"
            color="secondaryLight"
            @click="showLogin = true"
            @showLogin="showLogin = $event"
            outlined
          >
            <span>Sign in</span>
            <v-icon right class="secondaryLight--text">mdi-account</v-icon>
          </v-btn>
        </span>
      </v-toolbar>
    </nav>
  </span>
</template>

<script>
import login from "./login";
export default {
  name: "navbar",
  components: {
    login,
  },
  data: () => ({
    showLogOut: false,
    showLogin: false,
    searchQuery: "",
  }),
  methods: {
    logout() {
      this.showLogOut = false;
      this.showLogin = false;
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
    getSearchedBooks() {
      if (this.$route.path !== "/searchedResults") {
        this.$router.push({
          name: `searchedResults`,
          query: { search: this.searchQuery },
        });
      } else {
        
        this.$store.dispatch("getSearchedBooks", this.searchQuery);
      }
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.userInfo.accessToken || false;
    },
  },
};
</script>

<style></style>
