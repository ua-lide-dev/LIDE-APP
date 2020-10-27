<template>
 
      <v-app>
        <Header/>
        <!-- gestionnaire de l'explorer -->
        <v-navigation-drawer app>
            
        </v-navigation-drawer>
        
        <!-- <v-app-bar> dans Header -->


        <!-- body -->
        <v-main> 
           <v-container fluid class="pa-0 ma-0">
            <!-- premiere ligne editeur de text -->
            <!--pas sur qu'on ai besoin des v-col -->
            <v-row no-gutters>
              <v-col md="12" rows="10">
                <v-card style="height: 65vh">
                  <!-- component Editor -->
                  <CodeMirror/>
                </v-card>
              </v-col>
            </v-row>
            <!-- deuxieme ligne terminal -->
            <v-row no-gutters>
                <v-col rows="3">
                  <v-card style="height: 28vh; background-color: black;">
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
import CodeMirror from "../components/editor/codeEditor"

export default {
  name: "Ide",

  components: {
    Header,
    CodeMirror
    },

  data: () => ({})
};
</script>