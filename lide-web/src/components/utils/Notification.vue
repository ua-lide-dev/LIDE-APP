<template>
  <div class="text-center">
    <v-snackbar v-model="snackbar" top :timeout="timeout" :color="couleur">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="close"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  methods: {
    close: function () {
      this.$store.dispatch("notification/closeNotif");
    },
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.notification.actif,
      text: (state) => state.notification.texte,
      timeout: (state) => state.notification.timeout,
      couleur: (state) => state.notification.couleur,
    }),
  },
};
</script>