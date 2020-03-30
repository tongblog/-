<template>
	<view>
		<must-img 
			@handleLeft="handleLeft"
			@handleRight="handleRight"
			@handleLafter="handleLafter"
			@handleRafter="handleRafter"
			@handleVideo="handleVideo"
		></must-img>
		<non-img 
			:newJson="newJson"
			:imgSrc1="imgSrc1"
			:imgSrc2="imgSrc2" 
			:imgSrc3="imgSrc3" 
			:imgSrc4="imgSrc4"
			:videoSrc="videoSrc"></non-img>
	</view>
</template>

<script>
	import MustImg from "./base/MustImg.vue"
	import NonImg from "./base/NonImg.vue"
	export default{
		data(){
			return{
				newJson:{},
				imgSrc1:'',
				imgSrc2:'',
				imgSrc3:'',
				imgSrc4:'',
				videoSrc:'',
			}
		},
		onLoad(option) {
			let jsonObj = JSON.parse(option.json);
			this.newJson = jsonObj;
			console.log(this.newJson)
		},
		components:{
			MustImg,
			NonImg
		},
		methods:{
			handleLeft(src){
				this.imgSrc1 = src
			},
			handleRight(src){
				this.imgSrc2 = src
			},
			handleLafter(src){
				this.imgSrc3 = src
			},
			handleRafter(src){
				this.imgSrc4 = src
			},
			handleVideo(src){
				this.videoSrc = src
			}
		}
	}
</script>

<style>
</style>
