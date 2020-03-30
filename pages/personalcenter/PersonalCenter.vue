<template>
	<view>
		<center-header 
			:member_name="member_name" 
			:headimg="headimg" 
			:member_index_data="member_index_data" 
			:bail_money="bail_money"
			:id_num="id_num"
			:real_name="real_name"></center-header>
		<center-body :member_index_data="member_index_data" :notice="notice"></center-body>
		<center-bottom :member_index_data="member_index_data"></center-bottom>
	</view>
</template>

<script>
	// 个人中心页面
	import config from '@/api/config.js'
	import {request} from '@/api/reques.js'
	import { goWindow } from '@/api/navigate.js'  // 页面跳转
	import * as MemberApi from '@/api/member/member.js'
	import { goUrl } from '@/api/navigate.js'  // 页面跳转
	import {getwechatLogin} from '@/api/PersonalCenter/personal.js'
	import CenterHeader from './base/CenterHeader.vue'
	import CenterBody from './base/CenterBody.vue'
	import CenterBottom from './base/CenterBottom.vue'
	export default {
		data(){
			return{
				member_name:'',
				headimg:'',
				member_index_data : {},
				notice:[],
				bail_money:0,
				id_num:'',
				real_name:'',
			}
		},
		components: {
			CenterHeader,
			CenterBody,
			CenterBottom
		},
		onLoad(){
			let token = uni.getStorageSync('token');
			if(token == ""){
				goWindow("/pages/common/login")
			}
		},
		onShow() {
			let token = uni.getStorageSync('token');
			if(token !== ""){
				this.getMemberDetail()
				this.getMemberIndexData()
				this.getNoticeList()
				this.$children[0].realName()
			}
			
		},
		// 分享
		onShareAppMessage(res){
			if (res.from === 'menu') {
				return {
					title: '专业的二手商用车服务平台',
					path: 'pages/personalcenter/PersonalCenter'
				}
			}
			    
		},
		methods:{
			getMemberDetail(){
				let _this = this;
				MemberApi.getMemberInfo().then((res)=>{
					_this.member_name = res.data.user_info.nick_name;
					_this.headimg = config.domain + res.data.user_info.user_headimg;
					_this.bail_money = parseFloat(res.data.bail_money) + parseFloat(res.data.freeze_bail_money);
					_this.id_num = res.data.user_info.id_num;
					_this.real_name = res.data.user_info.real_name;
				})
			},
			
			getMemberIndexData(){
				let _this = this;
				MemberApi.getMemberIndexData().then((res)=>{
					_this.member_index_data = res.data;
				})
			},
			
			getNoticeList(){
				let _this = this;
				MemberApi.getNoticeList().then((res)=>{
					res.data.data.forEach((v,i)=>{
						var reg = new RegExp('<[^<>]+>','g');
						v.notice_content = v.notice_content.replace(reg ,"");
						
					}) 
					_this.notice = res.data.data
				})
			}
			
		}
	}
</script>

<style>
</style>
