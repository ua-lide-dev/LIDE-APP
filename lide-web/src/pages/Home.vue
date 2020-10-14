<template>
      <v-app>
        <v-app-bar app>
          <Header/>
        </v-app-bar>


        <!-- body -->
        <v-main>   
          
        </v-main>

        <v-footer app>
          <Footer/>
        </v-footer>
      </v-app>
</template>

<script>
import Header from "../components/appBar/Header"
import Footer from "../components/footer"
export default {
  name: "Home",

  components: {
    Header,
    Footer
    },

  data: () => ({})
};
</script>

<style>
</style>