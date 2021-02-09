<template>
  <v-app>
    <v-app-bar
      color="appbar"
      height="56"
      elevation="1"
      dark
      clipped-left
      flat
      app
    >
      <v-app-bar-nav-icon
        @click.stop="explorerDrawer = !explorerDrawer"
      ></v-app-bar-nav-icon>
      <AppBar />
    </v-app-bar>
    <v-navigation-drawer
      v-model="explorerDrawer"
      color="bodysecondary"
      clipped
      app
      fixed
    >
      <Explorer />
    </v-navigation-drawer>
    <v-main class="body">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <Editor />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="pa-0">
            <ActionTerminal />
          </v-col>
          <v-col cols="12" class="pa-0">
            <Terminal />
          </v-col>
        </v-row>
      </v-container>
      <Notification />
      <SettingDrawer />
      <HelpDrawer />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "../components/appbar/AppBar";
import Explorer from "../components/explorer/Explorer";
import Editor from "../components/editor/Editor";
import Terminal from "../components/terminal/Terminal";
import ActionTerminal from "../components/terminal/ActionTerminal";
import SettingDrawer from "../components/drawer/SettingDrawer";
import HelpDrawer from "../components/drawer/HelpDrawer";
import Notification from "../components/utils/Notification";

export default {
  name: "Ide",

  components: {
    ActionTerminal,
    AppBar,
    Explorer,
    Editor,
    Terminal,
    SettingDrawer,
    HelpDrawer,
    Notification,
  },
  data: () => ({
    explorerDrawer: null,
  }),
  created() {
    this.$store.dispatch("user/setUsername", localStorage.getItem("username"));
    this.$store.dispatch("project/fetchProjects");
    if (this.$store.state.settings.darkMode)
      this.$store.dispatch("settings/setTheme", "base16-dark");
    else this.$store.dispatch("settings/setTheme", "default");
    this.$vuetify.theme.dark = this.$store.state.settings.darkMode;
  },
};
</script>

<style scoped>
.drawer-setting {
  z-index: 10;
}
</style>
