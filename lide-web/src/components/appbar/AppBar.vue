<template @load="this.checkConnexion">
  <v-app-bar height="48" class="appbar" app color="#42A5F5">
    <v-img max-height="100" max-width="100" src="@/img/ua.png"></v-img>
    <v-toolbar-title v-if="isConnected"
      >Bonjour {{ prenom }} {{ nom }} bienvenue sur LIDE</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-btn small outlined>Deconnexion</v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: "AppBar",

  data: () => ({
    isConnected: false,
    nom: "Maignan",
    prenom: "Quentin",
  }),

  props: {},

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
