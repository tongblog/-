<template>
	<view class="center-header">
		<image src="../../../static/images/storebj.png" mode="scaleToFill"></image>
		<view class="personal uni-flex uni-row">
			<view class="portrait">
				<image v-if="headimg" :src="headimg" @error="handleErr" mode="scaleToFill"></image>
				<image v-else src="../../../static/images/toux.png" @error="handleErr" mode="scaleToFill"></image>
			</view>
			<view class="net-real">
				<view class="net-name" v-if="member_name">{{ member_name }}</view>
				<view class="net-login" @tap="handleLogin" v-else>请点击登录</view>
				<view class="real-name" @tap="handleName"><rich-text :nodes="nodes"></rich-text></view>
			</view>
			<view class="real-succ" v-if="mark">
				<view class="succ-item">
					<view class="succ-title">
						<icon class="iconfont icon-guanbi1" @tap="handlerMark"></icon>
					</view>
					<view class="succ-content">
						<view class="real-item">
							<text>姓名</text>
							<input class="uni-input" placeholder-style="color:#222222" :value="real_name" disabled="true" placeholder="请选择" />
						</view>
						<view class="real-item">
							<text>身份证号</text>
							<input class="uni-input" placeholder-style="color:#222222" :value="id_num" disabled="true" placeholder="请选择" />
						</view>
					</view>
					<view class="real-img">
						<image src="../../../static/images/realsucc.png" mode="scaleToFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="center-nav uni-flex uni-row">
			<view class="flex-item" v-on:click="goWindow('/other_pages/member/collectiongoods/index')">
				<view class="num" >{{ member_index_data.fav_goods || 0}}</view>
				<view class="num">收藏夹</view>
			</view>
			<view class="flex-item" v-on:click="goWindow('/other_pages/member/collectionshop/index')">
				<view class="num">{{ member_index_data.fav_shop || 0}}</view>
				<view class="num">关注店铺</view>
			</view>
			<view class="flex-item" v-on:click="goWindow('/other_pages/member/newmypath/index')">
				<view class="num">{{ member_index_data.browse_count || 0}}</view>
				<view class="num">足迹</view>
			</view>
			<view class="flex-item"  v-on:click="goWindow('/pages/payDeposit/management')">
				<view class="num">{{bail_money || 0}}</view>
				<view class="num">保证金</view>
			</view>
		</view>
	</view>
</template>

<script>
import { request } from '@/api/reques.js';
import { goWindow } from '@/api/navigate.js'  // 页面跳转
export default {
	props: {
		member_name: {
			type: String
		},
		headimg: {
			type: String
		},
		bail_money:{
			type:Number
		},
		member_index_data: {
			type: Object,
			// 对象或数组默认值必须从一个工厂函数获取
			default: function() {
				return {};
			}
		},
		id_num:{
			type:String,
		},
		real_name:{
			type:String,
		}
	},

	data() {
		return {
			nodes: [
				{
					name: 'div',
					attrs: {
						class: 'div-class',
						style: ''
					},
					children: [
						{
							type: 'text',
							text: '未实名认证'
						}
					]
				}
			],
			mark:false,
		};
	},
	created() {
		//this.realName();
	},

	methods: {
		realName() {
			let _this = this;
			request(
				'/member/isBindId',
				{
					token: uni.getStorageSync('token')
				},
				'POST'
			).then(res => {
				if (res.data.data === 1) {
					_this.nodes[0].children[0].text = '已实名认证';
				}
			});
		},
		handleName(){
			let _this = this;
			request("/member/isBindId",{
				token:uni.getStorageSync('token')
			},"POST")
			.then((res)=>{
				if(res.data.data > 0){
					//_this.$c.msg("您已实名认证");
					_this.mark = true;
				}else{
					goWindow("/other_pages/RealName/RealName")
				}
			})
		},
		handleErr(e){
			if(e.type == "error"){
				this.headimg = "../../../static/images/toux.png"
			}
		},
		goWindow(url){
			let toKen = uni.getStorageSync('token');
			if(toKen !== ""){
				goWindow(url)
			}else{
				this.$c.msg("请先登录")
			}
			
		},
		handleLogin(){
			goWindow("/pages/common/login")
		},
		// 关闭弹窗
		handlerMark(){
			this.mark = false;
		}
	}
};
</script>

<style scoped lang="stylus">
.center-header
	position relative
	height 260rpx
	image
		width 100%
		height 100%
	.personal
		position absolute
		top 0
		padding 1rpx 34rpx
		.portrait
			overflow hidden
			width 108rpx
			height 108rpx
			border-radius 50%
			image
				width 100%
				height 100%
		.net-real
			margin-left 32rpx
			.net-name
				margin-top 10rpx
				color #FFFFFF
				font-weight 600
				font-size 32rpx
				letter-spacing 5rpx
			.net-login
				margin-top 10rpx
				color #222222
				font-weight 600
				font-size 30rpx
			.real-name
				padding 0 12rpx
				max-width 100rpx
				background-color #FFFFFF
				border-radius 20rpx
				color #0657A6
				font-size 20rpx
		.real-succ
			position fixed
			top 0
			bottom 0
			left 0
			right 0
			z-index 100
			background-color rgba(0,0,0,.4)
			.succ-item
				overflow hidden
				position absolute
				left 0
				right 0
				top 0
				bottom 0
				margin auto
				width 500rpx
				height 320rpx
				background-color #fff
				border-radius 10rpx
				.succ-title
					background-color #f4f4f4
					text-align right
					.icon-guanbi1
						padding 0 15rpx
						font-size 36rpx
						color #006BB3
				.succ-content .real-item
					border-bottom 1rpx #f4f4f4 solid
					.uni-input
						display inline-block
						width 60%
						background-color transparent
						vertical-align middle
						color #444444
						font-size 26rpx
					text
						display inline-block
						width 30%
						text-indent 1rem
						color #222
						font-size 26rpx
						vertical-align middle
				.real-img
					height 50rpx
					image
						width 69%
						height 100%
						padding 20rpx 78rpx
						opacity .6
					
	.center-nav
		position absolute
		bottom 58rpx
		width 100%
		color #fefefe
		font-size 24rpx
		text-align center
		.flex-item
			width 33.3%
			.num
				line-height 38rpx
</style>
