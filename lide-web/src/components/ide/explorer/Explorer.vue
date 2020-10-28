<template>
  <v-navigation-drawer
    ref="drawer"
    id="explorer"
    :width="width"
    absolute
    permanent
    left
    dark
    @load="loadList"
  >
    <div v-for="(project, index) in projectList" v-bind:key="index">
      <ProjectTree
        :projectName="project.name"
        :path="project.path"
      ></ProjectTree>
    </div>

    <template v-slot:append height>
      <ExplorerFooter></ExplorerFooter>
    </template>
  </v-navigation-drawer>
</template>

<script>
import ProjectTree from "./ProjectTree";
import ExplorerFooter from "./ExplorerFooter";

export default {
  name: "Explorer",

  components: {
    ProjectTree,
    ExplorerFooter,
  },
  props: {
    avatar: String,
    name: String,
    projectsFolder: String,
  },

  data() {
    return {
      projectList: [
        { name: "TP1", path: "filePath" },
        { name: "TD2.1", path: "filePath" },
      ],
    };
  },

  methods: {
    loadTree: function() {
      // Charge le contenu du tree view
      console.log("LOAD LIST");
    },
  },
  mounted() {},
};
</script>
