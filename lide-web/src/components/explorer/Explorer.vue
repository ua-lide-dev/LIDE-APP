<template>
	<div class="parent-explorer">
		<HeaderExplorer />
		<TreeviewExplorer />
		<FooterExplorer />
	</div>
</template>

<script>
import HeaderExplorer from "./HeaderExplorer";
import TreeviewExplorer from "./TreeviewExplorer";
import FooterExplorer from "./FooterExplorer";

export default {
	name: "Explorer",

	components: {
		HeaderExplorer,
		TreeviewExplorer,
		FooterExplorer,
	},

	data: () => ({}),
};
</script>

<style scoped>
.parent-explorer {
	height: 100%;
}
</style>