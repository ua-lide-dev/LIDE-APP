<template>

	<v-row class="explorer-footer elevation-15" justify="center">
		<v-col cols="11" md="9" lg="10" xl="7">
			<v-dialog v-model="dialog" persistent max-width="410">
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						color="primary"
						class="text-center"
						width="100%"
						elevation="4"
						v-bind="attrs"
						v-on="on"
						outlined
						>NOUVEAU PROJET</v-btn
					>
				</template>
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
						<v-btn color="red darken-1" text @click="dialog = false"
							>Annuler</v-btn
						>
						<v-btn color="green darken-1" text @click="createProject"
							>Valider</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-col>
	</v-row>
</template>

<script>
export default {
	data() {
		return {
			projectname: "",
			dialog: false,
		};
	},
	methods: {
		createProject: function () {
			this.$store
				.dispatch("project/create", this.projectname)
				.catch((error) => {
					// TODO Notification pour avertir d'une erreur à l'utilisateur
					console.log(error);
					this.projectname = "";
				})
				.then(() => (this.projectname = ""));
			this.dialog = false;
		},
	},
};
</script>

<style scoped>
.explorer-footer {
	position:absolute;
	bottom:0;
}
</style>
