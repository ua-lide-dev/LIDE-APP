<template>
	<v-app>
		<v-app-bar height="56" elevation="1" clipped-left flat app>
			<v-app-bar-nav-icon @click.stop="explorerDrawer = !explorerDrawer"></v-app-bar-nav-icon>
			<AppBar />
		</v-app-bar>
		<v-navigation-drawer v-model="explorerDrawer" clipped app fixed floating>
			<Explorer />
		</v-navigation-drawer>
		<v-main>
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
			<!-- 
				<SettingDrawer />
				<HelpDrawer /> 
			-->
		</v-main>
	</v-app>
</template>

<script>
import AppBar from "../components/appbar/AppBar";
import Explorer from "../components/explorer/Explorer";
import Editor from "../components/editor/Editor";
import Terminal from "../components/terminal/Terminal";
import ActionTerminal from "../components/terminal/ActionTerminal";
// import SettingDrawer from "../components/drawer/SettingDrawer";
// import HelpDrawer from "../components/drawer/HelpDrawer";

export default {
	name: "Ide",

	components: {
		ActionTerminal,
		AppBar,
		Explorer,
		Editor,
		Terminal,
		// SettingDrawer,
		// HelpDrawer,
	},
	data: () => ({
		explorerDrawer: null,
	}),
	created() {
		this.$store.dispatch("user/setUsername", localStorage.getItem("username"));
		this.$store.dispatch("project/fetchProjects");
	},
};
</script>

<style scoped>
.drawer-setting {
  z-index: 10;
}
</style>
