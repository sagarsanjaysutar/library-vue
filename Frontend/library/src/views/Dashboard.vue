<template>
  <v-container
    class="red justify-center align-center"
    fill-height
    fluid
    style="height: 80vh"
  >
    <student v-if="userInfo.type === 'student'" />
    <employee v-if="userInfo.type === 'employee'" />
  </v-container>
</template>

<script>
import student from "../components/student";
import employee from "../components/employee";

export default {
  name: "dashboard",
  components: {
    student,
    employee,
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>

<style>
</style>