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
        <v-btn color="blue" @click="login">Se connecter</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserService from "../services/user-service";

export default {
  name: "Login",

  data() {
    return {
      username: "",
    };
  },
  methods: {
    login: function () {
      this.$store.commit("username", this.username);

      UserService.getUserProjects(this.$store.getters.username).then((res) => {
        this.$store.commit("projects", res.data);
        this.$router.push('/app');
      });
      
    }
  }
};
</script>

<style>
</style>