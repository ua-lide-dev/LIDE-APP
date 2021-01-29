<template>
	<v-card
		class="white--text pl-1 terminal-title"
		color="bodysecondary"
		width="100%"
		height="20"
		tile
	>
		<div class="d-flex justify-space-between">
			<span class="ml-2">TERMINAL</span>
			<div class="mx-5">
				<v-tooltip bottom>
					<template v-slot:activator="{ on, attrs }">
						<v-btn 
							v-bind="attrs"
							v-on="on" dark height="20"
							color="red"
							icon tile 
							@click="kill">
							<v-icon size="22">mdi-stop</v-icon>
						</v-btn>
					</template>
					<span>Kill Terminal</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on, attrs }">
						<v-btn 
							v-bind="attrs"
							v-on="on" dark height="20" 
							icon tile @click="clear" >
							<v-icon size="18">mdi-delete</v-icon>
						</v-btn>
					</template>
					<span>Clear Terminal</span>
				</v-tooltip>
			</div>
		</div>
		<Notification 
			:msg="message" 
			:color="color_succes_fail ? 'success' : 'error'"
		/>
	</v-card>
</template>

<script>
import ExecService from "../../services/exec-service";
import Notification from "../utils/Notification"

export default {
	name: "ActionTerminal",
	components: {
		Notification
	},
	data() {
		return {
			color_succes_fail: false,
			alertMessage: "",
		};
	},
	methods: {
		kill() {
			ExecService.killExecution()
				.then(() => {
					this.message = "Exécution stoppée.";
					this.$root.$refs.Notification.show = true;
					this.color_succes_fail = true;
					this.$root.$refs.Terminal.terminal.reset();
				})
				.catch(() => {
					this.message = "Impossible de stopper l'exécution.";
					this.$root.$refs.Notification.show = true;
					this.color_succes_fail = false;
				});
		},
		clear() {
			this.message = "Il ne se passe rien pour le moment :)";
			this.$root.$refs.Notification.show = true;
			this.color_succes_fail = true;
		}
	},
};
</script>

<style scoped>
.terminal-title {
	font-weight: bold;
	font-size: 0.775rem;
	letter-spacing: 0.1rem;
}
</style>