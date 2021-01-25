<template>
	<v-toolbar flat>
		<v-toolbar-title v-show="!$vuetify.breakpoint.xs" class="font-weight-bold headline">
			<v-icon class="mr-5 mt-n1" large>mdi-school</v-icon>U I D E
		</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn v-bind="attrs" v-on="on" @click="openDrawerHelp" icon>
					<v-icon>mdi-help-circle-outline</v-icon>
				</v-btn>
			</template>
			<span>Aide</span>
		</v-tooltip>
		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn v-bind="attrs" v-on="on" icon @click="openDrawerSetting">
					<v-icon>mdi-cog</v-icon>
				</v-btn>
			</template>
			<span>Paramètres</span>
		</v-tooltip>

		<v-menu offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn class="ml-10 mr-2" icon x-large v-bind="attrs" v-on="on">
					<v-avatar color="primary" :size="$vuetify.breakpoint.xs ? 38 : 48">
						<span class="white--text title">{{ initials }}</span>
					</v-avatar>
				</v-btn>
			</template>
			<v-card class="px-5">
				<v-list-item-content class="justify-center">
					<div class="mx-auto text-center">
						<v-avatar color="primary" size="48">
							<span class="white--text title">{{ initials }}</span>
						</v-avatar>
						<h3>{{ username }}</h3>
						<v-divider class="my-3"></v-divider>
						<v-btn to="/logout" depressed rounded text>Deconnexion</v-btn>
					</div>
				</v-list-item-content>
			</v-card>
		</v-menu>
	</v-toolbar>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "AppBar",
	components: {},

	data() {
		return {
			drawerSetting: null,

		};
	},
	computed: {
		...mapState({
			username: (state) => state.user.username,
		}),
		initials: function () {
			let initialsStr = this.username[0] + this.username[1];
			initialsStr = initialsStr.toUpperCase();
			return initialsStr;
		},
		explorerDrawer: {
			get() { return this.$store.state.drawer.explorerDrawer},
			set(v) { return this.$store.commit("drawer/SET_EXPLORER_DRAWER", v)}
		}

	},
	methods: {
		openDrawerSetting: function () {
			this.$store.dispatch("drawer/openSettingDrawer");
		},
		openDrawerHelp: function () {
			this.$store.dispatch("drawer/openHelpDrawer");
		},
	},
};
</script>

<style></style>
