<template>
  <v-card width="50rem">
    <v-dialog v-model="isFined" width="30rem">
      <v-card class="primaryLight">
        <v-toolbar color="primaryLight">
          <v-toolbar-title>User fined</v-toolbar-title>
        </v-toolbar>
        <v-card-title>Due Days {{ penaltyInfo.dueDays }}</v-card-title>
        <v-card-title>Amount {{ penaltyInfo.penalty }}</v-card-title>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            class="primary"
            large
            @click="
              returnInfo.penalityPaidStatus = true;
              returnBook();
            "
            >Pay</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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
                v-model="issueInfo.s_id"
                outlined
                label="Student ID"
                placeholder="Student ID"
              ></v-text-field
            ></v-col>
            <v-col cols="12">
              <v-text-field
                color="accent"
                v-model="issueInfo.b_id"
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
                v-model="returnInfo.s_id"
                outlined
                label="Student ID"
                placeholder="Student ID"
              ></v-text-field
            ></v-col>
            <v-col cols="12">
              <v-text-field
                color="accent"
                v-model="returnInfo.b_id"
                outlined
                label="Book ID"
                placeholder="Book ID"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="d-flex justify-end align-content-end">
              <v-btn class="secondary" large @click="returnBook()">
                Return
              </v-btn>
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
    return {
      issueInfo: Object,
      returnInfo: Object,
      isFined: false,
      penaltyInfo: Object,
    };
  },
  methods: {
    returnBook() {
      this.isFined = false;
      this.$store
        .dispatch("returnBook", this.returnInfo)
        .then(({ penaltyInfo }) => {
          if (penaltyInfo) {
            this.isFined = true;
            this.penaltyInfo = penaltyInfo;
          }
        });
    },
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