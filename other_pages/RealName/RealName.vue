<template>
	<view>
		<up-loading @clickPos="clickPos" @clickRev="clickRev"></up-loading>
		<personal-details :name="name" :num="num" :idJson1="idJson1" :imgSrc1="imgSrc1" :show="show" :imgSrc2="imgSrc2"></personal-details>
	</view>
</template>

<script>
	import UpLoading from './base/UpLoading.vue'
	import PersonalDetails from './base/PersonalDetails.vue'
	export default{
		data(){
			return{
				name:'',
				num:'',
				idJson1:{},
				idJson2:{},
				imgSrc1:'',
				imgSrc2:'',
				idJson:'',
				show:true,
			}
		},
		components:{
			UpLoading,
			PersonalDetails
		},
		
		methods:{
			clickPos(posRes,imgSrc){
				this.idJson1 =posRes;
				this.name = posRes.name;
				this.num = posRes.num;
				this.imgSrc1 = imgSrc
			},
			clickRev(revRes,imgSrc){
				this.idJson2 = revRes;
				this.imgSrc2 = imgSrc;	
				this.show = !revRes.success
				Object.assign(this.idJson1,this.idJson2)
			},
			
		},
	}
</script>

<style scoped lang="stylus">
	view
		height 100vh
		background-color #F4F4F4
</style>
