<template>
  <div>
    <v-divider></v-divider>
    <div style="height: 100px" align="center">
      <v-btn
        @click="createNewProject"
        style="
          background-color: #3caee9;
          width: 50%;
          margin-top: 30px;
          font-size: 0.73vw;
        "
        >Nouveau Projet</v-btn
      >
    </div>

    <NewProjectModal v-model="showModal"></NewProjectModal>
  </div>
</template>

<script>
import NewProjectModal from "./modalNewProject.vue"

export default {
  name: "ExplorerFooter",

  components: {
    NewProjectModal
  },
  data: () => ({
    showModal: false,
  }),

  methods: {
    createNewProject: function () {
      this.showModal = true;
    },
  },
};
</script>
