<template>
	<view class="refund">
		<view class="man-header">
			<view class="top">
				<view class="left">已解冻金额</view>
				<view class="right"><text>¥</text> {{bail_money}}</view>
			</view>
			<view class="bottom">
				<icon class="iconfont icon-jiancefengxian"></icon>
				<view class="txt">
					温馨提示：最大可退款金额为{{bail_money}}元
				</view>
			</view>
		</view>
		<view class="content">
			<view class="con-title">选择退款车源</view>
			 <checkbox-group @change="handleChange">
				<label  
					v-for="(item,index) in bailList" 
					:key="index" 
					style="margin-bottom: 20rpx;" 
					class="uni-list-cell">
					<checkbox :value="item.id" color="#FF7E1F" style="transform:scale(0.7)" />
					<view class="con-list">
						<view class="on">
							<text>{{item.create_time | changeTime}}</text>
						</view>
						<view class="down">
							<view class="goods-name">{{item.goods_name}}</view>
							<view class="goods-price">
								保证金:<text>{{item.bail_money}}元</text>
							</view>
						</view>
					</view>
				</label>
				
			</checkbox-group>
			
		</view>
		<view class="btn">
			<button type="primary" :disabled="show" @tap="bailRefund">确认退款</button>
		</view>
	</view>
</template>

<script>
	import * as MemberApi from "@/api/member/member.js"
	export default{
		data(){
			return{
				bailList:[],
				bailId:"",
				is_refund : 1,
				show:true,
				bail_money:0,
				page_index:1,
				page_count:0,
			}
		},
		onLoad(option) {
			this.bail_money = parseFloat(option.num);
			
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
			getData(){
				let _this = this;+
				// 是否可以退款
				MemberApi.isCantRefund().then( res => {
					_this.is_refund = res.data
				})
			},
			getBaillist(page_index = 1){
				MemberApi.getbaillist({
					page_index:page_index,
					page_size:10,
					type:1,
					status:1
				}).then((res)=>{
					let data = res.data.data;
					if(page_index > 1){
						data = this.bailList.concat(data)
					}
					this.bailList = data;
					this.page_count = res.data.page_count;
				})
			},
			// 选择
			handleChange(e){
				this.bailId = e.detail.value.join(",");
				this.bailId !== "" ? this.show = false : this.show = true
			},
			// 退款
			bailRefund(){
				let _this = this
				_this.$c.appletMessageNotify('verify_end', 1).then((res) => {
					MemberApi.bailApplyRefund({
						bail_id_str:_this.bailId
					}).then( res => {
						if(res.code > 0){
							_this.$c.msg('退款申请成功，请耐心等待审核')
							_this.getData()
						}else{
							_this.$c.msg(res.message)
						}
					})
					
				})
			},
		}
	}
</script>

<style scoped lang="stylus">
	.refund
		padding 30rpx 24rpx
		height 95vh
		.man-header
			border-radius 5rpx
			.top
				height 244rpx
				text-align center
				.left
					padding-top 20rpx
					font-size 30rpx
					color #222222
				.right
					font-size 90rpx
					color #CCCCCC
					text
						font-size 30rpx
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
					line-height 80rpx	
		.uni-list-cell::after
			position relative
		.content
			padding-top 35rpx
			.con-title
				padding-bottom 20rpx
				font-size 28rpx
				color #222222
				font-weight bold
			.con-list
				overflow hidden
				display inline-block
				padding 20rpx 23rpx
				width 100%
				box-shadow 0 0 10rpx 0 #CCCCCC
				border-radius 10rpx
				.on text
					font-size 24rpx
					color #CCCCCC
				.down
					overflow hidden
					.goods-name
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
		.btn 
			position fixed
			left 0
			right 0
			bottom 25rpx
			padding 0 25rpx
			button
				background-color #FF7E1F
</style>
