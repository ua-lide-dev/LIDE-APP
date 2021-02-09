<template>
	<!-- Drawer Setting -->
	<v-navigation-drawer
		class="drawer-setting"
		v-model="settingDrawerStatus"
		right
		absolute
	>
		<v-card outlined tile>
			<v-row>
				<v-col cols="8">
					<h2 class="ml-5 text--secondary">Paramètres</h2>
				</v-col>
				<v-col cols="1">
					<v-btn
						class="mt-1 ml-3 text--secondary"
						@click="closeDrawerSetting"
						small
						text
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12"></v-col>
			</v-row>
		</v-card>
		<v-switch v-model="darkmode" :label="`Dark Mode`"></v-switch>
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
			darkmode: (state) => state.settings.darkmode,
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
	},
	methods: {
		closeDrawerSetting: function () {
			this.$store.dispatch("drawer/closeSettingDrawer");
		},

		setEditorTheme(value) {
			this.$store.dispatch("settings/setTheme", value);
		},

		setIndentation(value) {
			this.$store.dispatch("settings/setIndentation", value);
		},
	},
};
</script>

<style scoped>
</style>