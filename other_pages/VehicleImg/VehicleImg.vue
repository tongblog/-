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
			:imgId1="imgId1"
			:imgId2="imgId2" 
			:imgId3="imgId3" 
			:imgId4="imgId4"
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
				imgId1:'',
				imgId2:'',
				imgId3:'',
				imgId4:'',
				videoSrc:'',
			}
		},
		onLoad(option) {
			let jsonObj = JSON.parse(option.json);
			this.newJson = jsonObj;
			//console.log(this.newJson)
		},
		components:{
			MustImg,
			NonImg
		},
		methods:{
			handleLeft(id){
				this.imgId1 = id
			},
			handleRight(id){
				this.imgId2 = id
			},
			handleLafter(id){
				this.imgId3 = id
			},
			handleRafter(id){
				this.imgId4 = id
			},
			handleVideo(src){
				this.videoSrc = src
			}
		}
	}
</script>

<style>
</style>
