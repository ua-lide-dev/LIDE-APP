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

export default {
  name: "Login",

  data() {
    return {
      username: "user1",
    };
  },
  methods: {
    login: function () {

      this.$store.commit('SET_USERNANE',this.username);
      this.$store.dispatch('createUser',this.$store);
      this.$router.push('/app');

    }
  }
};
</script>
<style>
</style>