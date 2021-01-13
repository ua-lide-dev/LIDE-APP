<template>
    <!-- Drawer Setting -->
    <v-navigation-drawer class="drawer-setting" v-model="settingDrawer" right absolute>
        <v-card outlined tile>
            <v-row>
                <v-col cols="8">
                    <h2 class="ml-5 text--secondary">Paramètre</h2>
                </v-col>
                <v-col cols="1">
                    <v-btn class="mt-1 ml-3 text--secondary" @click="closeDrawerSetting" small text>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12"></v-col>
            </v-row>
        </v-card>
    </v-navigation-drawer>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'
    export default {
        name: "SettingDrawer",
        computed: {
            ...mapState({
                settingDrawer: state => state.drawer.settingDrawer
            }),
        },
        methods: {
            closeDrawerSetting: function () {
                this.$store.dispatch("drawer/closeSettingDrawer")
            },
        }
    }
</script>

<style scoped>

</style>