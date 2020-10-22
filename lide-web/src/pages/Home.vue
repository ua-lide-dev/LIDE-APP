<template><v-app>
  <v-app-bar app color="blue">
    <Header/>
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main class="py-9">

    <!-- Provides the application the proper gutter -->
    <v-container fluid >
      <Body/>
    </v-container>
  </v-main>

  <v-footer app color="blue">
    <Footer/>
  </v-footer>
</v-app>
</template>

<script>
 import Header from "../components/header"
 import Body from "../components/body"
import Footer from "../components/footer"
export default {
  name: "App",

  components: {
    Header,
     Body,
     Footer
    },

  data: () => ({})
};
</script>

<style>
</style>