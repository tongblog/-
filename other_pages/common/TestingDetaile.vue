<template>
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
	</view>
</template>

<script>
	// 检测信息详情
	import config from '@/api/config.js';
	import * as MemberApi from "@/api/member/member.js"
	export default{
		data(){
			return{
				show:0,
				testInfo:[],
			}
		},
		
		onLoad(option) {
			/* let testInfo = JSON.parse(option.arr);
			this.show = JSON.parse(option.index);
			for(var key in testInfo){
				testInfo[key].child_list.forEach((value,index)=>{
					if(!value.testing_json)return
					value.testing_json = JSON.parse(value.testing_json)
					
				});
				this.testInfo = testInfo;
			} */
			this.getToView()
		},
		methods:{
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
			// 获取检测项
			getToView(){
				let _this = this;
				MemberApi.getTestItem()
				.then(res => {
					this.testInfo = res.data.data;
				})
			}
			
		}
	}
</script>

<style scoped lang="stylus">
	.uni-row
		padding 0 15rpx 
		border-bottom 20rpx #F4F4F4 solid
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
