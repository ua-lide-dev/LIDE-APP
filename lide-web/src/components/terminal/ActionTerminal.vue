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
							v-on="on"
							v-show="checkExecutionInProgress()"
							dark
							height="20"
							color="red"
							icon
							tile
							@click="kill"
						>
							<v-icon size="22">mdi-stop</v-icon>
						</v-btn>
					</template>
					<span>Arrêter l'exécution</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							v-bind="attrs"
							v-on="on"
							dark
							height="20"
							icon
							tile
							@click="clear"
						>
							<v-icon size="18">mdi-delete</v-icon>
						</v-btn>
					</template>
					<span>Nettoyer le terminal</span>
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
import Notification from "../utils/Notification";
import { mapState } from "vuex";

export default {
	name: "ActionTerminal",
	components: {
		Notification,
	},
	data() {
		return {
			color_succes_fail: false,
			message: "",
		};
	},
	computed: {
		...mapState({
			executionInProgress: (state) => state.execution.executionInProgress,
		}),
	},
	methods: {
		kill() {
			ExecService.killExecution()
				.then(() => {
					//this.$root.$refs.Terminal.terminal.reset();
					this.message = "Exécution stoppée.";
					this.$root.$refs.Notification.show = true;
					this.color_succes_fail = true;
				})
				.catch(() => {
					this.message = "Impossible de stopper l'exécution.";
					this.$root.$refs.Notification.show = true;
					this.color_succes_fail = false;
				});
		},
		clear() {
			this.$root.$refs.Terminal.terminal.clear();
			this.message = "Terminal nettoyé.";
			this.$root.$refs.Notification.show = true;
			this.color_succes_fail = true;
		},
		checkExecutionInProgress() {
			return this.executionInProgress;
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