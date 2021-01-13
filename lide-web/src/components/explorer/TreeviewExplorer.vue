<template>
	<v-row class="explorer-treeview">
		<v-col cols="12" class="child">
			<v-row v-for="(project, i) in projects" :key="i">
				<v-col cols="12" class="py-2">
					<v-row
						@mouseover="projecthover = i"
						@mouseleave="projecthover = null"
						:class="{ 'background-selected': projecthover == i }"
					>
						<v-col class="cursor-pointer" @click="openDropDown(i)" cols="8">
							<v-icon class="ml-2">{{
								dropdown == i ? "mdi-menu-down" : "mdi-menu-right"
							}}</v-icon>
							<v-icon class="ml-2">{{
								dropdown == i ? "mdi-folder-open" : "mdi-folder"
							}}</v-icon>
							<span class="ml-2">{{ project.projectname }}</span>
						</v-col>

						<v-col
							cols="4"
							class="group-addfile-menu pl-7 mt-n1 pa-0"
							align-self="center"
						>
							<v-btn icon @click="openDialogCreateFile(project._id)"
								><v-icon>mdi-file-plus-outline</v-icon></v-btn
							>
							<v-menu bottom offset-y>
								<template v-slot:activator="{ on, attrs }">
									<v-btn icon v-bind="attrs" v-on="on"
										><v-icon>mdi-dots-vertical</v-icon></v-btn
									>
								</template>
								<v-list>
									<v-list-item
										class="my-n2"
										@click="openDialogRenameProject(project._id)"
										link
									>
										<v-list-item-title>Renommer</v-list-item-title>
									</v-list-item>
									<v-list-item
										class="my-n2"
										@click="removeProject(project._id)"
										link
									>
										<v-list-item-title>Supprimer</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>
						</v-col>
					</v-row>
					<v-row
						v-show="dropdown === i"
						v-for="(file, j) in project.files"
						:key="j"
						@mouseover="filehover = j"
						@mouseleave="filehover = null"
						:class="{ 'background-selected': filehover == j }"
						justify="center"
					>
						<v-col cols="8" class="py-0 cursor-pointer">
							<v-row>
								<v-col
									cols="10"
									class=""
									align-self="center"
									@click="openFile(file._id)"
								>
									<v-icon class="ml-2">mdi-file-document-outline</v-icon>
									<span class="ml-2">{{ file.filename + file.extension }}</span>
								</v-col>
								<v-col cols="1" class="pa-0" align-self="center">
									<v-menu bottom offset-y>
										<template v-slot:activator="{ on, attrs }">
											<v-btn icon v-bind="attrs" v-on="on"
												><v-icon>mdi-dots-vertical</v-icon></v-btn
											>
										</template>
										<v-list>
											<v-list-item
												class="my-n2"
												@click="openDialogRenameFile(file._id)"
												link
											>
												<v-list-item-title>Renommer</v-list-item-title>
											</v-list-item>
											<v-list-item
												class="my-n2"
												@click="removeFile(file._id)"
												link
											>
												<v-list-item-title>Supprimer</v-list-item-title>
											</v-list-item>
										</v-list>
									</v-menu>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-col>
		<v-dialog v-model="dialogCreateFile" persistent max-width="410">
			<v-card>
				<v-card-title class="title">Créer un nouveau fichier</v-card-title>
				<v-card-text>
					<v-text-field
						class="mt-2 mb-n3"
						label="Nom du fichier"
						outlined
						dense
						v-model="filename"
					></v-text-field>
					<v-select
						:items="langages"
						v-model="extension"
						class="mb-n10"
						label="Extension du fichier"
						dense
						outlined
					></v-select>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="red darken-1" text @click="dialogCreateFile = false"
						>Annuler</v-btn
					>
					<v-btn color="green darken-1" text @click="createFile">Valider</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="dialogRenameFile" persistent max-width="410">
			<v-card>
				<v-card-title class="title">Renommer le fichier</v-card-title>
				<v-card-text>
					<v-text-field
						class="mt-2 mb-n3"
						label="Nouveau nom"
						outlined
						dense
						v-model="newfilename"
					></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="red darken-1" text @click="dialogRenameFile = false"
						>Annuler</v-btn
					>
					<v-btn color="green darken-1" text @click="renameFile">Valider</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="dialogRenameProject" persistent max-width="410">
			<v-card>
				<v-card-title class="title">Renommer le projet</v-card-title>
				<v-card-text>
					<v-text-field
						class="mt-2 mb-n3"
						label="Nouveau nom"
						outlined
						dense
						v-model="newprojectname"
					></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="red darken-1" text @click="dialogRenameProject = false"
						>Annuler</v-btn
					>
					<v-btn color="green darken-1" text @click="renameProject"
						>Valider</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import fileService from "../../services/file-service";
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
			langages: [".cpp", ".py", ".java", ".php"],
			selectedFileId: "",
			newfilename: "",
			selectedProjectId: "",
			newprojectname: "",
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
		openDropDown: function (index) {
			if (this.dropdown != index) {
				this.dropdown = index;
			} else if (this.dropdown != null) {
				this.dropdown = null;
			} else {
				this.dropdown = index;
			}
		},

		openDialogCreateFile(projectid) {
			this.$store.dispatch("project/setCurrentProjectId", projectid);
			this.dialogCreateFile = true;
		},

		openDialogRenameFile(fileid) {
			this.selectedFileId = fileid;
			this.dialogRenameFile = true;
		},

		openDialogRenameProject(projectid) {
			this.selectedProjectId = projectid;
			this.dialogRenameProject = true;
		},

		// ---------------------------------- Project ----------------------------------

		removeProject: function (projectid) {
			this.$store.dispatch("project/remove", projectid).catch((error) => {
				// TODO Notification pour avertir d'une erreur à l'utilisateur
				console.log(error);
			});
		},

		renameProject: async function () {
			await this.$store
				.dispatch("project/rename", {
					projectid: this.selectedProjectId,
					newprojectname: this.newprojectname,
				})
				.catch((error) => {
					// TODO Notification pour avertir  d'une erreur à l'utilisateur
					console.log(error);
				});
			this.dialogRenameProject = false;
		},

		// ---------------------------------- File ----------------------------------

		createFile: function () {
			const projectid = this.currentProjectId;
			const filename = this.filename;
			const extension = this.extension;

			this.$store
				.dispatch("file/create", { projectid, filename, extension })
				.catch((error) => {
					// TODO Notification pour avertir  d'une erreur à l'utilisateur
					console.log(error);
				});
			this.dialogCreateFile = false;
		},

		removeFile: function (fileid) {
			this.$store
				.dispatch("file/remove", fileid)
				.catch((error) => {
					// TODO Notification pour avertir  d'une erreur à l'utilisateur
					console.log(error);
				})
				.then(() => {
					/** //FIXME : Suite à la suppression de l'onglet courant, le dernier onglet est sélectionné (bug)
					C'est du au fait que la barre d'onglet ne se met pas à jour avec son v-model et ne voit donc pas
					le changement de fichier courant effectué par la fonctione de suppression du store.
					TMP FIX : On simule un click vers le nouvel onglet courant afin d'éviter que le dernier onglet soit sélectionné */
					const tabId = "tab" + this.currentFileId;
					this.$parent.$parent.$children[1].$refs[tabId][0].$el.dispatchEvent(
						new Event("click")
					);
				});
		},

		renameFile: async function () {
			await this.$store
				.dispatch("file/rename", {
					fileid: this.selectedFileId,
					newfilename: this.newfilename,
				})
				.catch((error) => {
					// TODO Notification pour avertir  d'une erreur à l'utilisateur
					console.log(error);
				});
			// workaround d'un bug des tabs vuetify, cf: https://github.com/vuetifyjs/vuetify/issues/4733
			window.dispatchEvent(new Event("resize"));
			this.dialogRenameFile = false;
		},

		openFile: function (fileid) {
			this.$store.dispatch("file/load", fileid).catch((error) => {
				// TODO Notification pour avertir  d'une erreur à l'utilisateur
				console.log(error);
			});
		},
	},
};
</script>

<style scoped>
.explorer-treeview {
	height: 83%;
	position: relative;
}
.child {
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	overflow: auto;
}
.background-selected {
	background-color: #ecf0f1;
}
.cursor-pointer {
	cursor: pointer;
}
</style>
