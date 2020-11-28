<template>
  <v-navigation-drawer ref="drawer" id="explorer" absolute width="15.5%">
    <div v-for="(project, index) in this.$store.getters.projects" v-bind:key="index">
      <ProjectTree :projectName="project.projectname" :files="project.files"></ProjectTree>
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
    ExplorerFooter
  },
  props: {
    avatar: String,
    name: String,
    projectsFolder: String
  },

  data() {
    return {
      projectList: []
    };
  },

  methods: {
    loadTree: function () {
      // Charge le contenu du tree view
      console.log("LOAD LIST");
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>