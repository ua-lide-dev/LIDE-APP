<template>
	<v-navigation-drawer app fixed dark floating>
		<HeaderExplorer />
		<v-divider></v-divider>	
		<TreeviewExplorerTest />
	</v-navigation-drawer>
</template>

<script>
import HeaderExplorer from "./HeaderExplorer";
import TreeviewExplorer from "./TreeviewExplorer";
import FooterExplorer from "./FooterExplorer";

import TreeviewExplorerTest from "./TreeviewExplorerTest";

export default {
	name: "Explorer",

	components: {
		HeaderExplorer,
		//TreeviewExplorer,
		//FooterExplorer,
		TreeviewExplorerTest
	},
};
</script>

<style scoped>
.parent-explorer {
	height: 100vh;
}
</style>