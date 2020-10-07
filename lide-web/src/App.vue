<template>
	<v-app>
		<v-main>
      <Explorer></Explorer>  
    </v-main>
	</v-app>
</template>

<script>
	import Explorer from "./components/explorer.vue";

	export default {
		name: "App",

		components: {
      Explorer,
    },

		data: () => ({}),
	};
</script>
