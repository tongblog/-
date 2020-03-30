<template>
	<view class="offer-list">
		<view class="offer-data" v-if="records.length > 0 && !show">
			<view class="offer-title">抢购中...</view>
			<view class="uni-flex uni-row">
				<view class="flex-item" v-for="(item,index) in records" :key="index">
					<view class="on">{{item.nick_name}}</view>
					<view class="down">¥{{item.offer_price}}</view>
					<view class="top" v-if="item.status == 3">最高价</view>
					<view class="top" v-if="item.status == 0">出局</view>
				</view>
				
			</view>
		</view>
		
		<view class="offer-explain" :class="{bordertop:show}">
			<view class="explain">
				<text class="before">类型</text>
				<text class="after">增价购</text>
			</view>
			<view class="explain">
				<text class="before">起购价</text>
				<text class="after">¥{{price}}万</text>
			</view>
			<view class="explain">
				<text class="before">保证金</text>
				<text class="after">¥{{money}}</text>
			</view>
			<view class="explain">
				<text class="before">加价幅度</text>
				<text class="after">¥{{add_price}}</text>
			</view>
			<view class="explain">
				<text class="before">开始时间</text>
				<text class="after">{{transferTime(start_time)}}</text>
			</view>
			<view class="explain">
				<text class="before">结束时间</text>
				<text class="after">{{transferTime(end_time)}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			show:{
				type:Boolean
			},
			records:{
				type:Array
			},
			price:{
				type:String
			},
			add_price:{
				type:Number
			},
			money:{
				type:String
			},
			start_time:{
				type:Number
			},
			end_time:{
				type:Number
			}
		},
		methods:{
			transferTime(time){
				var date = new Date(parseInt(time) * 1000);
				let m = date.getMonth()+1;
				m = m < 10 ? ('0' + m) : m;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let min = date.getMinutes();
				min = min < 10 ? ('0' + min) : min;
				let newDate = m+ "-" +d+ " " +h+ ":" + min;
				return newDate
			}
		}
	}
</script>

<style scoped lang="stylus">
	.offer-list
		border-bottom 20rpx #F4F4F4 solid
		.bordertop
			border-top 20rpx #F4F4F4 solid
		.offer-explain
			display flex
			flex-wrap wrap
			padding 24rpx
			.explain
				display flax
				width 50%
				font-size 24rpx
				.before
					display inline-block
					width 50%
					color #777777
				.after
					display inline-block
					width 50%
					color #222222
		.offer-data
			background-color #F4F4F4
			.offer-title
				padding 10rpx 24rpx
				color #222222
				font-size 28rpx
				font-weight bold
			.uni-row
				padding 0 15rpx 20rpx 15rpx
				justify-content space-between
				.flex-item:nth-child(1)
					border 1rpx #FF7E1F solid
					color #FF7E1F
				.flex-item:nth-child(1) .top	
					position absolute
					top -15rpx
					left -1rpx
					padding 0 8rpx
					background-color #FF7E1F
					border-radius 0
					color #FFFFFF
					font-size 20rpx
				.flex-item
					position relative
					width 29%
					padding 16rpx 16rpx 0 0
					border 1rpx #AAAAAA solid
					color #444444
					text-align right
					.on
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						font-size 26rpx
						line-height 26rpx
					.down
						font-size 32rpx
						font-weight bold
						line-height 50rpx
					.top	
						position absolute
						top -1rpx
						left -1rpx
						padding 0 8rpx
						background-color #AAAAAA
						border-bottom-right-radius 10rpx
						color #FFFFFF
						font-size 20rpx
</style>