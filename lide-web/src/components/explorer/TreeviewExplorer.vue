<template>
	<div v-if="projects !== 'undefined' && projects.length > 0">
		<v-list v-for="(project, i) in projects" :key="i" dense nav>
			<v-list-group>
				<template v-slot:activator>
					<v-menu bottom offset-y>
						<template v-slot:activator="{ on, attrs }">
							<v-btn class="ml-n2" icon v-bind="attrs" v-on="on">
								<v-icon>mdi-dots-vertical</v-icon>
							</v-btn>
						</template>
						<v-list>
							<v-list-item
								class="my-n2"
								@click="openDialogRenameProject(project._id)"
								link
							>
								<v-list-item-title
									><v-icon class="pa-2" size="18"
										>mdi-square-edit-outline</v-icon
									>Renommer</v-list-item-title
								>
							</v-list-item>
							<v-list-item
								class="my-n2"
								@click="removeProject(project._id)"
								link
							>
								<v-list-item-title
									><v-icon class="pa-2" size="18">mdi-delete</v-icon
									>Supprimer</v-list-item-title
								>
							</v-list-item>
						</v-list>
					</v-menu>
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-folder</v-icon>
					</v-list-item-icon>
					<v-list-item-title> {{ project.projectname }}</v-list-item-title>
				</template>
				<v-list-item
					v-for="(file, j) in project.files"
					:key="j"
					class="pl-7"
					link
					@click="openFile(file._id)"
				>
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-file-document-outline</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>{{
							file.filename + file.extension
						}}</v-list-item-title>
					</v-list-item-content>
					<v-menu bottom offset-y>
						<template v-slot:activator="{ on, attrs }">
							<v-btn icon v-bind="attrs" v-on="on">
								<v-icon>mdi-dots-vertical</v-icon>
							</v-btn>
						</template>
						<v-list>
							<v-list-item
								class="my-n2"
								@click="openDialogRenameFile(file._id)"
								link
							>
								<v-list-item-title
									><v-icon class="pa-2" size="18"
										>mdi-square-edit-outline</v-icon
									>Renommer</v-list-item-title
								>
							</v-list-item>
							<v-list-item class="my-n2" @click="removeFile(file._id)" link>
								<v-list-item-title
									><v-icon class="pa-2" size="18">mdi-delete</v-icon
									>Supprimer</v-list-item-title
								>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-list-item>

				<v-list-item class="pl-7">
					<v-list-item-content>
						<v-btn
							max-width="180"
							outlined
							x-small
							class="py-3"
							@click="openDialogCreateFile(project._id)"
						>
							<v-icon left>mdi-file-plus-outline</v-icon>
							Ajouter un fichier
						</v-btn>
					</v-list-item-content>
				</v-list-item>
			</v-list-group>
		</v-list>
		<v-dialog v-model="dialogCreateFile" persistent max-width="410">
			<v-card
				class="px-5"
				v-on:keydown.enter="createFile"
				v-on:keydown.esc="closeDialogCreateFile"
			>
				<v-card-title class="title">Créer un nouveau fichier</v-card-title>
				<v-form ref="fichierCreateForm" @submit.prevent="createFile">
					<v-text-field
						class="mt-2"
						label="Nom du fichier"
						v-model="filename"
						outlined
						autofocus
						dense
						:rules="fichierRules"
						required
					></v-text-field>
					<v-select
						:items="langages"
						v-model="extension"
						label="Extension du fichier"
						dense
						outlined
						:rules="selectExtensionRules"
					></v-select>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="red darken-1"
							small
							outlined
							@click="closeDialogCreateFile"
							>Annuler</v-btn
						>
						<v-btn color="green darken-1" small outlined type="submit"
							>Créer</v-btn
						>
					</v-card-actions>
				</v-form>
			</v-card>
		</v-dialog>
		<v-dialog v-model="dialogRenameFile" persistent max-width="410">
			<v-card
				class="px-5"
				v-on:keydown.enter="renameFile"
				v-on:keydown.esc="closeDialogRenameFile"
			>
				<v-card-title class="title px-0">Renommer le fichier</v-card-title>
				<v-form ref="fichierRenameForm" @submit.prevent="renameFile">
					<v-text-field
						class="mt-2"
						label="Nouveau nom"
						v-model="newfilename"
						outlined
						autofocus
						dense
						:rules="fichierRules"
						required
					></v-text-field>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="red darken-1"
							small
							outlined
							@click="closeDialogRenameFile"
						>
							Annuler
						</v-btn>
						<v-btn color="green darken-1" small outlined type="submit">
							Renommer
						</v-btn>
					</v-card-actions>
				</v-form>
			</v-card>
		</v-dialog>
		<v-dialog v-model="dialogRenameProject" persistent max-width="410">
			<v-card
				class="px-5"
				v-on:keydown.esc="closeDialogRenameProject"
				v-on:keydown.enter="renameProject"
			>
				<v-card-title class="title px-0">Renommer le projet</v-card-title>
				<v-form ref="projectRenameForm" @submit.prevent="renameProject">
					<v-text-field
						class="mt-2 mb-n3"
						label="Nouveau nom"
						v-model="newprojectname"
						outlined
						dense
						autofocus
						:rules="projetRules"
						required
					>
					</v-text-field>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="red darken-1"
							small
							outlined
							@click="closeDialogRenameProject"
						>
							Annuler
						</v-btn>
						<v-btn color="green darken-1" small outlined type="submit">
							Renommer
						</v-btn>
					</v-card-actions>
				</v-form>
			</v-card>
		</v-dialog>
	</div>
	<div v-else class="text-center py-10 secondary--text">
		Vous n'avez pas de projet.
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
			projecthover: null,
			filehover: null,
			dropdown: null,
			dialogCreateFile: false,
			dialogRenameFile: false,
			dialogRenameProject: false,
			filename: "",
			extension: "",
			langages: [".cpp", ".h", ".py", ".java"],
			selectedFileId: "",
			newfilename: "",
			selectedProjectId: "",
			newprojectname: "",
			fichierRules: [
				(p) => p != null || "Vous devez écrire au moins un caractère !",
				(p) => /^[^\s][a-zA-Z0-9_-]*$/.test(p) || "Nom du fichier invalide.",
			],
			projetRules: [
				(p) => p != null || "Vous devez écrire au moins un caractère !",
				(p) => /^[^\s][a-zA-Z0-9_-]*$/.test(p) || "Nom du projet invalide.",
			],
			selectExtensionRules: [(s) => !!s || "Une extension est requise."],
		};
	},
	computed: {
		...mapState({
			projects: (state) => state.project.projects,
			openedFiles: (state) => state.file.openedFiles,
			currentProjectId: (state) => state.project.currentProjectId,
			currentFileId: (state) => state.file.currentFileId,
		}),
	},
	methods: {
		openDialogCreateFile(projectid) {
			this.$store.dispatch("project/setCurrentProjectId", projectid);
			this.dialogCreateFile = true;
		},

		closeDialogCreateFile() {
			this.$refs.fichierCreateForm.reset();
			this.dialogCreateFile = false;
		},

		openDialogRenameFile(fileid) {
			this.selectedFileId = fileid;
			this.dialogRenameFile = true;
		},

		closeDialogRenameFile() {
			this.$refs.fichierRenameForm.reset();
			this.dialogRenameFile = false;
		},

		openDialogRenameProject(projectid) {
			this.selectedProjectId = projectid;
			this.dialogRenameProject = true;
		},

		closeDialogRenameProject() {
			this.$refs.projectRenameForm.reset();
			this.dialogRenameProject = false;
		},

		// ---------------------------------- Project ----------------------------------

		removeProject: function (projectid) {
			this.$store
				.dispatch("project/remove", projectid)
				.catch((error) => {
					this.$store.dispatch("notification/notif", {
						texte: "Un problème est survenue lors de la suppression du projet.",
						couleur: "error",
					});
				})
				.then(() => {
					this.$store.dispatch("notification/notif", {
						texte: "Votre projet a bien été supprimé.",
						couleur: "success",
					});
				});
		},

		renameProject: async function () {
			if (
				this.$refs.projectRenameForm.validate() &&
				this.newprojectname != ""
			) {
				await this.$store
					.dispatch("project/rename", {
						projectid: this.selectedProjectId,
						newprojectname: this.newprojectname,
					})
					.catch((error) => {
						this.$store.dispatch("notification/notif", {
							texte: "Une erreur est survenue lors du renommage du projet.",
							couleur: "error",
						});
					})
					.then(() => {
						this.$store.dispatch("notification/notif", {
							texte: "Votre projet a bien été renommé.",
							couleur: "success",
						});
					});
				this.$refs.projectRenameForm.reset();
				this.dialogRenameProject = false;
			}
		},

		// ---------------------------------- File ----------------------------------

		createFile: async function () {
			const projectid = this.currentProjectId;
			const filename = this.filename;
			const extension = this.extension;

			if (this.$refs.fichierCreateForm.validate() && this.filename != "") {
				const fileId = await this.$store
					.dispatch("file/create", { projectid, filename, extension })
					.catch((error) => {
						this.$store.dispatch("notification/notif", {
							texte: "Une erreur est survenue lors de la création du fichier.",
							couleur: "error",
						});
					})
					.then((fileId) => {
						this.openFile(fileId);
						this.$store.dispatch("notification/notif", {
							texte: "Votre fichier a bien été créé.",
							couleur: "success",
						});
					});
				this.$refs.fichierCreateForm.reset();
				this.dialogCreateFile = false;
			}
		},

		removeFile: function (fileid) {
			this.$store
				.dispatch("file/remove", fileid)
				.catch((error) => {
					this.$store.dispatch("notification/notif", {
						texte: "Une erreur est survenue lors de la suppression du fichier.",
						couleur: "error",
					});
				})
				.then(() => {
					this.$store.dispatch("notification/notif", {
						texte: "Votre fichier a bien été supprimé.",
						couleur: "success",
					});
				});
		},

		renameFile: async function () {
			if (this.$refs.fichierRenameForm.validate() && this.newfilename != "") {
				await this.$store
					.dispatch("file/rename", {
						fileid: this.selectedFileId,
						newfilename: this.newfilename,
					})
					.catch((error) => {
						this.$store.dispatch("notification/notif", {
							texte: "Une erreur est survenue lors du renommage du fichier.",
							couleur: "error",
						});
					})
					.then(() => {
						this.$store.dispatch("notification/notif", {
							texte: "Votre fichier a bien été renommé.",
							couleur: "success",
						});
					});
				// workaround d'un bug des tabs vuetify, cf: https://github.com/vuetifyjs/vuetify/issues/4733
				window.dispatchEvent(new Event("resize"));
				this.$refs.fichierRenameForm.reset();
				this.dialogRenameFile = false;
			}
		},

		openFile: function (fileid) {
			this.$store.dispatch("tab/newTab", fileid).catch((error) => {
				this.$store.dispatch("notification/notif", {
					texte: "Une erreur est survenue lors de l'ouverture du fichier.",
					couleur: "error",
				});
			});
		},
	},
};
</script>

<style>
</style>