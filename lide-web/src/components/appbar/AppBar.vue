<template @load="this.checkConnexion">
  <v-app-bar class="appbar" app color="#42A5F5">
    <v-img max-height="150" max-width="150" src="@/img/ua.png"></v-img>
    <v-toolbar-title
      class="mx-10"
      v-if="false"
    >Bonjour {{ this.$store.getters.username }} bienvenue sur LIDE</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      to="/app"
      v-if="$route.path === '/'"
      color="white"
      small
      outlined
    >Connexion</v-btn>
    <v-btn
      to="/logout"
      v-if="$route.path === '/app'"
      color="white"
      small
      outlined
    >Deconnexion</v-btn>
  </v-app-bar>
</template>
<script>
export default {

  name: "AppBar",

  data: () => ({
    isConnected: false,
    username: ""
  }),
};
</script>
<style scoped>
.appbar {
  height: 5vh;
}
</style>
