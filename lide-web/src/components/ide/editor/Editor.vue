<template>
  <div class="pos-relative">
    <div>

      <v-tabs 
      id="tabs"
      v-model="activeFile"
      >
        <v-tab
          v-for="(file, index) in this.$store.getters.tabs"  v-bind:key="index"
          @click="loadTab(index)"
          >
          {{file.filename}}.{{file.extension}}
          <v-btn 
            outlined
            x-small
            @click="quitTab(index)"
            v-on:click.stop
            style="margin-left:40px;">
            x
          </v-btn>
        </v-tab>
      </v-tabs>

    

        <!-- component code mirror -->
            <codemirror
              v-model="code"
              ref="cmA"
              :options="cmOption"
              @blur="onCmBlur($event)"
              @focus="onCmFocus($event)"
              @ready="onCmReady($event)"
              @input="onCmInput"
              id="cmirror"
            ></codemirror>
      
    </div>
      

    <!-- les buttons pour compil et options -->

    <v-btn class="btn-compile" absolute fab dark medium color="green">
      <v-icon dark>mdi-play</v-icon>
    </v-btn>
    <v-btn class="btn-save" absolute fab dark medium color="blue">
      <v-icon dark>mdi-floppy</v-icon>
    </v-btn>
    <v-btn class="btn-setting" absolute fab dark medium color="grey" @click="showMenuOptions = true">
      <v-icon dark>mdi-wrench</v-icon>
    </v-btn>
    <OptionsMenu v-model="showMenuOptions"></OptionsMenu>
  </div>
</template>

<script>
// require component
import { codemirror } from "vue-codemirror";
//require style
import "codemirror/lib/codemirror.css";

//language javaScirpt
import "codemirror/mode/javascript/javascript.js";
//language cpp
import "codemirror/mode/clike/clike.js";

//theme base16-dark
import "codemirror/theme/base16-dark.css";
//theme base16-light
import "codemirror/theme/base16-light.css";
//theme lucario
import "codemirror/theme/lucario.css";


import OptionsMenu from "./OptionsMenu.vue"

// component
export default {

  props:{

  },
  components: {
    codemirror,
    OptionsMenu
  },
  //options
  data: () => ({
    activeFile: 0,//index in Files of active tab

    showMenuOptions: false,

    //code: '//exemple de code c++\n\n#include <iostream>\n\nint main(){\n std::cout << "Hello World!" << std::endl;\n return 0;\n}',

    cmOption: {
      tabSize: 4,
      styleActiveLine: true,
      lineNumbers: true,
      //pour changer les modes il suffit de changer la var mode et import les bons fichiers
      mode: "text/x-c++src",
      //pour changer les themes il suffit de changer la var theme et import les bons fichiers
      theme: "lucario",
      //pour affciher un nombre de ligne infini
      viewportMargin: Infinity,
      //changer la taille
      setSize: 900,
    }
  }),
  //methode
  methods: {
    quitTab: function(index){
      this.$store.commit('SUPP_FILE_IN_TABS', index)
      
      //console.log("activeFile: ", this.activeFile);
      //console.log("index: ", index)

      if(this.activeFile == index){//current tab has been closed
        if(this.$store.getters.tabs.length == 0){//it was the last open tab
          //add example file to Files
          //this.$store.getters.tabs.push({name: 'HelloWorld.cpp', chemin: "", project: "", code: '//exemple de code c++\n\n#include <iostream>\n\nint main(){\n std::cout << "Hello World!" << std::endl;\nreturn 0;\n}'},)
        }
        else{//it wasn't the last tab open
          if(index == this.$store.getters.tabs.length){//it was the right-most
            this.activeFile -= 1;
          }
        }
      }
      else if(index < this.activeFile){//tab to the left of current tab has been closed
        this.activeFile -= 1;
      }

      this.$store.commit("SET_CURRENTFILE_FROM_INDEX", this.activeFile);

    },


    loadTab: function(index){//when a tab is clicked
          this.$store.commit("SET_CURRENTFILE_FROM_INDEX", index);
    },




    buildButton: function() {
      //fonction associer au button de build, pour build
      alert("votre code est en buildance");

      // Appeler une sauvegarde
      // Appeler le controller de compilation qui renvoit un containerid
      // this.$root.$refs.Terminal.openSocket(res.data.containerid);
    },
    optionButton: function() {
      //fonction associer au button options
      alert("overture des options");
    },
    saveButton: function() {
      //fonction associer au button save
      alert("sauvegarde ...");
    },

    //methode pour code Mirror (juste des verifs pour la console)
    onCmBlur(cm) {
      console.log("cm blur!", cm);
    },
    onCmFocus(cm) {
      console.log("cm focus!", cm);
    },
    onCmReady(cm) {
      console.log("cm ready!", cm);
    },
    onCmInput(newCode) {
      this.code = newCode;
    }
  },
  computed: {
    cmA() {
      return this.$refs.cmA.codemirror;
    },
    code: {
      get : function(){
        console.log(this.$store.getters.tabs);
        if(this.$store.getters.tabs.length > 0){
          return this.$store.getters.tabs[this.activeFile].body;
        }
        else{
          return "";
        }
      },

      set : function(newCode){
        console.log(newCode);  
        if(this.$store.getters.tabs.length > 0){
          this.$store.getters.tabs[this.activeFile].body = newCode;
        }
        //this.Files[this.activeFile].code = newCode;
      }
    },

  },/*
  mounted() {
    this.openAllFiles();
  }*/
};
</script>

<style>
.CodeMirror {
  border: 1px solid #eee;
  height: 70vh;
}

.pos-relative {
  position: relative;
}
.btn-compile {
  top: 60px;
  right: 50px;
}
.btn-save {
  top: 130px;
  right: 50px;
}
.btn-setting {
  top: 200px;
  right: 50px;
}
.v-tab {
text-transform: none !important;
}
</style>