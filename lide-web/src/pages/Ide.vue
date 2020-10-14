<template>
 
      <v-app>
        <v-navigation-drawer>
            
        </v-navigation-drawer>
       <Header/>
      <!-- gestionnaire de l'explorer -->
        

        <!-- body -->
        <v-main>   
          <!-- gestionnaire de l'explorer -->   
          <v-container >
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
      </v-app>
        
</template>

<script>
import Header from "../components/appBar/Header"
export default {
  name: "Ide",

  components: {
    Header,
    },

  data: () => ({})
};
</script>

<style>
</style>