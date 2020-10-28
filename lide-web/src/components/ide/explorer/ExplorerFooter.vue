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
					font-size: 0.8vw;
				"
        >New Project</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ExplorerFooter",

  methods: {
    createNewProject: function() {
      console.log("Create new project");
    },
  },
};
</script>
