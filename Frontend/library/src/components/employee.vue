<template>
  <v-card width="50rem">
    <v-toolbar color="primaryLight">
      <v-toolbar-title>Welcome {{ userInfo.name }} !</v-toolbar-title>
    </v-toolbar>
    <v-tabs
      vertical
      background-color="primary"
      class="elevation-10"
      slider-color="primary lighten-5"
      slider-size="4"
    >
      <v-tab> Issue </v-tab>
      <v-tab> Return </v-tab>
      <v-tab> Books </v-tab>
      <v-tab-item class="primary">
        <v-form class="pa-5">
          <v-row>
            <v-col cols="12">
              <v-text-field
                color="accent"
                v-model="issue.s_id"
                outlined
                label="Student ID"
                placeholder="Student ID"
              ></v-text-field
            ></v-col>
            <v-col cols="12">
              <v-text-field
                color="accent"
                v-model="issue.b_id"
                outlined
                label="Book ID"
                placeholder="Book ID"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="d-flex justify-end align-content-end">
              <v-btn class="secondary" large> Issue </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-tab-item>
      <v-tab-item class="primary">
        <v-form class="pa-5">
          <v-row>
            <v-col cols="12">
              <v-text-field
                color="accent"
                v-model="issue.s_id"
                outlined
                label="Student ID"
                placeholder="Student ID"
              ></v-text-field
            ></v-col>
            <v-col cols="12">
              <v-text-field
                color="accent"
                v-model="issue.b_id"
                outlined
                label="Book ID"
                placeholder="Book ID"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="d-flex justify-end align-content-end">
              <v-btn class="secondary mr-5" large> Check Penality </v-btn>
              <v-btn class="secondary" large disabled> Return </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-tab-item>
      <v-tab-item class="primary">yy </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  name: "employee",
  data: () => {
    return { issue: Object, return: Object };
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