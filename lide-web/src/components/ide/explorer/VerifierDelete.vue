<template>
    <v-dialog
      v-model="show"
      persistent
      max-width="500"
      max-height="500"
    >
      <v-card>
        <v-card-title class="headline">
          Êtes-vous sûr?
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="deleteFileOrProject"
          >
            Oui
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            @click="closeMenu"
          >
            Non
          </v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>


<script>

    export default {
        name: "VerifierDelete",

        components: {
        },

        props: {
            value: Boolean,
            type: String,
            fileName: String,
            projectName: String,
            extension : String
        },
        data: () => ({
            showModal: false,
        }),
        methods: {
          closeMenu : function(){
              this.show =  false;
          },
          deleteFileOrProject : function(){
            if (this.type == "project"){
              this.deleteProject()
              this.closeMenu()
            }
            else if(this.type == "file"){
              console.log("SECOND");
              this.deleteFile();
              this.closeMenu()
            }
          },

          deleteFile: async function() {
            var obj = {
              filename : this.fileName,
              projectname : this.projectName,
              extension: this.extension,
            }
            await this.$store.dispatch('deleteFile',obj).then( () => {
              this.$store.dispatch('getProjects');
            });
          },

          deleteProject: async function(){
            await this.$store.dispatch('deleteProject',this.projectName).then( () => {
              this.$store.dispatch('getProjects');
            });
          },
        },

        computed: {
            show: {
                get () {
                    return this.value
                },
                set (value) {
                    this.$emit('input', value)
                }
            }
        }
    }
</script>











