<template>
	<v-row class="parent-editor">
		<v-col cols="12" class="pa-0">
			<v-tabs class="tabs" center-active dark v-model="currentTabIndex">
				<v-tab
					v-for="tab in tabs"
					:key="tab.id"
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
			<v-tabs-items v-model="currentTabIndex">
				<v-tab-item v-for="tab in tabs" :key="tab.id">
					<v-col cols="12" class="pa-0">
						<codemirror
							class="codemirror"
							:ref="'cmEditor' + tab.id"
							v-model="tab.file.content"
							:options="cmOptions"
							@ready="onNewEditor"
						/>
						<div class="group-btn" v-show="currentFilePresent()">
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
										>
											<v-icon dark>mdi-play</v-icon>
										</v-btn>
									</template>
									<span>Exécuter</span>
								</v-tooltip>
							</div>
						</div>
					</v-col>
				</v-tab-item>
			</v-tabs-items>
		</v-col>

		<v-dialog v-model="dialogFileNotSaved" max-width="500">
			<v-card>
				<v-card-title class="title">Fichier non sauvegardé !</v-card-title>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="red darken-1" small outlined @click="forceCloseTab"
						>Fermer sans sauvegarder</v-btn
					>
					<v-btn color="green darken-1" small outlined @click="saveAndCloseTab"
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
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/clike/clike.js";

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

// services
import { mapState } from "vuex";

export default {
	components: {
		codemirror,
	},
	data() {
		return {
			editors: [],
			code: "",
			cmOptions: {
				// TODO : Configurer dans les paramaètres utilisateur
				tabSize: 2,
				indentUnit: 2,
				indentWithTabs: true,
				lineWrapping: false,
				mode: "text/x-c++src",
				theme: "base16-dark",
				line: true,
				viewportMargin: Infinity,
				readOnly: "nocursor",
				lineNumbers: false,
				autoCloseBrackets: true,
				matchBrackets: true,
				styleActiveLine: false,
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
				return 0;
			},
			set(val) {
				return val;
			},
		},
	},
	methods: {
		setSize() {
			this.codemirrorHeight = (window.innerHeight - 56 - 48 - 20) * (70 / 100);
			this.editors.forEach((editor) => {
				editor.setSize("100%", this.codemirrorHeight);
			});
		},

		onNewEditor(cmEditor) {
			this.editors.push(cmEditor);
			this.setSize();
		},

		async focusTab(tabId) {},

		async closeTab(tabId) {
			this.tabToCloseId = tabId;
			await this.$store
				.dispatch("tab/closeTab", { tabId: tabId, force: false })
				.catch((error) => {
					if (error.message == "FILE_NOT_SAVED") {
						this.dialogFileNotSaved = true;
					}
				});
		},

		async forceCloseTab() {
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

		// called on tab quit button
		async saveAndCloseTab() {
			await this.$store
				.dispatch("file/save", this.tabToCloseId)
				.then(() => {
					this.$store.dispatch("file/unLoad", {
						fileid: this.tabToCloseId,
						force: false,
					});
				})
				.catch((error) => {
					console.log(error);
					// TODO : message erreur
				});
			this.tabToCloseId = null;
			this.dialogFileNotSaved = false;
		},

		// remove ability to type in editor if no file is opened
		onCurrentFileContentChange() {
			const currentFile = this.openedFiles.find(
				(file) => file._id == this.currentFileId
			);

			if (currentFile == null) {
				this.cmOptions.readOnly = "nocursor";
				this.cmOptions.lineNumbers = false;
				this.cmOptions.styleActiveLine = false;
			} else {
				this.cmOptions.readOnly = false;
				this.cmOptions.lineNumbers = true;
				this.cmOptions.styleActiveLine = true;
			}
		},

		// check if a file is opened
		currentFilePresent() {
			return this.currentFileId != null;
		},
	},
	created() {
		window.addEventListener("resize", this.setSize);
	},
	mounted() {
		this.setSize();
		document.addEventListener("keydown", this.doSave);
	},
	beforeDestroy() {
		document.removeEventListener("keydown", this.doSave);
	},
	destroyed() {
		window.removeEventListener("resize", this.setSize);
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
