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
            id="file_name_input"
            v-model="name_input"
            placeholder = "Nom de fichier"
            style="margin-left:5%; margin-right:5%; margin-top:5%"
          >
          </v-text-field>

          <v-select
          v-model="ext"
          :items="extentions"
          outlined
          id="extention_input"
          style="margin-left:5%; margin-right:5%; margin-top:5%"
          type="String"
          ></v-select>

        <v-card-actions>

          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="creatNewFile"
          >
            Accepter
          </v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>


<script>

    export default {
        name: "ModalNewFile",

        components: {
        },

        props: {
            value: Boolean,
            projectName: String
        },
        data: () => ({
            showModal: false,
            ext: 'cpp',
            name_input: "",
            extentions: ['cpp', 'java', 'php', 'py'],
        }),
        methods: {
            closeMenu : function(){
                this.show =  false;
                this.title_input = "";
            },
            creatNewFile : function(){
                var name = document.getElementById("file_name_input").value;
                if(name == ""){
                    alert("Le nom du fichier ne peut pas être vide.")
                }
                else{
                  console.log("ext: ", this.ext)
                  console.log(name);
                  console.log(this.projectName)
                    /*
                    //apl au store pou l'action
                    */
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












