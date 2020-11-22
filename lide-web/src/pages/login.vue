<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-text-field
          label="Username"
          outlined
          v-model="username"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-btn color="blue" @click="login()">Se connecter</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserService from "../services/task-service.js";

export default {
  name: "Login",

  data() {
    return {
      username: "user1",
    };
  },
  methods: {
    login: function () {

      this.$store.commit('username',username);
      this.$router.push('/app');

    }
  }
};
</script>
<style>
</style>