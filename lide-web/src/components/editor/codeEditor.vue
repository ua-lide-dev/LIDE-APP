<template>
<div>
  <codemirror/>
  <v-btn elevation="1"> Compile
        <v-icon dark right>
          gavel
        </v-icon>
  </v-btn>
  <v-btn elevation="1"> Options
        <v-icon dark right>
          mdi-wrench
        </v-icon>
  </v-btn>
</div>
</template>

<script>
// require component
import { codemirror } from 'node_modules/vue-codemirror/src/codemirror.vue'
 
// require styles
import '/node_modules/codemirror/lib/codemirror.css'
  
// component
export default {
  components: {
    codemirror
  }
}
</script>