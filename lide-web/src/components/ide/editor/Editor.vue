<template>
  <div class="pos-relative">
    <div>

      <v-tabs 
      id="tabs"
      >
        <v-tab
          v-for="(file, index) in openFiles"  v-bind:key="index"
          >
          {{file.name}}
          <v-btn 
            outlined
            x-small
            @click="quitTab(index)"
            style="margin-left:10px;">
            x
          </v-btn>
        </v-tab>
    

    

        <!-- component code mirror -->
          <v-tab-item 
            v-for="(file, index) in openFiles"  v-bind:key="index">
            <div>
            <codemirror
              ref="cmA"
              :value="file.code"
              :options="cmOption"
              @blur="onCmBlur($event)"
              @focus="onCmFocus($event)"
              @ready="onCmReady($event)"
              @input="onCmInput"
              id="cmirror"
            ></codemirror>
            </div>
          </v-tab-item>
      </v-tabs>
    </div>
      

    <!-- les buttons pour compil et options -->

    <v-btn class="btn-compile" absolute fab dark medium color="green">
      <v-icon dark>mdi-gavel</v-icon>
    </v-btn>
    <v-btn class="btn-save" absolute fab dark medium color="blue">
      <v-icon dark>mdi-cloud-upload</v-icon>
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
    //activeTab: 0,//index in Files of active tab
    openFiles: [],
    Files: [ //a remplacer
      {name: 'exo1.java', chemin: "TP1/exo1.java", project: "TP1", code: "class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println('Hello, World!');\n\t} \n}"},
      {name: 'exo2.java', chemin: "TP1/exo2.java", project: "TP1", code: "class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println('Hello, World again!');\n\t} \n}"}, 
      {name: 'exo3.java', chemin: "TP1/exo3.java", project: "TP1", code: "//code java 3"}, 
      {name: 'exo1.php', chemin: "TP1/exo1.php", project: "TP1", code: "<html>\n\t<head>\n\t\t<title>PHP Test</title>\n\t</head>\n\t<body>\n\t\t<?php echo '<p>Hello World</p>'; ?> \n\t</body>\n</html>"}
    ],


    showMenuOptions: false,
    
    code:
      '//exemple de code c++\n\n#include <iostream>\n\nint main(){\n std::cout << "Hello World!" << std::endl;\nreturn 0;\n}',
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
      this.openFiles.splice(index, 1);
    },
    openAllFiles: function(){
      this.openFiles = this.Files;
    },
    openFile: function(index){
      this.openFiles.push(this.Files[index]);
    },

    buildButton: function() {
      //fonction associer au button de build, pour build
      alert("votre code est en buildance");
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
  },
  mounted() {
    this.openAllFiles();
  }
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
