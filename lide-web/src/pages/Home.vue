<template>
  <!-- App.vue -->
  <v-app>
    <v-app-bar color="primary" style="z-index: 100" app>
      <v-img
        src="../assets/img/logo_ua.png"
        max-height="50"
        max-width="50"
        contain
      ></v-img>
      <v-spacer></v-spacer>
      <v-btn color="white" small outlined to="/login">Connexion</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-0">
        <v-card class="background" elevation="0" height="500">
          <span class="background-title item-1">LIDE</span>
          <span class="background-title item-2"
            >L'environnement de développement en ligne</span
          >
          <span class="background-title item-3">
            Aucune installation - Accessible depuis chez toi - Connexion via
            identifiant ENT
          </span>
          <v-img :height="$vuetify.breakpoint.xs ? 500 : 600" src="../assets/img/background.jpg" aspect-ratio="2.4" fit></v-img>
        </v-card>
      </v-container>
      <v-container fluid class="mt-15 mb-15 pl-15 pr-15">
        <v-row>
          <v-col md="3">
            <v-card height="300" class="text-center">
              <v-icon class="mt-5" size="70">mdi-cloud</v-icon>
              <p class="mt-5 text-center size-text-1">
                Sauvegarde tes fichiers
                <br />à distance
              </p>
            </v-card>
          </v-col>
          <v-col md="3">
            <v-card height="300" class="text-center">
              <v-icon class="mt-5" size="70">mdi-code-tags</v-icon>
              <p class="mt-5 mb-5 text-center size-text-1">
                Choisis ton langage
              </p>
              <v-icon color="#37474F" class="pr-10" large
                >mdi-language-c</v-icon
              >
              <v-icon color="#0277BD" class="pr-10" large
                >mdi-language-cpp</v-icon
              >
              <v-icon color="#FB8C00" class="pr-10" large
                >mdi-language-java</v-icon
              >
              <v-icon color="#FDD835" large>mdi-language-python</v-icon>
            </v-card>
          </v-col>
          <v-col md="3">
            <v-card height="300" class="text-center">
              <v-icon class="mt-5" size="70">mdi-file-code</v-icon>
              <p class="mt-5 text-center size-text-1">Développe en ligne</p>
            </v-card>
          </v-col>
          <v-col md="3">
            <v-card height="300" class="text-center">
              <v-icon class="mt-5" size="70">mdi-play-circle</v-icon>
              <p class="mt-5 text-center size-text-1">
                Compile & exécute
                <br />ton code
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer color="primary" class="d-flex justify-center">
      <v-card flat tile class="primary white--text text-center">
        <v-card-text>
          <v-btn text class="mx-4 white--text">
            <v-icon class="mr-2">mdi-account-box</v-icon>Contact
          </v-btn>
          <v-btn text class="mx-4 white--text">
            <v-icon class="mr-2">mdi-information</v-icon>Aide
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0 d-flex align-center">
          LIDE est un environnement de développement en ligne qui permet aux
          étudiants de l'université d'Angers de développer en ligne de chez eux.
          <br />L'application a été conçue par des étudiants en Master
          Informatique.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} —
          <strong>Université d'Angers - Département informatique - LIDE</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => {
    return {
      mobileView: 0,
    };
  },
  methods: {
    handleView() {
      this.mobileView = window.innerHeight - 170;
    },
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
};
</script>

<style scoped>
.background {
  position: relative;
}
.background-title {
  position: absolute;
  color: white;
  font-weight: bold;

  z-index: 10;
}
.item-1 {
  font-size: 3em;
  top: 15%;
  left: 47%;
}
.item-2 {
  font-size: 3em;
  top: 25%;
  left: 25%;
}
.item-3 {
  font-size: 1.8em;
  font-style: italic;
  top: 45%;
  left: 23%;
}
.size-text-1 {
  font-size: 1.7em;
  font-weight: bold;
}
</style>
