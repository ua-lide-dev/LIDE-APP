<template>
	<div>
		<HeaderExplorer />
		<v-divider></v-divider>	
		<TreeviewExplorer />
	</div>
</template>

<script>
import HeaderExplorer from "./HeaderExplorer";
import TreeviewExplorer from "./TreeviewExplorer";

export default {
	name: "Explorer",

	components: {
		HeaderExplorer,
		TreeviewExplorer
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