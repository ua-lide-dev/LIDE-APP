<template>
	<v-row class="parent-editor">
		<v-col cols="12" class="pa-0">
			<v-tabs
				class="tabs"
				background-color="bodysecondary"
				slider-color="primary"
				v-model="currentTabIndex"
			>
				<v-tab
					v-for="(tab, index) in tabs"
					:key="index"
					:ref="'tab' + tab.id"
					@click="focusTab(tab)"
					px-0
				>
					<v-badge
						color="primary"
						dot
						:value="tab.oldContent != tab.file.content"
					>
						{{ tab.file.filename + tab.file.extension }}
					</v-badge>
					<v-btn
						class="btn-close-tab"
						x-small
						icon
						elevation="4"
						v-on:click.stop
						@click="closeTab(tab)"
					>
						<v-icon dark>mdi-close</v-icon>
					</v-btn>
				</v-tab>
			</v-tabs>

			<v-tabs-items v-model="currentTabIndex">
				<v-tab-item
					v-for="(tab, index) in tabs"
					:key="index"
					transition="false"
				>
					<v-col cols="12" class="pa-0">
						<codemirror
							class="codemirror"
							:ref="'cmEditor-' + tab.id"
							v-model="tab.file.content"
							:options="cmOptions"
							@ready="onNewEditor('cmEditor-' + tab.id, tab)"
							@input="onCodeChange($event, tab)"
						/>
					</v-col>
					<div class="group-btn" v-show="checkIfTabOpened()">
						<div>
							<v-tooltip left>
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										class="btn-save"
										v-bind="attrs"
										v-on="on"
										absolute
										fab
										dark
										small
										color="primary"
										@click="saveTab(tab)"
									>
										<v-icon dark>mdi-content-save-outline</v-icon>
									</v-btn>
								</template>
								<span>Sauvegarder</span>
							</v-tooltip>
						</div>
						<div>
							<v-tooltip left>
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										class="btn-compile"
										v-bind="attrs"
										v-on="on"
										absolute
										fab
										dark
										small
										color="green"
										@click="exec(tab)"
									>
										<v-icon dark>mdi-play</v-icon>
									</v-btn>
								</template>
								<span>Exécuter</span>
							</v-tooltip>
						</div>
					</div>
				</v-tab-item>
			</v-tabs-items>

			<v-card v-if="tabs.length === 0" :height="codemirrorHeight" tile>
			</v-card>
		</v-col>

		<v-dialog v-model="dialogFileNotSaved" max-width="500">
			<v-card>
				<v-card-title class="title">Fichier non sauvegardé !</v-card-title>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="red darken-1"
						small
						outlined
						@click="saveBeforeClose(false)"
						>Fermer sans sauvegarder</v-btn
					>
					<v-btn
						color="green darken-1"
						small
						outlined
						@click="saveBeforeClose(true)"
						>Sauvegarder et fermer</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import { codemirror } from "vue-codemirror";

// import languages
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/python/python.js";
// active line
import "codemirror/addon/selection/active-line.js";
// auto close backets
import "codemirror/addon/edit/closebrackets.js";
// basic auto-complete
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/anyword-hint.js";
// highlight mathcin brackets
import "codemirror/addon/edit/matchbrackets.js";
// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";
// autocomplete
import "codemirror/addon/hint/show-hint.js";
// import base style
import "codemirror/lib/codemirror.css";
// import theme style
import "codemirror/theme/3024-day.css";
import "codemirror/theme/3024-night.css";
import "codemirror/theme/abcdef.css";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/ayu-dark.css";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/bespin.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/cobalt.css";
import "codemirror/theme/colorforth.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/duotone-dark.css";
import "codemirror/theme/duotone-light.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/erlang-dark.css";
import "codemirror/theme/gruvbox-dark.css";
import "codemirror/theme/hopscotch.css";
import "codemirror/theme/icecoder.css";
import "codemirror/theme/isotope.css";
import "codemirror/theme/lesser-dark.css";
import "codemirror/theme/liquibyte.css";
import "codemirror/theme/lucario.css";
import "codemirror/theme/material.css";
import "codemirror/theme/material-darker.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/theme/mbo.css";
import "codemirror/theme/mdn-like.css";
import "codemirror/theme/midnight.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/moxer.css";
import "codemirror/theme/neat.css";
import "codemirror/theme/neo.css";
import "codemirror/theme/night.css";
import "codemirror/theme/nord.css";
import "codemirror/theme/oceanic-next.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/theme/paraiso-dark.css";
import "codemirror/theme/paraiso-light.css";
import "codemirror/theme/pastel-on-dark.css";
import "codemirror/theme/railscasts.css";
import "codemirror/theme/rubyblue.css";
import "codemirror/theme/seti.css";
import "codemirror/theme/shadowfox.css";
import "codemirror/theme/solarized.css";
import "codemirror/theme/the-matrix.css";
import "codemirror/theme/tomorrow-night-bright.css";
import "codemirror/theme/tomorrow-night-eighties.css";
import "codemirror/theme/ttcn.css";
import "codemirror/theme/twilight.css";
import "codemirror/theme/vibrant-ink.css";
import "codemirror/theme/xq-dark.css";
import "codemirror/theme/xq-light.css";
import "codemirror/theme/yeti.css";
import "codemirror/theme/idea.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/yonce.css";
import "codemirror/theme/zenburn.css";

