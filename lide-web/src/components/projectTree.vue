<template>
	<div style="margin: 10px" @contextmenu="diableRightClick($event)">
		<h3 style="user-select: none;" align="center">{{ projectName }}</h3>
		<template>
			<v-treeview
				:items="items"
				activatable
				item-key="name"
				open-on-click
				transition
			>
				<template slot="label" slot-scope="{ item }"> <!-- evenement click sur le titre de l'item  -->
					<div @contextmenu="menu($event, item)" @click="openFile(item)" >{{ item.name }} </div>
				</template>

				<template v-slot:prepend="{ item, open }"> <!-- icon du fichier/dossier -->
					<div @contextmenu="menu($event, item)" @click="openFile(item)"> <!-- evenement click sur l'icone de l'item  -->

						<v-icon v-if="!item.file"><!-- icon de dossier -->
							{{ open ? "mdi-folder-open" : "mdi-folder" }}
						</v-icon>
						<v-icon v-else>
							{{ files[item.file] }} <!-- icon de fichier -->
						</v-icon>

					</div>
				</template>
			</v-treeview>
		</template> 

		<v-divider></v-divider>

		<VueSimpleContextMenu
			style="padding-left: 0px"
			:options="options"
			ref="vueSimpleContextMenu"
			@option-clicked="optionClicked"
			element-id="Menu">
		</VueSimpleContextMenu>
	</div>
	
</template>

<script>
	import VueSimpleContextMenu from './vue-simple-context-menu'

	export default {
		name: "ProjectTree",
		components: {
			VueSimpleContextMenu,
		},
		props: {
				projectName: String,
		},
		methods: {
			openFile : function(item){ //ouvrir le fichier cliqué
				console.log(item, " left clicked");
			},
			menu: function(e, item) { //ouvrir le ContextMenu 
				//console.log(item, " right clicked");
				e.preventDefault(); //desactiver le menu original du navigateur internet
				this.$refs.vueSimpleContextMenu.showMenu(e, item)
				//this.handleClick(e, item);
			},
			handleClick (event, item) {
				this.$refs.vueSimpleContextMenu.showMenu(event, item)
			},
			optionClicked : function(event) {
				console.log("Event: ", event);
				window.alert(JSON.stringify(event))
			},
			diableRightClick : function(e){//fonction pour desaciver le clique droit sur le reste de l'arbre
				e.preventDefault();
			}

		},
		data: () => ({
			files: { //file icons
				html: "mdi-language-html5",
				js: "mdi-nodejs",
				json: "mdi-code-json",
				md: "mdi-language-markdown",
				pdf: "mdi-file-pdf",
				png: "mdi-file-image",
				txt: "mdi-file-document-outline",
				xls: "mdi-file-excel",
			},
			options : [ //contextMenu options
				{name: "Rename", slug: "rename"},
				{name: "Delete", slug: "delete"},
				{name: "Open", slug: open}
			],
			//tree: [],
			items: [
				{
					name: ".git",
				},
				{
					name: "node_modules",
				},
				{
					name: "public",
					children: [
						{
							name: "static",
							children: [
								{
									name: "logo.png",
									file: "png",
								},
							],
						},
						{
							name: "favicon.ico",
							file: "png",
						},
						{
							name: "index.html",
							file: "html",
						},
					],
				},
				{
					name: ".gitignore",
					file: "txt",
				},
				{
					name: "babel.config.js",
					file: "js",
				},
				{
					name: "package.json",
					file: "json",
				},
				{
					name: "README.md",
					file: "md",
				},
				{
					name: "vue.config.js",
					file: "js",
				},
				{
					name: "yarn.lock",
					file: "txt",
				},
			],
		}),
	};
</script>

