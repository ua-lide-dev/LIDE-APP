<template>
	<v-app>
		<v-main>
      <Explorer></Explorer>  
    </v-main>
	</v-app>
</template>

<script>
	import Explorer from "./components/Explorer.vue";

	export default {
		name: "App",

		components: {
      Explorer,
    },

		data: () => ({}),
	};
</script>
