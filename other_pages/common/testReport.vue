<template>
	<view class="detection">
		<view class="detection-cont">
			<view class="detection-list" v-for="(item,index1) in testing_info" :key="index1">
				<view class="list-imgs">
					<image 
						style="width: 100%; height: 100%;" 
						lazy-load="true" 
						@error="handleErr($event,index)" 
						:src="item.user_headimg | filterImg" 
						mode="scaleToFill"></image>
				</view>
				<view class="list-content">
					<view class="title">
						<text class="name">{{item.nick_name}}</text>
						<text class="level">{{item.testing_level}}</text>
					</view>
					<view class="introduce" @tap.stop="handleCertificate(item.testing_auth_img)">
						<text class="describe">{{item.testing_desc}}</text>
						<text class="certificate">【点击查看资格证书】</text>
					</view>
					<view class="address">
						<text>所在地区：</text>
						<text>{{item.testing_province_name}}{{item.testing_city_name}}</text>
					</view>
					<view class="price">
						<text>收费标准：</text>
						<text>{{item.testing_charge}}</text>
					</view>
				</view>
			</view>				
			<view class="ifm-content" v-for="(item1,index) in order_testing" :key="index">
				<view class="cont-title">
					<view class="headline">经过专业检测</view>
					<view class="score">
						综合评分：<text>{{item1.testing_num}}分</text>
					</view>
				</view>
				<view class="uni-flex uni-column">
					<view class="flex-item">
						{{item1.testing_remark}}
					</view>	
				</view>
			</view>	
		</view>
		<view class="testing">
			<view class="uni-flex uni-row">
				<view class="flex-item" v-for="(item,index) in testInfo" :key="index" :class="{boredrBtn:show == index}" @tap="handleChange(index)">{{item.name}}</view>
			</view>
			<view class="uni-flex uni-column">
				<view class="flex-item" v-if="show == index" v-for="(list,index) in testInfo" :key="index">
					<view class="list" v-for="(child,idx) in list.child_list" :key="idx">
						<text class="left">{{child.name}}</text>
						<view class="mark" v-if="child.testing_json">
							<text>{{child.testing_json.testing_desc}}</text>
							<icon class="iconfont icon-jiancezhaopian" @tap="handleImg(child.testing_json.img_arr)" v-if="child.testing_json.img_arr[0]"></icon>
							<icon class="iconfont icon-jiancefengxian"></icon>
						</view>
						<icon class="iconfont icon-jiancequeding" v-if="!child.testing_json"></icon>
					</view>
					
				</view>
				
			</view>
			
			
			<!-- <view class="uni-flex uni-row">
				<view class="flex-item">外观检测</view>
			</view>
			<view class="uni-flex uni-column">
				<view class="flex-item">
					<view class="list">
						<text class="left">水箱</text>
						<view class="mark">
							<text>有问题</text>
							<icon class="iconfont icon-jiancezhaopian"></icon>
							<icon class="iconfont icon-jiancefengxian"></icon>
						</view>
						<icon class="iconfont icon-jiancequeding" v-if="false"></icon>
					</view>
					
				</view>
				
			</view> -->
		</view>	

		
	</view>
</template>

<script>
	import * as MemberApi from '@/api/member/member.js';
	import config from '@/api/config.js';
	export default{
		data(){
			return{
				show:0,
				testInfo:[],
				testing_info:[],
				order_testing:[],
			}
		},
		onLoad(option) {
			let orderId = option.id;
			this.getTestingInfoAndMark(orderId)
		},
		filters:{
			filterImg(value){
				if(value){
					return config.domain + value
				}
			}
		},
		methods:{
			getTestingInfoAndMark(order_id){
				let _this = this;
				MemberApi.getOrderTestingInfoAndMark({
					order_id:order_id
				})
				.then(res => {
					console.log(res)
					let testing_info = res.data.testing_info;
					let order_testing = res.data.mark_info.order_testing_info;
					_this.testing_info.push(testing_info);
					_this.order_testing.push(order_testing);
					let testInfo = res.data.mark_info.testing_list.data;
					for(var key in testInfo){
						testInfo[key].child_list.forEach((value,index)=>{
							if(!value.testing_json)return
							value.testing_json = JSON.parse(value.testing_json)
							
						});
						_this.testInfo = testInfo;
					}
				})
			},
			handleChange(id){
				this.show = id
			},
			handleImg(img_arr){
				let arrImg = [];
				img_arr.forEach((img,index)=>{
					arrImg.push(config.domain + img)
				})
				uni.previewImage({
					urls: arrImg,
					loop: true,
				});
			},
			handleCertificate(testingAuth){
				uni.previewImage({
					urls: [config.domain + testingAuth],
					loop: true,
				});
				
			},
		}
	}
</script>

<style scoped lang="stylus">
	.detection-cont	
		padding 15rpx 24rpx
		.detection-list
			padding-bottom 30rpx
			background-color #FFFFFF
			.list-imgs
				overflow hidden
				display inline-block
				width 153rpx
				height 153rpx
				vertical-align middle
				border-radius 10rpx
			.list-content
				display inline-block
				vertical-align middle
				margin-left 3%
				.title .name
					font-size 28rpx
					font-weight bold
					color #222222
				.title .level
					margin-left 22rpx
					font-size 22rpx
					color #444444
				.introduce .describe
					font-size 24rpx
					color #000
					overflow hidden
					display inline-block
					width 240rpx
					vertical-align middle
					text-overflow ellipsis
					white-space nowrap
				.introduce .certificate
					color #2E70D2
					font-size 24rpx
				.address
					font-size 22rpx
					color #222
				.price
					font-size 22rpx
					color #222
				.price text:nth-child(2)
					color #FF1A1A
		.ifm-content 
			padding 10rpx 21rpx
			border-radius 15rpx
			box-shadow:0rpx 0rpx 10rpx #CCCCCC;
			.cont-title 
				display flex
				.headline
					width 70%
					color #222
					font-size 26rpx
					font-weight bold
				.score	
					width 30%
					color #222
					font-size 24rpx
					text-align right
					text
						color #FF1A1A
			.uni-flex .flex-item
				font-size 24rpx
				color #444444			
	.uni-row
		padding 0 15rpx 
		margin-top 15rpx
		background-color #F4F4F4
		justify-content space-between
		.boredrBtn
			border-bottom 2rpx #0657A6 solid
			color #0657A6 !important
		.flex-item
			width 16%
			height 70rpx
			color #444444
			font-size 24rpx
			text-align center
			line-height 70rpx
	.uni-column
		padding 0 24rpx
		.flex-item
			height 80rpx
			.list
				display flex
				justify-content space-between
				border-bottom 1rpx #EEEEEE solid
				.left
					line-height 80rpx
					font-size 26rpx
					color #222222
				.icon-jiancequeding
					line-height 80rpx
					color #4BC44B
					font-size 26rpx	
				.mark text
					margin-right 15rpx
					line-height 80rpx
					font-size 26rpx
					color #777777
				.icon-jiancefengxian
					color #FF2323
					font-size 26rpx
				.icon-jiancezhaopian
					margin-right 15rpx
					color #777777
					font-size 26rpx		
</style>
