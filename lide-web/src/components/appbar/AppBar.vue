<template @load="this.checkConnexion">
  <v-app-bar class="appbar" app color="#42A5F5">
    <v-img max-height="150" max-width="150" src="@/img/ua.png"></v-img>
    <v-toolbar-title
      class="mx-10"
      v-if="!isConnected"
    >Bonjour {{ this.$store.getters.username }} bienvenue sur LIDE</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      to="/app"
      v-if="$route.path === '/'"
      color="white"
      small
      outlined
      @click="connect()"
    >Connexion</v-btn>
    <v-btn
      to="/"
      v-if="$route.path === '/app'"
      color="white"
      small
      outlined
      @click="disconnect()"
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
  methods: {
    checkConnexion: function() {
      //fonction qui permet de savoir si l'etudiant est deja connecter au site
    },

    connect: function() {
      //fonction qui appelle CAS et realise la connection
      //et qui mets a jour les attribut de nom et prenom en consequece

      //this.nom = "Maignan";
      //this.prenom = "Quentin";

      if (!this.isConnected) {
        this.isConnected = true;
        //apelle au CAS et chargement des fields noms et prenom
      } else {
        this.isConnected = false;
      }
    },

    disconnect: function() {
      //fonction qui déconecte l'etudiant du site
      this.isConnected = false;
    },
  },
};
</script>
<style scoped>
.appbar {
  height: 5vh;
}
</style>
