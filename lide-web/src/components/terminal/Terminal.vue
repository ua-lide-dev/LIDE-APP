<template>
	<v-row
		ref="terminal"
		class="black"
		:style="{ height: terminalHeight + 'px' }"
	>
	</v-row>
</template>

<script>
import { Terminal } from "xterm";
import { AttachAddon } from "xterm-addon-attach";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export default {
	data() {
		return {
			terminalHeight: 0,
			nbRow: 0,
			terminal: new Terminal(),
			fitAddon: new FitAddon(),
			socket: null,
		};
	},
	methods: {
		openSocket(containerId) {
			console.log("Le terminal a reçu le container ID : " + containerId);

			// Recharger le terminal et le socket si ce n'est pas la première fois
			if (this.socket !== null) {
				this.socket.close();
				this.terminal.reset();
			}

			// Création d'un socket vers le wss
			this.socket = new WebSocket(process.env.VUE_APP_LIDE_WSS_URL);
			this.socket.onopen = () => {
				this.socket.send(containerId);
			};

			// Liaison socket-terminal
			this.terminal.loadAddon(
				new AttachAddon(this.socket, { bidirectional: true })
			);
		},
		setSize() {
			this.terminalHeight = (window.innerHeight - 64 - 48) * (30 / 100);
			//this.nbRow = Math.floor((this.terminalHeight * 13) / 252);
			this.fitAddon.fit();
		},
	},

	created() {
		this.$root.$refs.Terminal = this;
		window.addEventListener("resize", this.setSize);
	},

	destroyed() {
		window.removeEventListener("resize", this.setSize);
	},

	mounted() {
		this.terminal.open(this.$refs.terminal);
		this.terminal.resize(160, this.nbRow);
		this.terminal.loadAddon(this.fitAddon);
		this.setSize();
	},
};
</script>

<style scoped>
</style>
