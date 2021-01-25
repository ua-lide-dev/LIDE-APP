<template>
	<div>
		<v-subheader>
			EXPLORER
			<v-spacer></v-spacer>
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn v-bind="attrs" v-on="on" icon>
						<v-icon>mdi-export-variant</v-icon>
					</v-btn>
				</template>
				<span>Exporter ses fichiers</span>
			</v-tooltip>
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn v-bind="attrs" v-on="on" @click="openDialogCreateFolder" icon>
						<v-icon>mdi-folder-plus</v-icon>
					</v-btn>
				</template>
				<span>Créer un projet</span>
			</v-tooltip>
		</v-subheader>

		<v-dialog v-model="dialogCreateFolder" persistent max-width="410">
			<v-card>
				<v-card-title class="title">Créer un nouveau projet </v-card-title>
				<v-card-text>
					<v-text-field
						class="mt-2 mb-n10"
						label="Nom du projet"
						outlined
						dense
						v-model="projectname"
					></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="red darken-1" text @click="dialogCreateFolder = false"
						>Annuler</v-btn
					>

					<v-btn color="green darken-1" text @click="createProject"
						>Valider</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			projectname: "",
			dialogCreateFolder: false,
		};
	},
	methods: {
		createProject: function () {
			this.$store
				.dispatch("project/create", this.projectname)
				.catch((error) => {
					console.log(error);
				});
			this.dialogCreateFolder = false;
		},
		openDialogCreateFolder() {
			this.dialogCreateFolder = true;
		}
	},
};
</script>

<style scoped>

</style>
