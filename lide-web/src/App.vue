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
