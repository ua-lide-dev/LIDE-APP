<template>
    <v-row>
        <v-col>

            <!-- first part of the home screen, with the big image -->
            <v-row >
                <v-card  width="100%" flat>
                    <v-img  src="@/img/background.jpg" aspect-ratio="5">

                        <!-- title -->
                        <v-col md="12" class="d-flex justify-center pt-10 pb-0">
                            <v-card-title class="title white--text">
                                <h1>{{img_title}}</h1>
                            </v-card-title>
                        </v-col>

                        <!-- subtitle -->
                        <v-col md="12" class="d-flex justify-center pt-0 pb-10">
                            <h2 class="white--text">{{img_subtitle}}</h2>
                        </v-col>

                        <!-- text  -->
                        <v-col md="12" class="d-flex justify-center pt-5">
                            <strong class="white--text">{{img_text}}</strong>
                        </v-col>

                    </v-img> 
                </v-card>
            </v-row>

            <!-- second part of the home sceen, with the 4 tiles -->
            <v-row >
                <v-spacer />

                <!-- first card -->
                <v-col md="2">
                    <v-card class="pt-10" :height="height" :width="width" >
                        <v-icon class="d-flex align-start justify-center" size="100"> mdi-cloud </v-icon>
                        <div class="headline d-flex align-end justify-center"> <strong> Sauvegarde tes fichiers</strong>  </div>
                        <div class="headline d-flex align-end justify-center"> <strong> à distance </strong> </div>
                    </v-card>
                </v-col>

                <!-- second card -->
                <v-col md="2">
                    <v-card class="pt-10" :height="height" :width="width">
                        <v-icon class="d-flex align-start justify-center" size="100"> mdi-code-tags </v-icon>
                        <div class="headline d-flex align-center justify-center"> <strong> Choisis ton langage</strong>  </div>
                        <div class="d-flex align-end justify-center pt-2">
                            <v-icon size="25" class="mx-2"> mdi-language-c </v-icon> 
                            <v-icon size="25" class="mx-2"> mdi-language-cpp </v-icon> 
                            <v-icon size="25" class="mx-2"> mdi-language-python </v-icon>
                            <v-icon size="25" class="mx-2"> mdi-language-java </v-icon>
                        </div>
                    </v-card>
                </v-col>

                <!-- third card -->
                <v-col md="2">
                    <v-card  class="pt-10" :height="height" :width="width">
                        <v-icon class="d-flex align-start justify-center" size="100"> mdi-file-code </v-icon>
                        <div class="headline d-flex align-center justify-center"> <strong> Développe en ligne </strong>  </div>
                    </v-card>
                </v-col>

                <!-- fourth card -->
                <v-col md="2">
                    <v-card class="pt-10" :height="height" :width="width">
                        <v-icon class="d-flex align-start justify-center" size="100"> mdi-play-circle </v-icon>
                        <div class="headline d-flex align-center justify-center"> <strong>Compile & execute</strong>  </div>
                        <div class="headline d-flex align-end justify-center"> <strong>ton code</strong> </div>
                    </v-card>
                </v-col>

                <v-spacer />
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
	export default {
		name: "Body",
		data: () => ({
            img_title: "LIDE",
            img_subtitle: "L'environnement de développement en ligne",
            img_text: "Aucune installation - accessible depuis chez toi - Connexion via identifiant ENT",
            height: "250", // tiles height
            width: "380", // tiles width
        }),
	};
</script>

