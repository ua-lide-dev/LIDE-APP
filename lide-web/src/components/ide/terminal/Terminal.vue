<template>
  <div class="terminal" ref="terminal"></div>
</template>

<script>
import { Terminal } from "xterm";
//import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from "xterm-addon-attach";
import "xterm/css/xterm.css";

export default {
  name: "Terminal",

  data() {
    return {};
  },
  mounted() {
    const term = new Terminal();
    const socket = new WebSocket(
      "ws://92.139.146.137:3636"
    );

    const attachAddon = new AttachAddon(socket, { bidirectional: true });

    term.loadAddon(attachAddon);
    term.open(this.$refs.terminal);
  },
};
</script>

<style scoped>
.terminal {
  height: 23vh;
}
</style>
