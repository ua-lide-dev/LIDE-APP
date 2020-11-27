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
            createNewFile : function(){
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

                var code = "";
                if(this.ext == "cpp"){
                  code = '#include<iostream>\n\nint main(){\n std::cout<<"Hello World !"<<std::cin;\n return 0;\n}';
                }
                if(this.ext == "java"){
                  code = 'public class LE_NOM_DE_LA_CLASS {\n public static void main(String[] arg){\n  System.out.println("Hello world !");\n }\n}';
                }
                if(this.ext == "php"){
                  code = '<?php echo "Hello World !"; ?>';
                }
                if(this.ext == "py"){
                  code = 'print("Hello Wordl !")';
                }

                const obj = {
                  content : code,
                  filename : name,
                  projectname : this.projectName,
                  extension : this.ext
                };

                console.log(obj);
                this.$store.dispatch('createFile', obj)
                .then( () => {
                  console.log("Creation de de fichier grace au bouton du project");
                  this.$store.dispatch('getProjects');
                });
                
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












