<template>
	<div class="text-center">
		<v-snackbar
			v-model="snackbarStatus"
			top
			timeout="3000"
			:color="couleur"
			@input="(v) => v || close()"
		>
			{{ text }}
			<template v-slot:action="{ attrs }">
				<v-btn icon v-bind="attrs" @click="close"
					><v-icon>mdi-close</v-icon></v-btn
				>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	computed: {
		...mapState({
			snackbar: (state) => state.notification.actif,
			text: (state) => state.notification.texte,
			couleur: (state) => state.notification.couleur,
		}),
		snackbarStatus: {
			get() {
				return this.snackbar;
			},
			set(value) {
				return value;
			},
		},
	},
	methods: {
		close: function () {
			this.$store.dispatch("notification/closeNotif");
		},
	},
};
</script>