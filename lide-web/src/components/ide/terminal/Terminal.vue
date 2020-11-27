<template>
  <div class="terminal" ref="terminal"></div>
</template>

<script>
import { Terminal } from "xterm";
import { AttachAddon } from "xterm-addon-attach";
import "xterm/css/xterm.css";

export default {
  name: "Terminal",

  data() {
    return {
      terminal : new Terminal(),
      socket : null
    };
  },

  methods: {
    openSocket(containerId) {
      console.log("Le terminal a reçu le container ID : " + containerId);

      // Recharger le terminal et le socket si ce n'est pas la première fois
      if(this.socket !== null) {
        this.socket.close();
        this.terminal.reset();
      }

      // Création d'un socket vers le wss
      this.socket = new WebSocket("ws://localhost:3636");
      this.socket.onopen = () => {
          this.socket.send(containerId); 
      };

      // Liaison socket-terminal
      this.terminal.loadAddon(new AttachAddon(this.socket, { bidirectional: true })); 
    }
  },

  created() {
    this.$root.$refs.Terminal = this;
  },

  mounted() {
    this.terminal.open(this.$refs.terminal);
  }

  
};
</script>

<style scoped>
.terminal {
  height: 23vh;
}
</style>
