<template>
  <div class="pos-relative">
    <!-- componenet code mirror -->
    <codemirror
      ref="cmA"
      :value="code"
      :options="cmOption"
      @blur="onCmBlur($event)"
      @focus="onCmFocus($event)"
      @ready="onCmReady($event)"
      @input="onCmInput"
      id="cmirror"
    ></codemirror>
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
  components: {
    codemirror,
    OptionsMenu
  },
  //options
  data: () => ({
    showMenuOptions: false,
    
    code:
      '//exemple de code c++\n\n#include <iostream>\n\nint main(){\n std::cout << "Hello World!" << std::endl;\n return 0;\n}',
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
    }
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
  top: 30px;
  right: 50px;
}
.btn-save {
  top: 100px;
  right: 50px;
}
.btn-setting {
  top: 170px;
  right: 50px;
}
</style>
