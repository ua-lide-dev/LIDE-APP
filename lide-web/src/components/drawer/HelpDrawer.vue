<template>
    <!-- Drawer Help -->
    <v-navigation-drawer class="drawer-setting" v-model="helpDrawer" right absolute>
        <v-card outlined tile>
            <v-row>
                <v-col cols="8">
                    <h2 class="ml-5 text--secondary">Aide</h2>
                </v-col>
                <v-col cols="1">
                    <v-btn class="mt-1 ml-3 text--secondary" @click="closeDrawerHelp" small text>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-row justify="center">
            <v-col cols="10">
                <h3>Comment utiliser UIDE ?</h3>
                <p class="text-justify">Utque aegrum corpus quassari etiam levibus solet offensis, ita animus eius angustus et tener, quicquid increpuisset,
                    ad salutis suae dispendium existimans factum aut cogitatum, insontium caedibus fecit victoriam luctuosam.
                    Nam sole orto magnitudine angusti gurgitis sed profundi a transitu arcebantur et dum piscatorios quaerunt.
                </p>
                <h3>Comment utiliser UIDE ?</h3>
                <p class="text-justify">Utque aegrum corpus quassari etiam levibus solet offensis, ita animus eius angustus et tener, quicquid increpuisset,
                    ad salutis suae dispendium existimans factum aut cogitatum, insontium caedibus fecit victoriam luctuosam.
                    Nam sole orto magnitudine angusti gurgitis sed profundi a transitu arcebantur et dum piscatorios quaerunt.
                </p>
                <a >Contacter le support</a>
            </v-col>
        </v-row>
    </v-navigation-drawer>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'
    export default {
        name: "HelpDrawer",
        computed: {
            ...mapState({
               helpDrawer: state => state.drawer.helpDrawer
            }),
        },
        methods: {
            closeDrawerHelp: function(){
                this.$store.dispatch("drawer/closeHelpDrawer");
            }
        }
    }
</script>

<style scoped>

</style>