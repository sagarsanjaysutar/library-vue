<template>
  <nav>
    <v-toolbar flat class="darkest-background">
      <v-toolbar-title class="lighter-text">Library</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs right style="width:10%" slider-size="3">
        <v-tab class="lighter-text font-weight-regular text-capitalize" @click="goto('home')">Home</v-tab>
        <v-tab class="lighter-text font-weight-regular text-capitalize" @click="goto('about')">About</v-tab>
        <v-tab
          class="lighter-text font-weight-regular text-capitalize"
          @click="goto('contact')"
        >Contact</v-tab>
      </v-tabs>
      <v-btn class="dark-background ml-5">
        <span class="lighter-text font-weight-regular text-capitalize">Sign in</span>
        <v-icon right class="lighter-text">mdi-account</v-icon>
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  methods:{
      goto(route){
          this.$emit("route",route);
      }
  }
};
</script>

<style>
</style>