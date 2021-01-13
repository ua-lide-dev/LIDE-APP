<template>
	<v-app>
		<AppBar />
		<v-main>
			<v-container fill-height class="pa-0" fluid>
				<v-row class="parent" wrap>
					<v-col cols="12" sm="2" class="py-0">
						<Explorer />
					</v-col>
					<v-col cols="12" sm="10" class="py-0">
						<Editor />
						<Terminal />
					</v-col>
				</v-row>
			</v-container>
			<!-- <SettingDrawer />
			<HelpDrawer /> -->
		</v-main>
	</v-app>
</template>

<script>
import AppBar from "../components/appbar/AppBar";
import Explorer from "../components/explorer/Explorer";
import Editor from "../components/editor/Editor";
import Terminal from "../components/terminal/Terminal";
// import SettingDrawer from "../components/drawer/SettingDrawer";
// import HelpDrawer from "../components/drawer/HelpDrawer";

export default {
	name: "Ide",

	components: {
		AppBar,
		Explorer,
		Editor,
		Terminal,
		// SettingDrawer,
		// HelpDrawer,
	},
	created() {
		this.$store.dispatch("user/setUsername", localStorage.getItem("username"));
		this.$store.dispatch("project/fetchProjects");
	},
};
</script>

<style scoped>
.parent {
	height: 100%;
}
.drawer-setting {
	z-index: 10;
}
</style>
