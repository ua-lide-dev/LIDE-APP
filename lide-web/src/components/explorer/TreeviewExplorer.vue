<template>
    <div>
        <v-list v-for="(project, i) in projects" :key="i" dense nav>
            <v-list-group >
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

					<v-list-item-title><v-icon class="pr-2">mdi-folder</v-icon>{{ project.projectname }}</v-list-item-title>
                </template>
                <v-list-item
                    v-for="(file, j) in project.files"
                    :key="j"
                    class="pl-7"
                    link
					@click="openFile(file._id)"
                >
                    <v-list-item-icon>
                    <v-icon>mdi-file-document-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                    <v-list-item-title>{{ file.filename + file.extension }}</v-list-item-title>
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
                    </v-list-item>

                    <v-list-item class="pl-7">
                        <v-list-item-content>
                            <v-btn max-width="180" outlined x-small  class="py-3" @click="openDialogCreateFile(project._id)">
                                <v-icon left>mdi-file-plus-outline</v-icon>
                                Ajouter un fichier
                            </v-btn>
                        </v-list-item-content>
                    </v-list-item>
            </v-list-group>
        </v-list>
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
    </div>
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

<style>

</style>