<template>
	<view>
		<upload @clickPos="clickPos" @clickRev="clickRev" :jsonData="jsonData" :is_hand = "is_hand"></upload>
		<identify :plate_num="plate_num" :model="model" :gua_date="gua_date"></identify>
		<vehicle-data 
			:guaId1="guaId1" 
			:before="before" 
			:after="after" 
			:gua_date="gua_date" 
			:jsonData="jsonData" 
			:is_hand = "is_hand"></vehicle-data>
	</view>
</template>

<script>
	// 我要卖车页面
	import {request} from '@/api/reques.js'
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	import Upload from './base/upload.vue'
	import Identify from './base/identify.vue'
	import VehicleData from './base/VehicleData.vue'
	export default{
		data(){
			return{
				plate_num:'',
				model:'',
				gua_date:null,
				guaId1:{},
				guaId2:{},
				before:'',
				after:'',
				jsonData:{},
				is_hand : false
			}
		},
		onLoad(option) {
			this.jsonData = JSON.parse(option.json);
			if((option.type != undefined || option.type != null) && option.type == 'hand'){
				this.is_hand = true
			}
		},	
		methods:{
			//挂行驶证正面数据
			clickPos(pos,imgUrl){
				//console.log(pos)
				this.guaId1 = pos;
				this.plate_num = pos.plate_num
				this.model = pos.model
				let date = new Date();
				let year = date.getFullYear();
				let lastYear = pos.issue_date.split('').slice(0,4).join("");
				if(lastYear == year){
					lastYear = lastYear-1;
					this.gua_date = year - lastYear;
				}else{
					this.gua_date = year - lastYear;
				};
				this.before = imgUrl
				
			},
			// 挂行驶证反面数据
			clickRev(rev,imgUrl){
				this.guaId2 = rev;
				this.after = imgUrl;
				Object.assign(this.guaId1,this.guaId2)
			}
		},
		components:{
			Upload,
			Identify,
			VehicleData
		}
	}
</script>

<style>
</style>
