<template>
	<v-row class="parent-editor">
		<v-col cols="12" class="pa-0">
			<v-tabs class="tabs" dark v-model="currentTabIndex">
				<v-tab
					v-for="(tab, index) in tabs"
					:key="index"
					:ref="'tab' + tab.id"
					@click="focusTab(tab.id)"
					px-0
				>
					{{ tab.file.filename + tab.file.extension }}
					<v-btn
						class="btn-close-tab"
						x-small
						icon
						elevation="4"
						v-on:click.stop
						@click="closeTab(tab.id)"
					>
						<v-icon dark>mdi-close</v-icon>
					</v-btn>
				</v-tab>
			</v-tabs>

			<v-tabs-items v-model="currentTabIndex" style="position: absolute">
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
							@ready="onNewEditor('cmEditor-' + tab.id, tab.id)"
						/>
					</v-col>
				</v-tab-item>
			</v-tabs-items>

			<v-card :height="codemirrorHeight" tile color="body"></v-card>

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
								@click="saveTab()"
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
								@click="exec()"
							>
								<v-icon dark>mdi-play</v-icon>
							</v-btn>
						</template>
						<span>Exécuter</span>
					</v-tooltip>
				</div>
			</div>
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
// import theme style
import "codemirror/theme/base16-dark.css";
// import base style
import "codemirror/lib/codemirror.css";

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
				tabSize: 4,
				indentUnit: 4,
				indentWithTabs: true,
				lineWrapping: false,
				mode: "text/x-c++src",
				theme: "base16-dark",
				line: true,
				viewportMargin: Infinity,
				readOnly: false,
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
			tabToCloseId: null,
		};
	},
	computed: {
		...mapState({
			tabs: (state) => state.tab.tabs,
			currentTab: (state) => state.tab.currentTab,
		}),
		currentTabIndex: {
			get() {
				const index = this.tabs.findIndex(
					(tab) => tab.id == this.currentTab.id
				);
				if (index != null) {
					console.log("CURRENT INDEX = " + index);
					return index;
				} else {
					console.log("CURRENT INDEX = " + 0);
					return 0;
				}
			},
			set(val) {
				return val;
			},
		},
	},
	methods: {
		// Méthode appelée au clic sur un onglet
		async focusTab(tabId) {
			await this.$store.dispatch("tab/focusTab", tabId);
			this.setEditorSize("cmEditor-" + tabId);
		},

		// Sauvegarde l'onglet ouvert
		async saveTab() {
			await this.$store
				.dispatch("tab/saveTab", this.currentTab)
				.catch((error) => {
					console.log(error);
					// TODO : message erreur
				});
		},

		// Ferme un onglet
		closeTab(tabId) {
			this.tabToCloseId = tabId;
			this.$store
				.dispatch("tab/closeTab", { tabId: tabId, force: false })
				.catch((error) => {
					if (error.message == "FILE_NOT_SAVED") {
						this.dialogFileNotSaved = true;
					}
				});
		},

		// Méthode appelée par le formulaire de sauvegarde en cas de fermeture d'un onglet lorsque son fichier n'est pas sauvegardé
		async saveBeforeClose(save) {
			if (save) await this.saveTab();
			await this.$store
				.dispatch("tab/closeTab", { tabId: this.tabToCloseId, force: true })
				.catch((error) => {
					if (error.message == "FILE_NOT_SAVED") {
						this.dialogFileNotSaved = true;
					}
				});
			this.tabToCloseId = null;
			this.dialogFileNotSaved = false;
		},

		async exec() {
			await this.saveTab();
			FileService.execute(this.currentTab.file._id)
				.then((res) => {
					this.$root.$refs.Terminal.openSocket(res.data.containerid);
				})
				.catch((error) => {
					this.$store.dispatch("notification/notif", {
						texte: error,
						couleur: "error",
						timeout: 2000,
					});
				});
		},

		// Méthode appelée lors de l'instantiation d'un nouvel editor
		onNewEditor(cmEditor, tabId) {
			console.log("ON NEW EDITOR");

			this.setEditorSize(cmEditor);
			this.$store
				.dispatch("tab/setEditor", { tabId: tabId, cmEditor: cmEditor })
				.catch((error) => {
					// TODO : Notif
					console.error(error);
				});
			try {
				let codemirror = this.$refs[cmEditor][0].codemirror;
				let tab = this.tabs.find((tab) => tab.id === tabId);
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
			} catch (error) {
				// Garde-fou du cycle de vie vuejs (destruction des codemirror au reload)
			}
		},

		// Défini la taille d"une instance codemirror à partir de sa ref
		setEditorSize(cmEditor) {
			this.codemirrorHeight = (window.innerHeight - 56 - 48 - 20) * (70 / 100);
			try {
				let codemirror = this.$refs[cmEditor][0].codemirror;
				codemirror.setSize("100%", this.codemirrorHeight);
			} catch (error) {
				// Garde-fou du cycle de vie vuejs (destruction des codemirror au reload)
			}
		},

		manageKeydowns(key) {
			// si CTRL + S --> sauvegarde du fichier
			if (key.ctrlKey && key.keyCode === 83) {
				this.saveTab();
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
		this.codemirrorHeight = (window.innerHeight - 56 - 48 - 20) * (70 / 100);
	},
	mounted() {
		document.addEventListener("keydown", this.manageKeydowns);
	},
	beforeDestroy() {
		document.removeEventListener("keydown", this.manageKeydowns);
	},
	destroyed() {
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
	top: 65px;
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
