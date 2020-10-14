<template>
 
      <v-app>
        
        <!-- gestionnaire de l'explorer -->
        <v-navigation-drawer>
            
        </v-navigation-drawer>
        
        <!-- <v-app-bar> dans Header -->
        <Header/>

        <!-- body -->
        <v-main>    
          <v-container >
            <!-- premiere ligne editeur de text -->
            <!--pas sur qu'on ai besoin des v-col -->
              <v-row>
                <v-col>
                  <v-card>
                    <!-- component Editor -->
                    <CodeMirror/>
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

<style>
</style>