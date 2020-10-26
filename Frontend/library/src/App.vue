<template>
  <v-app>
    <v-snackbar v-model="status.show" top elevation="24" color="secondary" light>
      {{ status.value }}
    </v-snackbar>
    <navbar />

    <v-container fluid class="primary" style="min-height: 90vh">
      <router-view></router-view>
    </v-container>

    <v-footer dark class="primary" elevation="12" padless>
      <v-card class="primaryLight d-flex" width="100%">
        <v-list-item>
          <v-list-item-subtitle>Get connected with us on social networks!</v-list-item-subtitle>
          <v-spacer></v-spacer>
          <v-btn class="mx-4" dark icon small>
            <v-icon size="24px">mdi-linkedin</v-icon>
          </v-btn>
        </v-list-item>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import navbar from "./components/navbar";
export default {
  name: "App",
  data: () => {
    return {
      a: true,
    };
  },
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
