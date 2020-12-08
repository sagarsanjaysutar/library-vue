<template>
  <v-app>
    <v-snackbar v-model="status.show" elevation="24" bottom right color="accent" text>
      {{ status.value }}
    </v-snackbar>
    <navbar />

    <v-container fluid style="background-color:#f6f6f6;" class="fill-height">
      <router-view></router-view>
    </v-container>
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
