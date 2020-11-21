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
      username: "",
    };
  },
  methods: {
    login: function () {

      this.$store.commit("username", this.username);

      //attention !!! get username a ete changer et renvoi rien 
      UserService.getProjects(this.$store.getters.username);
      //attention !!! "nom de projet" devra etre changé avec le bon res.projetc !!
      this.$store.commit("projects", "nom de projet random");
      this.$router.push('/app');
      
    }
  }
};
</script>
<style>
</style>