<template>
	<v-card
		class="white--text pl-1 terminal-title"
		color="bodysecondary"
		width="100%"
		height="18"
		tile
	>
		TERMINAL
		<v-btn class="mx-2" fab dark small color="red" @click="kill">
			<v-icon dark>mdi-stop</v-icon>
		</v-btn>
		<v-alert v-model="alert_kill_sucess" type="success" dismissible>{{
			alertMessage
		}}</v-alert>
		<v-alert v-model="alert_kill_failure" type="error" dismissible>{{
			alertMessage
		}}</v-alert>
	</v-card>
</template>

<script>
import ExecService from "../../services/exec-service";

export default {
	name: "ActionTerminal",
	data() {
		return {
			alert_kill_sucess: false,
			alert_kill_failure: false,
			alertMessage: "",
		};
	},
	methods: {
		kill() {
			ExecService.killExecution()
				.then((res) => {
					this.hideAlerts();
					this.alertMessage = "Execution successfully stopped.";
					this.alert_kill_sucess = true;
					setTimeout(this.hideAlerts, 5000);
				})
				.catch((error) => {
					this.hideAlerts();
					this.alertMessage = error.response.data;
					this.alert_kill_failure = true;
					setTimeout(this.hideAlerts, 5000);
				});
		},
		hideAlerts() {
			this.alert_kill_sucess = false;
			this.alert_kill_failure = false;
		},
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