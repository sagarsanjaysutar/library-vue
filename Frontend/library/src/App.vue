<template>
  <v-app>
    <navbar />
    <router-view></router-view>
    <footerContainer />
  </v-app>
</template>

<script>
import navbar from "./components/basic/navbar";
import footerContainer from "./components/basic/footerContainer";
export default {
  name: "App",
  components: {
    navbar,
    footerContainer
  },
  data: () => ({
    //
  })
};
</script>
<style>
@import url("../src/assets/style/style.css");
</style>
