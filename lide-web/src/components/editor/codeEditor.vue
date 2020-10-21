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
import { codemirror } from "vue-codemirror";
//require style
import "codemirror/lib/codemirror.css";

// component
export default {
  components: {
    codemirror
  }
}
</script>