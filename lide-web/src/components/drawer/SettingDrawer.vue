<template>
	<!-- Drawer Setting -->
	<v-navigation-drawer
		class="drawer-setting"
		v-model="settingDrawer"
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
			:items="themes"
			dense
			outlined
			label="Thème de l'éditeur"
		></v-select>
	</v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "SettingDrawer",
	data() {
		return {
			darkmode: false,
			indentation: 4,
			themes: [
				"default",
				"3024-day",
				"3024-night",
				"abcdef",
				"ambiance",
				"ayu-dark",
				"ayu-mirage",
				"base16-dark",
				"base16-light",
				"bespin",
				"blackboard",
				"cobalt",
				"colorforth",
				"darcula",
				"dracula",
				"duotone-dark",
				"duotone-light",
				"eclipse",
				"elegant",
				"erlang-dark",
				"gruvbox-dark",
				"hopscotch",
				"icecoder",
				"idea",
				"isotope",
				"lesser-dark",
				"liquibyte",
				"lucario",
				"material",
				"material-darker",
				"material-palenight",
				"material-ocean",
				"mbo",
				"mdn-like",
				"midnight",
				"monokai",
				"moxer",
				"neat",
				"neo",
				"night",
				"nord",
				"oceanic-next",
				"panda-syntax",
				"paraiso-dark",
				"paraiso-light",
				"pastel-on-dark",
				"railscasts",
				"rubyblue",
				"seti",
				"shadowfox",
				"solarized dark",
				"solarized light",
				"the-matrix",
				"tomorrow-night-bright",
				"tomorrow-night-eighties",
				"ttcn",
				"twilight",
				"vibrant-ink",
				"xq-dark",
				"xq-light",
				"yeti",
				"yonce",
				"zenburn",
			],
		};
	},
	computed: {
		...mapState({
			settingDrawer: (state) => state.drawer.settingDrawer,
		}),
	},
	methods: {
		closeDrawerSetting: function () {
			this.$store.dispatch("drawer/closeSettingDrawer");
		},
	},
};
</script>

<style scoped>
</style>