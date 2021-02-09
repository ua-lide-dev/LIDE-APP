<template>
	<!-- Drawer Setting -->
	<v-navigation-drawer
		class="drawer-setting"
		v-model="settingDrawerStatus"
		color="bodysecondary"
		right
		absolute
	>
		<v-card height="48" color="bodysecondary" outlined tile>
			<v-row>
				<v-col cols="8">
					<h2 class="ml-5 mt-2 text--secondary">Paramètres</h2>
				</v-col>
				<v-col cols="1">
					<v-btn
						class="mt-2 ml-3 text--secondary"
						@click="closeDrawerSetting"
						small
						text
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</v-card>
		<v-row justify="center">
			<v-col cols="10">
				<v-switch
					v-model="darkModeStatus"
					label="Dark Mode"
					@change="darkMode"
				></v-switch>
				<v-select
					v-model="selectedTheme"
					:items="themes"
					dense
					outlined
					label="Thème de l'éditeur"
					@change="setEditorTheme"
				></v-select>
				<v-slider
					v-model="selectedIndentation"
					color="primary"
					label="Indentation"
					min="1"
					max="10"
					thumb-label
					@change="setIndentation"
				></v-slider>
			</v-col>
		</v-row>
	</v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "SettingDrawer",
	data() {
		return {};
	},
	computed: {
		...mapState({
			settingDrawer: (state) => state.drawer.settingDrawer,
			editorTheme: (state) => state.settings.theme,
			indentation: (state) => state.settings.indentation,
			darkmode: (state) => state.settings.darkMode,
			themes: (state) => state.settings.themes,
		}),
		settingDrawerStatus: {
			get() {
				return this.settingDrawer;
			},
			set(val) {
				return val;
			},
		},
		selectedTheme: {
			get() {
				return this.editorTheme;
			},
			set(val) {
				return val;
			},
		},
		selectedIndentation: {
			get() {
				return this.indentation;
			},
			set(val) {
				return val;
			},
		},
		darkModeStatus: {
			get() {
				return this.darkmode;
			},
			set(val) {
				return val;
			},
		},
	},
	methods: {
		closeDrawerSetting: function () {
			this.$store.dispatch("drawer/closeSettingDrawer");
		},

		setDarkMode(value) {
			this.$store.dispatch("settings/setDarkMode", value);
		},

		setEditorTheme(value) {
			this.$store.dispatch("settings/setTheme", value);
		},

		setTerminalTheme(value) {
			this.$store.dispatch("settings/setTerminalTheme", value);
		},

		setIndentation(value) {
			this.$store.dispatch("settings/setIndentation", value);
		},

		darkMode() {
			this.setDarkMode((this.$vuetify.theme.dark = !this.$vuetify.theme.dark));
			if (this.$store.state.settings.darkMode) {
				this.setEditorTheme("base16-dark");
				this.setTerminalTheme("#151515");
			} else {
				this.setEditorTheme("default");
				this.setTerminalTheme("#ffffff");
			}
		},
	},
};
</script>

<style scoped>
</style>