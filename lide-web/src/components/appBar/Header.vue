<template @load="this.checkConnexion">
    <v-app-bar app color="#42A5F5">
        <v-app-bar-side-icon class="ma-4"><v-img align="center" src="@/img/logoLide.png" height="60" contain> </v-img></v-app-bar-side-icon> 
        
        <v-toolbar-title v-if="isConnected" >Bonjour {{prenom}} {{nom}} bienvenue sur LIDE</v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-btn v-bind:color="this.isConnected? '#ff0000' : '#00ff66'" elevation="2" @click="connect()">
          {{this.isConnected? "Déconnecter" : "Connecter"}}
        </v-btn>
    </v-app-bar>
</template>
<script>
export default {
  name : "Header",  

  data: () => ({
    isConnected: false,
    nom :'Maignan',
    prenom: 'Quentin'
    }),

  props: {

    },

  methods: {

    checkConnexion: function(){
      //fonction qui permet de savoir si l'etudiant est deja connecter au site
    },

    connect: function(){
      //fonction qui appelle CAS et realise la connection
      //et qui mets a jour les attribut de nom et prenom en consequece

      //this.nom = "Maignan";
      //this.prenom = "Quentin";

      if(!this.isConnected){
      this.isConnected = true;
      //apelle au CAS et chargement des fields noms et prenom
      }

      else {
        this.isConnected = false;
      }

    },

    disconnect: function(){
      //fonction qui déconecte l'etudiant du site
       this.isConnected = false;
    }
  }
};
</script>