<template>
	<!--<v-row justify="center">
		<v-col cols="11">
			<h2 class="mt-4 subtitle-1">EXPLORER</h2>
			<v-divider class="mt-1"></v-divider>
		</v-col>
	</v-row>-->
	<div>

		<v-subheader>
			EXPLORER
			<v-spacer></v-spacer>
			<v-btn icon @click="openDialogCreateFolder">
				<v-icon>mdi-folder-plus</v-icon>
			</v-btn>
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
