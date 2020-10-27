<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
	import Home from "./pages/Home.vue"
	export default {
		name: "App",

		components: {
			Home
    },

		data: () => ({}),
	};
</script>
