<template>
	<v-snackbar v-model="show" top :color="color">
		{{ msg }}

		<template v-slot:action="{ attrs }">
			<v-btn icon v-bind="attrs" @click="show = false">
				<v-icon>mdi-close-circle-outline</v-icon>
			</v-btn>
		</template>
	</v-snackbar>
</template>

<script>
export default {
	props: ["msg", "color"],
	data() {
		return {
			show: false,
		};
	},
	created() {
		this.$root.$refs.Notification = this;
	},
};
</script>

<style>
</style>