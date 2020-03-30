<template>
	<view class="amount">
		<view class="man-header">
			<view class="top">
				<view class="left">冻结金额</view>
				<view class="right"><text>¥</text>{{freeze_money}}</view>
			</view>
			<view class="bottom">
				<icon class="iconfont icon-jiancefengxian"></icon>
				<view class="txt">
					温馨提示: 解冻被冻结金额,请尽快<text @tap="handleText">联系客服</text>付定金！
				</view>
			</view>
		</view>
		<view class="content">
			<view class="con-title">冻结金额明细</view>
			<view class="con-list" v-for="(item,index) in bailList" :key="index">
				<view class="on">
					<text>{{item.create_time | changeTime}}</text>
					<text class="txt" @tap="handleDetail(item.go_status)">查看订单详情</text>
				</view>
				<view class="down">
					<view class="goods-name">{{item.goods_name}}</view>
					<view class="goods-price">
						保证金:<text>{{item.bail_money}}元</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {goWindow} from "@/api/navigate.js"
	import {callPhone} from "@/api/callphone.js"
	import * as MemberApi from "@/api/member/member.js"
	export default{
		data(){
			return{
				bailList:[],
				freeze_money:0,
				page_index:1,
				page_count:0,
			}
		},
		onLoad(option) {
			this.freeze_money = parseFloat(option.num);
			
		},
		onShow() {
			this.getBaillist()
		},
		// 上拉加载
		onReachBottom(){
			if (this.page_index < this.page_count) {
				this.page_index++;
				getBaillist(this.page_index)
			}else{
				return
			}
			
		},
		filters:{
			changeTime(time){
				var date = new Date(parseInt(time) * 1000);
				let m = date.getMonth()+1;
				m = m < 10 ? ('0' + m) : m;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let newDate = m+ "月" + d + "日";
				return newDate
			}
		},
		methods:{
			getBaillist(page_index = 1){
				MemberApi.getbaillist({
					page_index:page_index,
					page_size:10,
					type:1,
					status:2
				}).then((res)=>{
					let data = res.data.data;
					if(page_index > 1){
						data = this.bailList.concat(data)
					}
					this.bailList = data;
					this.page_count = res.data.page_count;
				})
			},
			handleText(){
				callPhone().then((res)=>{
					try{
						uni.makePhoneCall({
						    phoneNumber: res.data.data.value.tel_service_addr
						});
					}catch(err){
						console.log(err)
					}
					
				})
			},
			// 页面跳转
			handleDetail(go_status){
				if(go_status == 2){
					goWindow("/other_pages/member/offer_records/index")
				}else if(go_status == 1){
					goWindow("/other_pages/member/offer_records/index")
				}
			}
		}
	}
</script>

<style scoped lang="stylus">
	.amount
		padding 30rpx 24rpx
		height 95vh
		
		.man-header
			box-shadow 0 0 5rpx 0 #CCCCCC
			border-radius 5rpx
			.top
				display flex
				height 244rpx
				text-align center
				.left
					width 50%
					font-size 38rpx
					line-height 244rpx
					color #CCCCCC
				.right
					width 50%
					font-size 90rpx
					line-height 244rpx
					color #CCCCCC
					text
						font-size 32rpx
			.bottom
				border-top 1rpx #EEEEEE solid
				padding 0 5rpx
				icon
					color #444444
				.txt
					display inline-block
					margin-left 15rpx
					color #444444
					font-size 26rpx
					line-height 90rpx
					text
						color #1980E4	
		.content
			padding-top 60rpx
			.con-title
				padding-bottom 10rpx
				font-size 28rpx
				color #222222
				font-weight bold
			.con-list:nth-last-child(1)
				margin-bottom 80rpx
			.con-list
				padding 25rpx 0
				border-bottom 1rpx #E1E1E1 solid
				.on text
					font-size 24rpx
					color #CCCCCC
				.on text.txt
					float right
					color #1980E4
				.down
					display flex
					justify-content space-between
					.goods-name
						width 70%
						overflow hidden
						text-overflow ellipsis
						white-space nowrap
						font-size 26rpx
						color #222222
					.goods-price	
						font-size 26rpx
						color #222222
						text
							color #FF7E1F
</style>
