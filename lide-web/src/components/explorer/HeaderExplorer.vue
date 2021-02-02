<template>
  <div>
    <v-subheader>
      EXPLORER
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon @click="openDialogExport">
            <v-icon>mdi-export-variant</v-icon>
          </v-btn>
        </template>
        <span>Exporter ses fichiers</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" @click="openDialogCreateFolder" icon>
            <v-icon>mdi-folder-plus</v-icon>
          </v-btn>
        </template>
        <span>Créer un projet</span>
      </v-tooltip>
    </v-subheader>

    <v-dialog v-model="dialogCreateFolder" persistent max-width="410">
      <v-card v-on:keydown.esc="dialogCreateFolder = false" v-on:keydown.enter="createProject">
        <v-card-title class="title">Créer un nouveau projet</v-card-title>
        <v-card-text>
          <v-text-field
            class="mt-2 mb-n10"
            label="Nom du projet"
            outlined
            dense
            autofocus="true"
            v-model="projectname"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" small outlined @click="dialogCreateFolder = false">Annuler</v-btn>

          <v-btn color="green darken-1" small outlined @click="createProject">Créer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogExport" persistent max-width="270" >
      <v-card v-on:keydown.esc="dialogExport = false" v-on:keydown.enter="exportFile" class="pa-4">
        <v-card-title class="title">Exporter vos fichiers</v-card-title>
        <v-card-actions >
          <v-btn color="red darken-1" small outlined @click="dialogExport = false">Annuler</v-btn>
          <v-btn color="green darken-1" small outlined @click="exportFile">Exporter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

// service
import ExportService from "../../services/export-service";

export default {
  data() {
    return {
      projectname: "",
      dialogCreateFolder: false,
      dialogExport: false
    };
  },
  methods: {
    createProject: function() {
      this.$store
        .dispatch("project/create", this.projectname)
        .catch(error => {
          // TODO Notification pour avertir d'une erreur à l'utilisateur
          console.log(error);
          this.projectname = "";
        })
        .then(() => (this.projectname = ""));
      this.dialogCreateFolder = false;
    },
    openDialogCreateFolder() {
      this.dialogCreateFolder = true;
    },
    openDialogExport() {
      this.dialogExport = true;
    },
    async exportFile() {
      await ExportService.exporter()
        .then(res => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", this.username + ".zip");
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          console.error("EXECUTION : Error -> " + error);
        });
    }
  },
  computed: {
    ...mapState({
      username: state => state.user.username
    })
  }
};
</script>

<style scoped>
</style>
