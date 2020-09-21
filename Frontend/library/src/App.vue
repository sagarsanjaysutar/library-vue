<template>
  <v-app>
    <v-snackbar v-model="status.show" top elevation="24" color="grey ">
      {{ status.value }}
    </v-snackbar>
    <navbar />

    <v-container fluid class="primary" style="min-height: 90vh">
      <router-view></router-view>
    </v-container>

    <v-footer dark padless class="primary" elevation="12">
      <v-card class="primary" width="100%" flat tile>
        <v-card-title class="font-weight-regular">
          Get connected with us on social networks!
          <v-spacer></v-spacer>

          <v-btn class="mx-4" dark icon>
            <v-icon size="24px">mdi-linkedin</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import navbar from "./components/navbar";
export default {
  name: "App",
  components: {
    navbar,
  },
  computed: {
    status() {
      return this.$store.state.status;
    },
  },
};
</script>
<style>
@import url("../src/assets/style/style.css");
</style>
