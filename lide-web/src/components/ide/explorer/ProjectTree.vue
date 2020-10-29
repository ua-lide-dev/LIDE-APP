<template>
  <div style="margin: 10px" @contextmenu="diableRightClick($event)">
    <h3 style="user-select: none" align="center">{{ projectName }}</h3>
    <template>
      <v-treeview
        :items="items"
        activatable
        item-key="name"
        open-on-click
        transition
      >
        <template slot="label" slot-scope="{ item }">
          <!-- evenement click sur le titre de l'item  -->
          <div @contextmenu="filesMenu($event, item)" @click="openFile(item)">
            {{ item.name }}
          </div>
        </template>

        <template v-slot:prepend="{ item, open }">
          <!-- icon du fichier/dossier -->
          <div @contextmenu="filesMenu($event, item)" @click="openFile(item)">
            <!-- evenement click sur l'icone de l'item  -->

            <v-icon v-if="!item.file"
              ><!-- icon de dossier -->
              {{ open ? "mdi-folder-open" : "mdi-folder" }}
            </v-icon>
            <v-icon v-else>
              {{ icons[item.file] }}
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
    </VueSimpleContextMenu -->
    ><!--invisible to start, will appear when needed -->
  </div>
</template>

<script>
// import VueSimpleContextMenu from "./Vue-simple-context-menu";

export default {
  name: "ProjectTree",
  // components: {
  //   VueSimpleContextMenu,
  // },
  props: {
    projectName: String,
    path: String,
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
    },
    fileOptions: [
      //contextMenu options
      { name: "Open", action: "open" },
      { name: "Rename", action: "rename" },
      { name: "Delete", action: "delete" },
    ],
    //tree: [],
    items: [
      {
        name: ".git",
      },
      {
        name: "node_modules",
      },
      {
        name: "public",
        children: [
          {
            name: "static",
            children: [
              {
                name: "logo.png",
                file: "png",
              },
            ],
          },
          {
            name: "favicon.ico",
            file: "png",
          },
          {
            name: "index.html",
            file: "html",
          },
        ],
      },
      {
        name: ".gitignore",
        file: "txt",
      },
      {
        name: "babel.config.js",
        file: "js",
      },
      {
        name: "package.json",
        file: "json",
      },
      {
        name: "README.md",
        file: "md",
      },
      {
        name: "vue.config.js",
        file: "js",
      },
      {
        name: "yarn.lock",
        file: "txt",
      },
      {
        name: ".gitignore",
        file: "txt",
      },
      {
        name: "babel.config.js",
        file: "js",
      },
      {
        name: "package.json",
        file: "json",
      },
      {
        name: "README.md",
        file: "md",
      },
      {
        name: "vue.config.js",
        file: "js",
      },
      {
        name: "yarn.lock",
        file: "txt",
      },
      {
        name: ".gitignore",
        file: "txt",
      },
      {
        name: "babel.config.js",
        file: "js",
      },
      {
        name: "package.json",
        file: "json",
      },
      {
        name: "README.md",
        file: "md",
      },
      {
        name: "vue.config.js",
        file: "js",
      },
      {
        name: "yarn.lock",
        file: "txt",
      },
    ],
  }),
};
</script>
