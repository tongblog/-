<template>
	<!-- #ifdef MP-WEIXIN -->
	
	<view>
		<view class='header'>
			<image src='../../static/images/vx.png'></image>
		</view>
		<view class='content'>
			<view>申请获取以下权限</view>
			<text>路运二手车将获得你的手机号</text>
		</view>
		
		<button 
			class='bottom' 
			type='primary' 
			open-type="getPhoneNumber" 
			withCredentials="true" 
			lang="zh_CN" 
			@getphonenumber="getphonenumber">
			获取手机号
		</button>
	</view>
	
	<!-- #endif -->
</template>

<script>
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	import {request} from '@/api/reques.js'
	 export default {
	        data() {
	            return {
	               option:{},
	            };
	        },
	        methods: {
				// 获取用户手机号
				getphonenumber(e){
					if(e.detail.errMsg.split(":")[1] !== "ok"){
						uni.navigateBack({
						   delta: 1
						});
					}else{
						let _this = this;
						let encryptedData = e.detail.encryptedData;
						let iv = e.detail.iv;
						// 1.wx获取登录用户code
						uni.login({
						  provider: 'weixin',
						  success(loginRes) {
							 //2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						    request('/login/getWechatInfo',{
						    	code:loginRes.code,
						    },'POST')
							.then((res)=>{
								let sessionKey = JSON.parse(res.data.data).session_key;
								//console.log(sessionKey)
								request("/login/getWechatInfos",{
									sessionKey: sessionKey,
									encryptedData: encryptedData,
									iv:iv
								},'POST')
								.then((res)=>{
									//console.log(res)
									let phone = JSON.parse(res.data.data).phoneNumber
									//console.log(phone)
									request("/member/bindMemberMobile",{
										token:uni.getStorageSync('token'),
										mobile:phone
									},"POST")
									.then((res)=>{
										if(res.data.data > 0){
											let pages = getCurrentPages()
											wx.navigateBack({
												success(){
													pages[pages.length-2].onLoad(_this.option)
												}
											});
										}
										//console.log(res)
									})
								})
							})
						  }
						});
						
							
					}
				}
					
	        },
			
	        onLoad(option) {//默认加载
				this.option = option;
				//console.log(option)
				let _this = this;
	            let toKen = uni.getStorageSync('token');
				if(toKen !== ''){
					request("/member/isbindmobile",{
							token:uni.getStorageSync('token'),
						},"POST")
						.then((res)=>{
							if(res.data.data === 1){
								let pages = getCurrentPages()
								wx.navigateBack({
								    success(){
										pages[pages.length-2].onLoad()
									}
								});
							}
						})
				    }else{
						goWindow('/pages/common/login')
				    }
				}
		}
</script>

<style scoped>
	 .header {
	        margin: 90rpx 0 90rpx 50rpx;
	        border-bottom: 1px solid #ccc;
	        text-align: center;
	        width: 650rpx;
	        height: 300rpx;
	        line-height: 450rpx;
	    }
	
	    .header image {
	        width: 200rpx;
	        height: 200rpx;
	    }
	
	    .content {
	        margin-left: 50rpx;
	        margin-bottom: 90rpx;
	    }
	
	    .content text {
	        display: block;
	        color: #9d9d9d;
	        margin-top: 40rpx;
	    }
	
	    .bottom {
			background-color: #0657A6;
	        border-radius: 80rpx;
	        margin: 70rpx 50rpx;
	        font-size: 35rpx;
	    }
</style>
