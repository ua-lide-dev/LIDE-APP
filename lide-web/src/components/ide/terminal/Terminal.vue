<template>
  <div class="terminal" ref="terminal"></div>
</template>

<script>
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export default {
  name: "Terminal",

  data() {
    return {};
  },
  mounted() {
    var term = new Terminal();
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(this.$refs.terminal);
    fitAddon.fit();
    term.write("L1 $ ");
  }
};
</script>

<style scoped>
.terminal {
  height: 23vh;
}
</style>
