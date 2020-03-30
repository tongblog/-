<template>
	<view>
		<results :goods_name="goods_name" :refuse_desc="refuse_desc"></results>
		<upload :car_info="car_info" @clickPos="clickPos" @clickRev="clickRev"></upload>
		<!-- <identify :plate_num="plate_num" :model="model" :issue_date="issue_date"></identify> -->
		<vehicle-data 
			:car_info="car_info" 
			:introduction="introduction" 
			:goods_name="goods_name"
			:img_list="img_list"></vehicle-data>

	</view>
</template>

<script>
	// 我要卖车页面
	import {request} from '@/api/reques.js'
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	import Upload from './base/upload.vue'
	//import Identify from './base/identify.vue'
	import VehicleData from './base/VehicleData.vue'
	import Results from './base/results.vue'
	import * as MemberApi from '@/api/member/member.js'
	export default{
		data(){
			return{
				/* plate_num:'',
				model:'',
				issue_date:null,
				jsonId1:{},
				jsonId2:{},
				front:'',
				behind:'',
				state:false, */
				goods_name:"",
				refuse_desc:"",
				car_info:{},
				introduction:'',
				img_list:[],
			}
		},
		onLoad(option) {
			let _this = this
			let toKen = uni.getStorageSync('token');
			if(toKen !== ''){
				//_this.judge();
				_this.getData(option.id)
			}else{
				goWindow('/pages/common/login')	
			}
				
		},
		onShow() {
			let toKen = uni.getStorageSync('token');
			if(toKen !== ''){
				this.getMemberDetail()
			}	
		},
		methods:{
			/* judge(){
				request('/member/isBindId',{
					token: uni.getStorageSync('token'),
				},'POST').then((res)=>{
					if(res.data.data !== 1){
						uni.showModal({
						    title: '提示',
						    content: '请先完成实名认证!',
							confirmColor: '#0657A6',
						    success(res) {
						        if (res.confirm) {
									goWindow('/other_pages/RealName/RealName')
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					}
				})
			}, */
			getData(goodsId){
				MemberApi.goodsCarDetail({
					goods_id:goodsId,
					get_type:3,
				})
				.then(res => {
					let data = res.data;
					
					this.car_info = data.car_info.car_info;
					console.log(res)
					let description = data.description; // 描述
					this.goods_name = data.goods_name; // 名字
					let goods_id = data.goods_id;
					this.introduction = data.introduction; // 地址
					this.refuse_desc = data.refuse_desc;
					this.img_list = data.img_list;
					
				})
			},
			// 获取会员详情
			getMemberDetail(){
				MemberApi.getMemberInfo().then(res=>{
					let instance_id = parseInt(res.data.user_info.instance_id);
					if(instance_id !== 0){
						this.state = true;
					}
				})
			},
			//行驶证正面数据
			clickPos(pos,imgUrl){
				this.jsonId1 = pos;
				this.plate_num = pos.plate_num
				this.model = pos.model
				let date = new Date();
				let year = date.getFullYear();
				let lastYear = pos.issue_date.split('').slice(0,4).join("");
				this.issue_date = year - lastYear;
				this.front = imgUrl
				
			},
			// 行驶证反面数据
			clickRev(rev,imgUrl){
				this.jsonId2 = rev;
				this.behind = imgUrl;
				Object.assign(this.jsonId1,this.jsonId2)
			},
		},
		components:{
			Upload,
			VehicleData,
			Results,
			//Identify,
		}
	}
</script>

<style>
</style>

