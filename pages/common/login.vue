<template>
	<!-- #ifdef MP-WEIXIN -->
	<view v-if="isCanUse">
		<view>
			<view class='header'>
				<image src='../../static/images/vx.png'></image>
			</view>
			<view class='content'>
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像、地区等)</text>
			</view>
			<view class="denglu">
				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
					授权登录
				</button>
				<button class="btmleft" type="primary" @tap="tapGetback">暂不登录</button>
			</view>
			
		</view>
	</view>
	<!-- #endif -->
</template>

<script>
	import {request} from '@/api/reques.js'
	 export default {
	        data() {
	            return {
	                isCanUse: uni.getStorageSync('isCanUse') || true,//默认为true
					encrypted:'',
					iv:'',
					sessionKey:'',
					openId:"",
					token:'',
					option:{},
	            };
	        },
	        methods: {
	            //第一授权获取用户信息===》按钮触发
	            wxGetUserInfo() {
					this.login();
					
	            },
	
	　　　　　　//登录
	            login() {
					let _this = this;
					uni.showLoading({
						title: '登录中...'
					});
	             
	               // 1.wx获取登录用户code
	                uni.login({
	                    provider: 'weixin',
	                    success(loginRes) {
							//console.log(loginRes.code)
	                        //2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
							request('/login/getWechatInfo',{
								code:loginRes.code,
							},'POST')
							.then((res)=>{
								//openId、或SessionKdy存储//隐藏loading
								//console.log(res)
								_this.sessionKey = JSON.parse(res.data.data).session_key;
								uni.setStorageSync('sessionKey', _this.sessionKey);
								uni.getUserInfo({
								    provider: 'weixin',
								    success(infoRes) {
										//console.log(infoRes)
										_this.encrypted = infoRes.encryptedData;
										_this.iv = infoRes.iv;
								        try {
								            uni.setStorageSync('isCanUse', false);//记录是否第一次授权  false:表示不是第一次授权
											_this.updateUserInfo();
											
								        } catch (e) {
											//console.log(e)
										}
								    },
								    fail(res) {
										//console.log(res)
										uni.showModal({
										    title: '提示',
										    content: '您已拒绝授权,请重新点击并授权!',
											showCancel:false,
											confirmColor:"#0657A6",
										    success(res){
										        if (res.confirm) {
										            console.log('用户点击确定');
										        } 
										    }
										});
										/* uni.navigateBack({
										    delta: 1
										}); */
			
									}
								});
								//console.log(_this.sessionKey);
								uni.hideLoading();
							})
	                    },
	                });
	            },
	         //向后台更新信息
				updateUserInfo() {
	                let _this = this;
					request('/login/getWechatInfos',{
						sessionKey : _this.sessionKey,
						encryptedData : _this.encrypted,
						iv : _this.iv,
					},'POST')
					.then((res)=>{
						_this.openId = JSON.parse(res.data.data).openId;
						request('/login/wechatLogin',{
							wx_info : res.data.data,
							openid : _this.openId,
						},"POST")
						.then((tokenres)=>{  // 获取用户Token
							_this.token = tokenres.data.data.token
							//console.log(tokenres)
							try{
								uni.setStorageSync('token',_this.token);
								if (tokenres.data.message == "success") {
									let pages = getCurrentPages()
									wx.navigateBack({
									    success(){
											pages[pages.length-2].onLoad(_this.option)
										}
									});
								}
							} catch(err){
								
							}
						})
					})

	            },
				tapGetback(){
					uni.navigateBack({
					    delta: 1
					});
				}
			
	        },
			
	        onLoad(option) {//默认加载
				this.option = option;
				let toKen = uni.getStorageSync('token');
				//console.log(option)
				if(toKen !== ''){
					uni.navigateBack({
				       delta: 1
					});
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
		.denglu {
			margin: 70rpx 50rpx;
		}
		button::after {
		 border: none;
		}
		.btmleft{
			margin-top: 20rpx;
			background-color: #FFFFFF;
			font-size: 30rpx;
			border-radius: 80rpx;
			color: #0657A6;
		}
	    .bottom {
			background-color: #0657A6;
			border-radius: 80rpx;
	        font-size: 30rpx;
	    }
</style>
