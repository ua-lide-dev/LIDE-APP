<template>
  <div class="terminal" ref="terminal"></div>
</template>

<script>
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from "xterm-addon-attach";
import "xterm/css/xterm.css";

export default {
  name: "Terminal",

  data() {
    return {
      terminal : new Terminal(),
      socket : new WebSocket( "ws://localhost:3636") // TODO DEV; Ip:port de la VM
    };
  },

  created() {
    this.socket.onopen = () => {
      this.socket.send("36f9eb646a48737916417adef889a7959c24e24d56b931cafb37a61d154ef267"); // TODO DEV; Dynamiquement avec le retour de /compile
    };
  },

  mounted() {
    const fitAddon = new FitAddon();
    const attachAddon = new AttachAddon(this.socket, { bidirectional: true });

    this.terminal.loadAddon(attachAddon);
    this.terminal.loadAddon(fitAddon);
    this.terminal.open(this.$refs.terminal);
    fitAddon.fit();
  }

  
};
</script>

<style scoped>
.terminal {
  height: 23vh;
}
</style>
