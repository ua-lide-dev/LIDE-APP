<template>
	<v-app>
		<AppBar />
		<Explorer />
		<v-main >
			<v-container fluid>
				<v-row>
					<v-col cols="12">
						<Editor />
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" class="px-0 pb-0">
						<v-card 
							class="white--text pl-1 terminal-title" 
							color="bodysecondary" 
							width="100%" 
							height="18" tile>
								TERMINAL

						</v-card>
					</v-col>
					<v-col cols="12" class="pa-0">
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

.terminal-title {
	font-weight: bold;
	font-size: 0.775rem;
	letter-spacing: 0.1rem;
}
.drawer-setting {
	z-index: 10;
}
</style>
