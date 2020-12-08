<template>
  <span style="width: 100%; height:100%">
    <student v-if="userInfo.type === 'Student'" />
    <employee v-if="userInfo.type === 'Employee'" />
  </span>
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

<style></style>
