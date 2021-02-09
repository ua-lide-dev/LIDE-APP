<template>
  <!-- Drawer Help -->
  <v-navigation-drawer
    class="drawer-setting"
    color="bodysecondary"
    v-model="helpDrawer"
    right
    absolute
  >
    <v-card height="48" color="bodysecondary" outlined tile>
      <v-row>
        <v-col cols="8">
          <h2 class="ml-5 mt-2 text--secondary">Aide</h2>
        </v-col>
        <v-col cols="1">
          <v-btn
            class="mt-2 ml-3 text--secondary"
            @click="closeDrawerHelp"
            small
            text
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-row justify="center">
      <v-col cols="10">
        <h4 class="my-2">Comment créer un nouveau dossier ou fichier ?</h4>
        <p class="text-justify">
          Sur UIDE, la création de dossiers ou de fichiers est simple
          d'utilisation, pour ajouter un projet, il suffit de cliquer sur l'icon
          dossier plus dans le menu de gauche puis de remplir les champs
          demandés. Pour ajouter un fichier, vous trouverez un bouton "Ajouté un
          fichier" en déroulant le menu de votre nouveau projet, comme pour le
          projet, remplissez les champs demandés. Et voilà, vous pouvez
          commencer à développer en cliquant sur votre fichier.
        </p>
        <h4 class="my-2">Comment compiler et exécuter mon code ?</h4>
        <p class="text-justify">
          UIDE a été pensé pour simplifier la compilation et l'exécution du
          code. Il vous suffit juste dans un premier temps de sauvegarder votre
          fichier en cliquant sur le bouton "Sauvegarder" (icône disquette). Une
          fois votre fichier sauvegardé, il suffit simplement d'appuyer sur le
          bouton "Exécuter" (icône play) et l'UIDE se chargera de compiler et
          exécuter votre code. Si tout se passe bien, vous verrez votre résultat
          de compilation apparaître dans le Terminal en bas de l'application.
        </p>
        <p>
          Pour tout autre question, UIDE vous invite à contacter votre
          professeur référent.
        </p>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "HelpDrawer",
  computed: {
    ...mapState({
      helpDrawer: (state) => state.drawer.helpDrawer,
    }),
  },
  methods: {
    closeDrawerHelp: function () {
      this.$store.dispatch("drawer/closeHelpDrawer");
    },
  },
};
</script>

<style scoped>
</style>