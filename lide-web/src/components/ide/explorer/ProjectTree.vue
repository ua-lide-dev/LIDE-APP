<template>
  <div style="margin: 10px" @contextmenu="diableRightClick($event)">
    <div align="center">
      <h3 style="user-select: none; display: inline-block">{{ projectName }}</h3>
      <v-btn
        style="background-color: #3caee9; width: 8%; display: inline-block; margin-left: 10px"
          @click="createNewFile">
          <v-icon >mdi-plus-box</v-icon>
      </v-btn>
    </div>
    
    <template>
      <v-treeview :items="files" activatable item-key="name" open-on-click transition>
        <template slot="label" slot-scope="{ item }">
          <!-- evenement click sur le titre de l'item  -->
          <div @contextmenu="filesMenu($event, item)" @click="openFile(item)">{{ item.filename }}.{{item.extension}}</div>
        </template>

        <template v-slot:prepend="{ item, open }">
          <!-- icon du fichier/dossier -->
          <div @contextmenu="filesMenu($event, item)" @click="openFile(item)">
            <!-- evenement click sur l'icone de l'item  -->

            <v-icon v-if="!item.extension">
              <!-- icon de dossier -->
              {{ open ? "mdi-folder-open" : "mdi-folder" }}
            </v-icon>
            <v-icon v-else>
              {{ icons[item.extension] }}
              <!-- icon de fichier -->
            </v-icon>
          </div>
        </template>
      </v-treeview>
    </template>

    <v-divider></v-divider>
    <!-- 
    <VueSimpleContextMenu
      style="padding-left: 0px; user-select: none;"
      :options="fileOptions"
      ref="FileContextMenu"
      @option-clicked="FileOptionClicked"
      element-id="Menu"
    >
    </VueSimpleContextMenu-->

    <!--invisible to start, will appear when needed -->
    <NewFileModal v-model="showModal" :projectName="projectName"></NewFileModal>
  </div>
</template>

<script>
// import VueSimpleContextMenu from "./Vue-simple-context-menu";
import NewFileModal from "./modalNewFile.vue"

export default {
  name: "ProjectTree",
   components: {
     NewFileModal
    //VueSimpleContextMenu,
  },
  props: {
    projectName: String,
    files: Array
  },
  methods: {
    openFile: function (item) {
      //ouvrir le fichier cliqué
      console.log(" open", item);
    },
    filesMenu: function (e, item) {
      //ouvrir le ContextMenu
      //console.log(item, " right clicked");
      e.preventDefault(); //desactiver le menu original du navigateur internet
      this.$refs.FileContextMenu.showMenu(e, item);
    },
    FileOptionClicked: function (event) {
      //activer quand un item du ContextMenu est cliqué
      //console.log("Event: ", event);
      console.log(event.option.action, event.item.name);
    },
    renameFile: function (item) {
      console.log(" rename", item);
    },
    deleteFile: function (item) {
      console.log(" delete", item);
    },
    diableRightClick: function (e) {
      //fonction pour desaciver le clique droit sur le reste de l'arbre
      e.preventDefault();
    },
    createNewFile: function(){
      this.showModal = true;
    }
  },
  data: () => ({
    icons: {
      //file icons
      html: "mdi-language-html5",
      js: "mdi-nodejs",
      json: "mdi-code-json",
      md: "mdi-language-markdown",
      pdf: "mdi-file-pdf",
      png: "mdi-file-image",
      txt: "mdi-file-document-outline",
      xls: "mdi-file-excel",
      java: "mdi-coffee",
      cpp: "mdi-language-cpp",
      py: "mdi-language-python",
      php: "mdi-language-php"
    },
    fileOptions: [
      //contextMenu options
      { name: "Open", action: "open" },
      { name: "Rename", action: "rename" },
      { name: "Delete", action: "delete" }
    ],

    showModal: false,
  })
};
</script>
