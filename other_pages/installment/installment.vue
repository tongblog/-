<template>
	<view>
		<installment-plan :stages="stages" @changePlan="changePlan"></installment-plan>
		<explain :classId="classId"></explain>
	</view>
</template>

<script>
	// 金融分期页面
	import {request} from '@/api/reques.js'
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	import InstallmentPlan from './base/plan.vue'
	import Explain from './base/explain.vue'
	export default{
		data(){
			return{
				stages:[],
				classId:0,
			}
		},
		onLoad() {
			this.getStagesList()
		},
		// 分享
		onShareAppMessage(res){
			if (res.from === 'menu') {
				return {
					title: '专业的二手商用车服务平台',
					path: 'other_pages/installment/installment',
				}
			}
			    
		},
		components:{
			InstallmentPlan,
			Explain
		},
		methods:{
			getStagesList(){
				let token = uni.getStorageSync('token');
				if(token !== ""){
					request("/order/getStagesList",{
						token:token,
						goods_money:"100000"
					},"POST")
					.then((res)=>{
						this.stages = res.data.data
					})
				}else{
					goWindow('/pages/common/login')
				}
				
			},
			changePlan(id){
				this.classId = id;
			}
		}
		
		
	}
</script>

<style>
</style>
