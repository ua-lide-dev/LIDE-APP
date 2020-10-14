<template>
    <div>
      <v-app>
        <v-app-bar app>
          <Header/>
        </v-app-bar>

        <!-- gestionnaire de l'explorer -->
        <v-navigation-drawer>
            
        </v-navigation-drawer>

        <!-- body -->
        <v-main>   
          <!-- gestionnaire de l'explorer -->   
          <v-container>
            <!-- premiere ligne editeur de text -->
            <!--pas sur qu'on ai besoin des v-col -->
              <v-row>
                <v-col>
                  <v-card>
                    <!-- component Editor -->
                  </v-card>
                </v-col>
              </v-row>

            <!-- deuxieme ligne terminal -->
            <v-row>
                <v-col>
                  <v-card>
                    <!-- component Terminal -->
                  </v-card>
                </v-col>
              </v-row>

          </v-container>
        </v-main>

        <v-footer app>
          <Footer/>
        </v-footer>
</v-app>
        
        
    </div>
</template>

<script>
import Header from "../components/appBar/Header"
import Footer from "../components/footer"
export default {
  name: "Ide",

  components: {
    Header,
    Footer
    },

  data: () => ({})
};
</script>

<style>
</style>