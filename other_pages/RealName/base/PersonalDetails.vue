<template>
	<view class="personal-details">
		<view class="details-title">请核对以下信息</view>
		<view class="uni-flex uni-column">
			<view class="flex-item">
				<text>姓名</text>
				<input type="text" :value="name" placeholder="上传后自动识别" />
			</view>
			<view class="flex-item">
				<text>证件号码</text>
				<input type="idcard" :value="num" placeholder="上传后自动识别" />
			</view>
		</view>
		<button type="primary" :disabled="show" @tap="clickDetermine">确定</button>
	</view>
</template>

<script>
	import {request} from '@/api/reques.js'
	export default{
		props:{
			name:{
				type:String,
				default:''
			},
			num:{
				type:String,
				default:''
			},
			idJson1:{
				type:Object,
			},
			imgSrc1:{
				type:String,
			},
			imgSrc2:{
				type:String,
			},
			show:{
				type:Boolean,
				default:true,
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			clickDetermine(){
				request('/member/addMemberIdCard',{
					token: uni.getStorageSync('token'),
					face_img_url:this.imgSrc1,
					back_img_url:this.imgSrc2,
					real_name:this.name,
					id_num:this.num,
					id_json:JSON.stringify(this.idJson1)
				},'POST')
				.then((res)=>{
					if(res.data.data === 1){
						uni.setStorageSync('shenfen_key',res.data.data);
						uni.showToast({
						    title: '实名认证成功',
							icon:'none',
						    duration: 3000,
						});
						setTimeout(()=>{
							uni.navigateBack({
							    delta: 1
							});
						},2000)
					}
				})
			}
		}
	}
</script>

<style scoped lang="stylus">
	.personal-details
		position relative
		padding 0 24rpx
		background-color #FFFFFF
		button
			position absolute
			bottom -30vh
			width 93vw
			background-color #0657A6
			font-size 34rpx
		.details-title
			padding 20rpx 0
			font-size 30rpx
			color #222222
			font-weight 600
		.uni-flex .flex-item
			display flex
			border-bottom 2rpx #EEEEEE solid
			text
				width 30%
				font-szie 28rpx
				color #222222
				line-height 80rpx
			input
				width 70%
				height 80rpx
</style>
