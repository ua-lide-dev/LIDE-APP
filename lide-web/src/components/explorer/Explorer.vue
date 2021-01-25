<template>
	<div>
		<HeaderExplorer />
		<v-divider></v-divider>	
		<TreeviewExplorerTest />
	</div>
</template>

<script>
import HeaderExplorer from "./HeaderExplorer";
import TreeviewExplorerTest from "./TreeviewExplorerTest";

export default {
	name: "Explorer",

	components: {
		HeaderExplorer,
		TreeviewExplorerTest
	},
	computed: {
		explorerDrawer: {
			get:function() { return this.$store.state.drawer.explorerDrawer},
			set: () => null
		}
	},
};
</script>

<style scoped>

</style>