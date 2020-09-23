<template>
  <v-card class="primary" width="90%" elevation="0">
    <v-card-title> Welcome, {{ userInfo.name }} </v-card-title>
    <v-card-subtitle>Here are list of your books.</v-card-subtitle>
        
    <v-card-title> Currently issued books. </v-card-title>
    <bookContainer :books="newBooks" />

    <v-divider></v-divider>
    <v-card-title> Previously issued books. </v-card-title>
    <bookContainer :books="newBooks" />
  </v-card>
</template>

<script>
export default {
  name: "student",
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>

<style>
</style>