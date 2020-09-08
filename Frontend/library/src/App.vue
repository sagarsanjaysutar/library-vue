<template>
  <v-app>
    <v-dialog v-model="showLogOut" width="25rem">
      <v-card class="primaryLight">
        <v-card-title class="headline">Ready to Leave?</v-card-title>
        <v-card-text
          >Select "Logout" below if you are ready to end your current
          session.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="showLogOut = false"
            >Cancel</v-btn
          >
          <v-btn color="secondary" @click="logout">Logout</v-btn>
        </v-card-actions>
      </v-card></v-dialog
    >
    <v-snackbar
      v-model="showStatus"
      top
      timeout="5000"
      dark
      elevation="24"
      color="primaryLight "
      text=""
    >
      {{ status.value }}
      <template v-slot:action>
        <v-btn @click="statusBar = ''" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <nav>
      <v-toolbar flat class="darkest-background">
        <v-toolbar-title class="secondaryLight--text">Library</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tabs right style="width: 10%" slider-size="3">
          <v-tab
            class="secondaryLight--text font-weight-regular text-capitalize"
            link
            to="/"
            >Home</v-tab
          >
          <v-tab
            class="secondaryLight--text font-weight-regular text-capitalize"
            link
            to="/about"
            >About</v-tab
          >
          <v-tab
            class="secondaryLight--text font-weight-regular text-capitalize"
            link
            to="/contact"
            >Contact</v-tab
          >
          <v-tab
            v-if="$store.state.userInfo.accessToken"
            class="secondaryLight--text font-weight-regular text-capitalize"
            link
            to="/dashboard"
            >Dashboard</v-tab
          >
        </v-tabs>

        <span v-if="!$store.state.userInfo.accessToken">
          <v-dialog v-model="showLogin" max-width="30rem">
            <template v-slot:activator="{ on, attrs }" v-bind="attrs" v-on="on">
              <v-btn
                class="dark-background ml-5"
                @click="showLogin = true"
                @showLogin="showLogin = $event"
              >
                <span class="secondaryLight--text font-weight-regular"
                  >Sign in</span
                >
                <v-icon right class="secondaryLight--text">mdi-account</v-icon>
              </v-btn>
            </template>
            <login />
          </v-dialog>
        </span>
        <span v-else>
          <v-menu offset-y="">
            <template v-slot:activator="{ on }">
              <v-btn icon large v-on="on">
                <v-avatar size="32px" item>
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/john.png"
                  ></v-img>
                </v-avatar>
              </v-btn>
            </template>
            <v-card class="mx-auto primaryLight" min-width="250" tile>
              <v-list class="primaryLight">
                <v-list-item>
                  <v-list-item-avatar size="100">
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/john.png"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="title"
                      >{{ $store.state.userInfo.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{
                      $store.state.userInfo.email
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item link to="/profile">
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
      </v-toolbar>
    </nav>
    <v-container fluid class="pa-0">
      <router-view></router-view>
    </v-container>

    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="darker-background font-weight-regular">
          Get connected with us on social networks!
          <v-spacer></v-spacer>

          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-title>

        <!-- <v-card-text class="py-2 white--text text-center darkest-background">
          {{ new Date().getFullYear() }} —
          <strong>Vuetify</strong>
        </v-card-text>-->
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import login from "./components/login";

export default {
  name: "App",
  components: {
    login,
  },
  data: () => ({
    showLogOut: false,
    showLogin: false,
    icons: ["mdi-linkedin", "mdi-instagram"],
  }),
  methods: {
    logout() {
      this.showLogOut = false;
      this.showLogin = false;
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
  },
  computed: {
    status() {
      return this.$store.state.status;
    },
    showStatus: {
      get: function () {
        if (this.status) {
          return "value" in this.status;
        } else {
          return false;
        }
        // return this.status ? "value" in this.status : false;
      },
      set: function () {
        this.$store.commit("setStatus", {});
      },
    },
  },
};
</script>
<style>
@import url("../src/assets/style/style.css");
.text-transform-none {
  text-transform: none !important;
}
</style>
