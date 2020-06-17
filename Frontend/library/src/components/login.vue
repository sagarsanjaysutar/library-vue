<template>
  <v-card dark class="darkest-background login-card" elevation="20">
    <span v-if="isUser && !hasForgottenPassword ">
      <v-card-title>Sign in</v-card-title>
      <v-card-subtitle>Log in to Library</v-card-subtitle>
      <v-form class="ma-2 pa-3">
        <v-text-field outlined label="Email" placeholder="Email"></v-text-field>
        <v-text-field
          outlined
          label="Password"
          placeholder="Password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword=!showPassword"
        ></v-text-field>
        <v-card-actions>
          <v-btn outlined width="50%" @click="isUser=false">
            <span>Create account</span>
          </v-btn>
          <v-btn class="info" outlined width="50%">
            <span>Login</span>
          </v-btn>
        </v-card-actions>
        <a
          href="#"
          class="ma-2 grey--text d-flex justify-center"
          @click="hasForgottenPassword=true; isUser=false "
        >Forgot password?</a>
      </v-form>
    </span>
    <span v-if="hasForgottenPassword && !isUser">
      <v-card-title>Forgot your password?</v-card-title>
      <v-card-subtitle>No issues, enter your email and Id.</v-card-subtitle>
      <v-form class="ma-2 pa-3">
        <v-text-field outlined label="ID" placeholder="ID"></v-text-field>
        <v-text-field outlined label="Email" placeholder="Email"></v-text-field>

        <v-card-actions>
          <a
            class="text-transform-none font-weight-regular align-start d-flex"
            style="width:50%"
            @click="isUser=!isUser; hasForgottenPassword=false"
          >Sign in instead</a>

          <v-btn class="info" width="50%" @click="makeAccount">
            <span>Send password</span>
          </v-btn>
        </v-card-actions>
      </v-form>
    </span>
    <span v-if="!isUser && !hasForgottenPassword">
      <v-progress-linear indeterminate :active="isCreatingAccount"></v-progress-linear>
      <v-card-title>Sign up</v-card-title>
      <v-card-subtitle>Make a new account.</v-card-subtitle>
      <v-form class="ma-2 pa-3">
        <v-text-field outlined label="ID" placeholder="ID"></v-text-field>
        <v-text-field outlined label="Email" placeholder="Email"></v-text-field>
        <v-text-field
          outlined
          label="Password"
          placeholder="Password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword=!showPassword"
        ></v-text-field>
        <v-text-field
          outlined
          label="Confirm password"
          placeholder="Confirm password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword=!showPassword"
        ></v-text-field>
        <v-card-actions>
          <a
            class="text-transform-none font-weight-regular align-start d-flex"
            style="width:50%"
            @click="isUser=!isUser"
          >Sign in instead</a>

          <v-btn class="info" width="50%" @click="makeAccount">
            <span>Create account</span>
          </v-btn>
        </v-card-actions>
      </v-form>
    </span>
    <span></span>
  </v-card>
</template>

<script>
export default {
  name: "login",
  data: () => {
    return {
      showPassword: false,
      isUser: true,
      hasForgottenPassword: false,
      isCreatingAccount: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {
    makeAccount() {
      this.isCreatingAccount = true;
      setTimeout(3000);
      return true;
    }
  }
};
</script>

<style scoped>
</style>