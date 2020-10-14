<template>
  <div class="simple-editor">
    <div class="editor">
      <vue-codemirror v-model="code" :options="editorOpts"></vue-codemirror>
      <vueCodemiiror/>
    </div>
    <div class="preview">
      <pre v-html="code"></pre>
    </div>
  </div>
</template>

<script>
  import { createComponent } from 'vue-codemirror-component'
  
  const vueCodemiiror = createComponent({
    loadTheme(theme) {
      return import('codemirror/theme/' + theme + '.css')
    },
    loadMode(mode) {
      return import(`app/src/node_modules/${mode}/${mode}.js`)
    }
  })

  export default {
    components: {
      vueCodemiiror
    },
    data () {
      return {
        code: '<h1>V-Codemirror</h1>',
        editorOpts: {
          mode: 'text/html'
        },
      }
    }
  }
</script>