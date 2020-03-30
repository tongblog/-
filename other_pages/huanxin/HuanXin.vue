<template>
	<view>
		<upload @clickPos="clickPos" @clickRev="clickRev"></upload>
		<old-car :addr="addr" :model="model" :plate_num="plate_num" @handleBlur="handleBlur"></old-car>
		<new-car :price="price" :posImg="posImg" :revImg="revImg" :posData="posData"></new-car>
	</view>
</template>

<script>
	// 以旧换新页面
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	import Upload from './base/upload.vue'
	import OldCar from './base/oldcar.vue'
	import NewCar from './base/newcar.vue'
	export default{
		data(){
			return{
				addr:'',
				model:"",
				plate_num:'',
				posImg:"",
				revImg:"",
				posData:{},
				price:"",
			}
		},
		onLoad() {
			let toKen = uni.getStorageSync('token');
			if(toKen === ''){
				goWindow('/pages/common/login')
			}
		},
		// 分享
		onShareAppMessage(res){
			if (res.from === 'menu') {
				return {
					title: '专业的二手商用车服务平台',
					path: 'other_pages/huanxin/HuanXin',
				}
			}    
		},
		components:{
			Upload,
			OldCar,
			NewCar
		},
		methods:{
			clickPos(pos,url){
				this.addr = pos.addr; // 地址
				this.model = pos.model; // 品牌型号
				this.plate_num = pos.plate_num; // 车牌号
				this.posImg = url; // 图片
				this.posData = pos; // 正面数据
			},
			clickRev(rev,url){
				this.revImg = url;
				Object.assign(this.posData,rev) // 反面数据
			},
			handleBlur(price){
				this.price = price;
			}
		}
	}
</script>

<style>
</style>
