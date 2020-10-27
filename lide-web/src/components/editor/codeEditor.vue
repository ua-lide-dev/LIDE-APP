<template>
<div>
  <!-- componenet code mirror -->
  <codemirror ref="cmA"
    :value="code" 
    :options="cmOption"
    @blur="onCmBlur($event)" 
    @focus="onCmFocus($event)"
    @ready="onCmReady($event)" 
    @input="onCmInput">
  </codemirror>
  <!-- les buttons pour compil et options -->
  <v-btn elevation="1" icone rounded style="position: absolute;top: 5px; right: 10px;" @click.native="buildButton()">
    <v-icon color="green">
      mdi-gavel
    </v-icon>
  </v-btn>
  <v-btn elevation="1" icone rounded style="position: absolute;top: 48px; right: 10px;" @click.native="optionButton()">
    <v-icon color="grey">
      mdi-wrench
    </v-icon>
  </v-btn>

</div>
</template>

<script>
// require component
import { codemirror } from "vue-codemirror";
//require style
import "codemirror/lib/codemirror.css";

//language javaScirpt
import 'codemirror/mode/javascript/javascript.js'
//language cpp
import 'codemirror/mode/clike/clike.js'

//theme base16-dark
import 'codemirror/theme/base16-dark.css'
//theme base16-light
import 'codemirror/theme/base16-light.css'
//theme lucario
import 'codemirror/theme/lucario.css'


// component
export default {
  
  components: {
    codemirror
  },
//options
  data: () => ({
code: '//exemple de code c++\n\n#include <iostream>\n\nint main(){\n std::cout << "Hello World!" << std::endl;\nreturn 0;\n}',
    cmOption: {
      tabSize: 4,
      styleActiveLine: true,
      lineNumbers: true,
      //pour changer les modes il suffit de changer la var mode et import les bons fichiers
      mode: 'text/x-c++src',
      //pour changer les themes il suffit de changer la var theme et import les bons fichiers
      theme: 'lucario',
      viewportMargin: 50,
    },
  }),
//methode
  methods: {
    buildButton: function(){
      //fonction associer au button de build, pour build
      alert("votre code est en buildance");
    },
    optionButton: function(){
      //fonction associer au button options
      alert("overture des options");
    },

    //methode pour code Mirror (juste des verifs pour la console)
    onCmBlur(cm) {
        console.log('cm blur!', cm)
    },
    onCmFocus(cm) {
      console.log('cm focus!', cm)
    },
    onCmReady(cm) {
      console.log('cm ready!', cm)
    },
    onCmInput(newCode) {
      this.code = newCode
    }
  },
   computed: {
      cmA() {
        return this.$refs.cmA.codemirror
      },
  },
};
</script>