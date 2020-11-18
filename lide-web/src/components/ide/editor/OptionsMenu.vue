<template>
    <v-dialog
      v-model="show"
      max-width="500"
      max-height="500"
    >

      <v-card>

        <v-card-title class="headline">
          Options de compilation

          <v-btn
            color="red darken-1"
            text
            @click="closeMenu"
            style="position: absolute; right: 3%;"
          >
            Annuler
          </v-btn>
        </v-card-title>
        
        <v-text-field
            outlined
            id="compilation_input"
            style="margin-left:5%; margin-right:5%; margin-top:5%"
          >
          </v-text-field>

        <v-card-actions>

          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="closeMenu"
          >
            Accepter
          </v-btn>

          


          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>


<script>
//style="position: absolute; right: 0;"
    export default {
        name: "OptionsMenu",

        components: {

        },
        props: {
            value: Boolean
        },
        data: () => ({
            showMenuOptions: false,
        }),
        methods: {
            closeMenu : function(){
                this.show =  false
            }
        },
        computed: {
            show: {
                get () {
                    return this.value
                },
                set (value) {
                    this.$emit('input', value)
                }
            }
        }
    }
</script>












