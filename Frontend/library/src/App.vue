<template>
  <v-app>
    <nav>
      <v-toolbar flat class="darkest-background">
        <v-toolbar-title class="lighter-text">Library</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tabs right style="width:10%" slider-size="3">
          <v-tab class="lighter-text font-weight-regular text-capitalize" link to="/">Home</v-tab>
          <v-tab class="lighter-text font-weight-regular text-capitalize" link to="/about">About</v-tab>
          <v-tab class="lighter-text font-weight-regular text-capitalize" link to="/contact">Contact</v-tab>
        </v-tabs>
        <v-dialog v-model="showLogin" width="25rem">
          <template v-slot:activator="{ on, attrs }" v-bind="attrs" v-on="on">
            <v-btn class="dark-background ml-5" @click="showLogin=!showLogin">
              <span class="lighter-text font-weight-regular">Sign in</span>
              <v-icon right class="lighter-text">mdi-account</v-icon>
            </v-btn>
          </template>
          <login />
        </v-dialog>
      </v-toolbar>
    </nav>
    <router-view></router-view>
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
    login
  },
  data: () => ({
    showLogin: false,
    icons: ["mdi-linkedin", "mdi-instagram"]
    //
  })
};
</script>
<style>
@import url("../src/assets/style/style.css");
.text-transform-none {
  text-transform: none !important;
}
</style>
