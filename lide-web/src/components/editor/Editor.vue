<template>
	<v-row class="parent-editor">
		<v-col cols="12" class="pa-0">
			<v-tabs class="tabs" center-active dark v-model="currentTabIndex">
				<v-tab
					v-for="file in openedFiles"
					:key="file._id"
					:ref="'tab' + file._id"
					@click="focusTab(file._id)"
					px-0
				>
					{{ file.filename + file.extension }}
					<v-btn
						class="btn-close-tab"
						x-small
						icon
						elevation="4"
						v-on:click.stop
						@click="closeTab(file._id)"
					>
						<v-icon dark>mdi-close</v-icon>
					</v-btn>
				</v-tab>
			</v-tabs>
		</v-col>
		<v-col cols="12" class="pa-0">
			<codemirror
				class="codemirror"
				ref="cmEditor"
				v-model="currentFileContent"
				:options="cmOptions"
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
								color="blue"
								@click="saveFile"
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
								@click="exec"
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

import "codemirror/addon/hint/show-hint.js";

// import language js
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/php/php.js";
import "codemirror/mode/clike/clike.js";

// import theme style
import "codemirror/theme/base16-dark.css";

// import base style
import "codemirror/lib/codemirror.css";

// services
import FileService from "../../services/file-service";
import { mapState } from "vuex";

export default {
	components: {
		codemirror,
	},
	data() {
		return {
			editor: null,
			code: "",
			cmOptions: {
				tabSize: 4,
				mode: "text/x-c++src",
				theme: "base16-dark",
				lineNumbers: true,
				line: true,
				viewportMargin: Infinity,
				readOnly: "nocursor",
			},
			codemirrorHeight: 0,
			dialogFileNotSaved: false,
			fileidToClose: null,
		};
	},
	methods: {
		setSize() {
			this.codemirrorHeight = (window.innerHeight - 56 - 48 - 20) * (70 / 100);
			this.codemirror.setSize("100%", this.codemirrorHeight);
		},
		async exec() {
			await this.saveFile();
			FileService.execute(this.currentFileId)
				.then((res) => {
					this.$root.$refs.Terminal.openSocket(res.data.containerid);
				})
				.catch((error) => {
					console.error("EXECUTION : Error -> " + error);
					// TODO Notification pour avertir d'une erreur à l'utilisateur
				});
		},
		async saveFile() {
			await this.$store.dispatch("file/lightSave", this.editor.getValue());
			await this.$store
				.dispatch("file/save", this.currentFileId)
				.catch((error) => {
					// TODO Notification pour avertir d'une erreur à l'utilisateur
					console.error(error);
				});
		},
		async focusTab(fileid) {
			await this.$store.dispatch("file/lightSave", this.editor.getValue());
			this.$store.dispatch("file/load", fileid);
		},
		async closeTab(fileid) {
			this.fileidToClose = fileid;
			await this.$store.dispatch("file/lightSave", this.editor.getValue());
			await this.$store
				.dispatch("file/unLoad", { fileid: fileid, force: false })
				.then(() => {
					if (this.currentFileId != null) {
						this.$store.dispatch("file/load", this.currentFileId).then(() => {
							/** //FIXME : Suite à la suppression de l'onglet courant, le dernier onglet est sélectionné (bug)
							C'est du au fait que la barre d'onglet ne se met pas à jour avec son v-model et ne voit donc pas
							le changement de fichier courant effectué par la fonctione de suppression du store.
							TMP FIX : On simule un click vers le nouvel onglet courant afin d'éviter que le dernier onglet soit sélectionné */
							const tabId = "tab" + this.currentFileId;
							this.$refs[tabId][0].$el.dispatchEvent(new Event("click"));
						});
					}
				})
				.catch((error) => {
					if (error.message == "FILE_NOT_SAVED") {
						this.dialogFileNotSaved = true;
					}
				});
		},
		async forceCloseTab() {
			await this.$store
				.dispatch("file/unLoad", {
					fileid: this.fileidToClose,
					force: true,
				})
				.catch((error) => {
					console.log(error);
					// TODO : message erreur
				});
			this.fileidToClose = null;
			this.dialogFileNotSaved = false;
		},
		async saveAndCloseTab() {
			await this.$store
				.dispatch("file/save", this.fileidToClose)
				.then(() => {
					this.$store.dispatch("file/unLoad", {
						fileid: this.fileidToClose,
						force: false,
					});
				})
				.catch((error) => {
					console.log(error);
					// TODO : message erreur
				});
			this.fileidToClose = null;
			this.dialogFileNotSaved = false;
		},
		onCurrentFileContentChange() {
			const currentFile = this.openedFiles.find(
				(file) => file._id == this.currentFileId
			);

			if (currentFile == null) {
				this.cmOptions.readOnly = "nocursor";
			} else {
				this.cmOptions.readOnly = false;
			}
		},
		// check if a file present
		currentFilePresent() {
			return this.currentFileId != null;
		},
	},
	computed: {
		...mapState({
			currentFileId: (state) => state.file.currentFileId,
			openedFiles: (state) => state.file.openedFiles,
		}),
		currentTabIndex: {
			get() {
				const index = this.openedFiles.findIndex(
					(openedFile) => openedFile._id == this.currentFileId
				);
				if (index != null) return index;
				else return 0;
			},
			set(newTabIndex) {
				return newTabIndex;
			},
		},
		currentFileContent: {
			get() {
				try {
					this.onCurrentFileContentChange();
					return this.openedFiles.find((file) => file._id == this.currentFileId)
						.content;
				} catch (error) {
					return "";
				}
			},
			set(newContent) {
				return newContent;
			},
		},
		codemirror() {
			return this.$refs.cmEditor.codemirror;
		},
	},
	mounted() {
		this.setSize();
		this.editor = this.$refs.cmEditor.codemirror;
	},
	created() {
		window.addEventListener("resize", this.setSize);
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
.tabs-editor {
	height: 48px;
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
