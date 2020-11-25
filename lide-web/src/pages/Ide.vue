<template>
  <v-container class="pa-0" fluid>
    <v-row>
      <!-- Explorer -->
      <v-col class="" cols="2">
        <Explorer />
      </v-col>

      <!-- Editeur et Terminal-->
      <v-col class="pa-0" cols="10">
        <v-row>
          <v-col class="pa-0" cols="12">
            <Editor />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="pa-0" cols="12">
            <Terminal />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Editor from "../components/ide/editor/Editor";
import Explorer from "../components/ide/explorer/Explorer";
import Terminal from "../components/ide/terminal/Terminal";

export default {
  name: "Ide",

  components: {
    Editor,
    Explorer,
    Terminal
  },

  data: () => ({}),

  created: function(){
    console.log("created");
    this.$store.dispatch('getProjects',this.$store.getters.username);
  },
  beforeCreate: function(){
    console.log('before created');
  },
  updated: function(){
    console.log('update');
  }
};
</script>
<style scoped>
</style>