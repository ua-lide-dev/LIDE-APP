<template>
    <v-dialog
      v-model="show"
      persistent
      max-width="500"
      max-height="500"
    >

      <v-card>

        <v-card-title class="headline">
          Nouveau Projet

          <v-btn
            color="red darken-1"
            text
            @click="closeMenu"
            style="position: absolute; right: 3%;"
          >
            Annuler
          </v-btn>
        </v-card-title>
        
        <v-text-field
            outlined
            id="project_title_input"
            v-model="title_input"
            placeholder = "Nom de projet"
            style="margin-left:5%; margin-right:5%; margin-top:5%"
          >
          </v-text-field>

        <v-card-actions>

          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="creatNewProject"
          >
            Accepter
          </v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>


<script>
//            placeholder = "Nom de Projet"

    export default {
        name: "ModalNewProject",

        components: {

        },
        props: {
            value: Boolean
        },
        data: () => ({
            showModal: false,
            title_input: "",
        }),
        methods: {
            closeMenu : function(){
                this.show =  false;
                this.title_input = "";
            },
            creatNewProject : function(){
                var title = document.getElementById("project_title_input").value;
                if(title == ""){
                    alert("Le nom de projet ne peut pas être vide.")
                }
                else{
                    console.log(title);
                    //apl au store pou l'action
                    this.$store.dispatch('createProject',title).then(() => {
                        this.$store.dispatch('getProjects', this.$store);
                    });
                    this.closeMenu();
                }
                
            }
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