import FileService from "@/services/file-service";
import { mapState } from "vuex";

export default {
	components: {
		codemirror,
	},
	data() {
		return {
			code: "",
			cmOptions: {
				// TODO : Configurer dans les paramètres utilisateur
				indentWithTabs: true,
				lineWrapping: false,
				line: true,
				viewportMargin: Infinity,
				lineNumbers: true,
				autoCloseBrackets: true,
				matchBrackets: true,
				styleActiveLine: true,
				foldGutter: true,
				gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
				showHint: true,
			},
			codemirrorHeight: 0,
			dialogFileNotSaved: false,
			tabToClose: null,
		};
	},
	computed: {
		...mapState({
			tabs: (state) => state.tab.tabs,
			currentTab: (state) => state.tab.currentTab,
			editorTheme: (state) => state.settings.theme,
			indentation: (state) => state.settings.indentation,
		}),
		currentTabIndex: {
			get() {
				const index = this.tabs.findIndex(
					(tab) => tab.id == this.currentTab.id
				);
				if (index != null) return index;
				else return 0;
			},
			set(val) {
				return val;
			},
		},
	},
	watch: {
		editorTheme: function (val, oldVal) {
			let codemirror = this.$refs[this.currentTab.cmEditor][0].codemirror;
			codemirror.setOption("theme", val);
		},
		indentation: function (val, oldVal) {
			let codemirror = this.$refs[this.currentTab.cmEditor][0].codemirror;
			codemirror.setOption("indentUnit", val);
			codemirror.setOption("tabSize", val);
		},
	},
	methods: {
		// Méthode appelée au clic sur un onglet
		async focusTab(tab) {
			await this.$store.dispatch("tab/focusTab", tab);
			this.setEditorSize(tab.cmEditor);
			this.setEditorSettings(tab);
		},

		// Sauvegarde l'onglet ouvert
		async saveTab(tab) {
			await this.$store.dispatch("tab/saveTab", tab).catch((error) => {
				this.$store.dispatch("notification/notif", {
					texte: "Une erreur est survenue lors de la sauvegarde du fichier.",
					couleur: "error",
				});
			});
		},

		// Ferme un onglet
		async closeTab(tab) {
			await this.focusTab(tab);
			// si le code a été modifié depuis le chargement bdd, on affiche le formulaire de sauvegarde
			if (tab.oldContent != tab.file.content) {
				this.tabToClose = tab;
				this.dialogFileNotSaved = true;
			} else this.$store.dispatch("tab/closeTab", tab);
		},

		// Méthode appelée par le formulaire de sauvegarde en cas de fermeture d'un onglet lorsque son fichier n'est pas sauvegardé
		async saveBeforeClose(save) {
			if (save) await this.saveTab(this.tabToClose);
			await this.$store.dispatch("tab/closeTab", this.tabToClose);
			this.tabToClose = null;
			this.dialogFileNotSaved = false;
		},

		// Appelée par le bouton d'exécution
		async exec(tab) {
			await this.saveTab(tab);
			FileService.execute(tab.file._id)
				.then((res) => {
					this.$root.$refs.Terminal.openSocket(res.data.containerid);
				})
				.catch((error) => {
					this.$store.dispatch("notification/notif", {
						texte: "Une erreur est survenue lors de la compilation.",
						couleur: "error",
					});
				});
		},

		// Méthode appelée lors de l'instantiation d'un nouvel editor
		onNewEditor(cmEditorRef, tab) {
			this.setEditorSize(cmEditorRef);
			this.$store
				.dispatch("tab/setEditor", { tab: tab, cmEditor: cmEditorRef })
				.catch((error) => {
					this.$store.dispatch("notification/notif", {
						texte: "Une erreur est survenue lors de l'ouverture du fichier",
						couleur: "error",
					});
				})
				.then(() => this.setEditorSettings(tab));
		},

		// en cas d'input dans l'éditeur, on modifier le contenu du fichier associé (pas de sauvegarde bdd)
		onCodeChange(newCode, tab) {
			this.$store.dispatch("tab/setNewContent", {
				tab: tab,
				newContent: newCode,
			});
		},

		// Défini le type de langage de l'éditeur à partir de sa ref et de l'id de sa tab
		setEditorSettings(tab) {
			try {
				let codemirror = this.$refs[tab.cmEditor][0].codemirror;
				switch (tab.file.extension) {
					case ".cpp":
						codemirror.setOption("mode", "text/x-c++src");
						break;
					case ".h":
						codemirror.setOption("mode", "text/x-c++src");
						break;
					case ".py":
						codemirror.setOption("mode", "text/x-python");
						break;
					case ".java":
						codemirror.setOption("mode", "text/x-java");
						break;
					default:
						break;
				}
				codemirror.setOption("theme", this.editorTheme);
				codemirror.setOption("indentUnit", this.indentation);
				codemirror.setOption("tabSize", this.indentation);
			} catch (error) {
				// Garde-fou du cycle de vie vuejs (destruction des codemirror au reload)
			}
		},

		// Défini la taille d"une instance codemirror à partir de sa ref
		setEditorSize(cmEditorRef) {
			this.codemirrorHeight = (window.innerHeight - 56 - 48 - 20) * (70 / 100);
			try {
				let codemirror = this.$refs[cmEditorRef][0].codemirror;
				codemirror.setSize("100%", this.codemirrorHeight);
			} catch (error) {
				// Garde-fou du cycle de vie vuejs (destruction des codemirror au reload)
			}
		},

		manageKeydowns(key) {
			// si CTRL + S --> sauvegarde du fichier
			if (key.ctrlKey && key.keyCode === 83) {
				this.saveTab(this.currentTab);
				// on empeche le comportement par défaut
				key.preventDefault();
			}
			// on sort de la fonction --> comportement par défaut du clavier
		},

		// check if a file is opened
		checkIfTabOpened() {
			return this.tabs.length > 0;
		},

		// Méthode appelée par le listenner de redimension de la page
		onResize() {
			this.tabs.forEach((tab) => {
				this.setEditorSize(tab.cmEditor);
			});
		},
	},
	created() {
		window.addEventListener("resize", this.onResize);
		// on pré-défini la taille de codemirror à la création (recalculée plus tard via this.onResize)
		this.codemirrorHeight = (window.innerHeight - 56 - 48 - 20) * (70 / 100);
		// récupération du focus après un reload.
		if (this.currentTab != null) this.focusTab(this.currentTab);
	},
	mounted() {
		document.addEventListener("keydown", this.manageKeydowns);
	},
	beforeDestroy() {
		document.removeEventListener("keydown", this.manageKeydowns);
	},
	destroyed() {
		// listenner de redimension
		window.removeEventListener("resize", this.onResize);
	},
};
</script>

<style scoped>
.codemirror {
	width: 100%;
}
.v-tab {
	text-transform: none !important; /* tab name to lowercase */
}
.group-btn {
	top: 20px;
	right: 60px;
	position: absolute;
}
.btn-compile {
	margin-top: 50px;
}
.text-custom {
	text-transform: none;
}
.btn-close-tab {
	margin-left: 20px;
}
</style>
