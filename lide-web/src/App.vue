<template>
  <v-app>
    <AppBar />
    <v-main app>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "./components/appbar/AppBar";

export default {
  name: "App",

  components: {
    AppBar,
  },

  data: () => ({}),
};
</script>

<style>
html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
