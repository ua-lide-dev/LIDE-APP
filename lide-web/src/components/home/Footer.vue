<template>
  <v-footer app color="blue">
    <!-- icons and corresponding links -->
    <v-card-text class="py-0" align="center">
      <v-btn
        align="center"
        text
        rounded
        color="#FFFFFF"
        v-for="link in links"
        :key="link"
      >
        <v-icon size="20">{{ link.icon }}</v-icon
        ><strong>{{ link.text }}</strong>
      </v-btn>
    </v-card-text>

    <!-- middle text -->
    <v-card-text align="center" class=" py-0 white--text">
      LIDE est un environnement de développement en ligne qui permet aux
      étudiants de l'université d'Angers de développer de chez eux.
    </v-card-text>
    <v-card-text align="center" class=" py-0 white--text">
      L'application a été conçue par des étudiants en Master Informatique
    </v-card-text>

    <!-- last line -->
    <v-card-text align="center" class=" pb-0 white--text">
      2020 - <b>Université d'Angers</b> - <b>Département Informatique</b> -
      <b>LIDE</b>
    </v-card-text>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    links: [
      {
        icon: "mdi-account-box",
        text: "Contact",
      },
      {
        icon: "mdi-information",
        text: "Aide",
      },
    ],
  }),
};
</script>
