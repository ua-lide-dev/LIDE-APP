<template>
	<div>
		<v-navigation-drawer
			ref="drawer"
			id="explorer"
			:width="width"
			height="100%"
			absolute
			permanent
			left
			@load="loadList"
		>
			<div v-for="(project, index) in projectList" v-bind:key="index">
				<ProjectTree
					:projectName="project.name"
					:path="project.path"
				></ProjectTree>
			</div>

			<template v-slot:append height>
				<ExplorerFooter></ExplorerFooter>
			</template>
		</v-navigation-drawer>
	</div>
</template>

<script>
	import ProjectTree from "./projectTree";
	import ExplorerFooter from "./explorerFooter";

	export default {
		name: "Explorer",

		components: {
			ProjectTree,
			ExplorerFooter,
		},
		props: {
			avatar: String,
			name: String,
			projectsFolder: String,
		},

		data() {
			return {
				projectList: [
					{ name: "TP1", path: "filePath" },
					{ name: "TD2.1", path: "filePath" },
				],
				width: "15%", //default width
				minWidth: 100, //minimum width of explorer bar IN PIXELS!
				borderSize: 3,
			};
		},

		methods: {
			loadList: function () {
				console.log("LOAD LIST");
			},

			//Functions to make the explorer expandable
			borderBar: function () {
				//make the explorer border bar easier to see
				let i = this.$refs.drawer.$el.querySelector(
					".v-navigation-drawer__border"
				);
				i.style.width = this.borderSize + "px";
				i.style.cursor = "ew-resize";
			},

			setEvents: function () {
				//const minSize = this.borderSize;
				const el = this.$refs.drawer.$el;
				const drawerBorder = el.querySelector(
					".v-navigation-drawer__border"
				); //get explorer border
				const minWidth = this.minWidth;
				const vm = this;
				const direction = "left"; //which side the explorer is on

				function resize(e) {
					document.body.style.cursor = "ew-resize";
					let newWidth;
					if (direction === "right") {
						newWidth = document.body.scrollWidth - e.clientX;
					} else {
						newWidth = e.clientX;
					}
					if (newWidth < minWidth) {
						newWidth = minWidth;
					}
					el.style.width = newWidth + "px";
				}

				drawerBorder.addEventListener(
					//on mousedown look for mouse movements
					"mousedown",
					function () {
						el.style.transition = "initial"; //makes the resize smooth
						document.addEventListener(
							//on mouse move: resize
							"mousemove",
							resize
						);
					}
				);

				document.addEventListener(
					//on mouseup drop the explorer
					"mouseup",
					function () {
						el.style.transition = "";
						vm.width = el.style.width;
						document.body.style.cursor = "";
						document.removeEventListener(
							"mousemove",
							resize,
							false
						);
					},
					false
				);
			},
		},
		mounted() {
			//execute functions on load
			this.setEvents();
			this.borderBar();
		},
	};
</script>
