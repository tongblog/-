<template>
	<view>
		<view class="field" v-if="cycle.length > 0">
			<swiper class="swiper">
				<swiper-item class="swiper-box" v-for="(item,index) in cycle" :key="index">
					<view class="swiper-item" :class="{item:index==idx}" :data-index="index" @tap="handleItem($event,item.action_id,item.start_time,item.end_time)">
						{{item.action_name}}<!-- <text>{{transferTime(item.start_time)}}</text>-<text>{{transferTime(item.end_time)}}</text> -->
					</view>	
				</swiper-item>	
			</swiper>
			
			<view class="field-rules" v-if="show1">
				<view class="countdown">
					距离结束还有:<text>{{hr1}}</text>:<text>{{min1}}</text>:<text>{{sec1}}</text>
				</view>
				<view class="rules"  @tap="handleRules">
					交易规则
				</view>
			</view>
		
			<view class="field-rules" v-if="show2">
				<view class="countdown">
					距离开始还有:<text>{{hr2}}</text>:<text>{{min2}}</text>:<text>{{sec2}}</text>
				</view>
				<view class="rules" @tap="handleRules">
					交易规则
				</view>
			</view>
		
			<list :oneList="oneList" :action_id="action_id" :show3="show3" :start_time="start_time" :end_time="end_time"></list>
		</view>
		<view class="about" v-else>
			<view class="img">
				<image lazy-load="true" src="../../../static/images/tishi.png" mode="scaleToFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	// 竞拍页面
	let timer = null;
	import List from "./list.vue"
	import {request} from '@/api/reques.js'
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	import {countdown} from "@/api/countdown.js"
	export default{
		data(){
			return{
				show1:false,
				show2:false,
				show3:false,
				hr1:"00",
				min1:"00",
				sec1:"00",
				hr2:"00",
				min2:"00",
				sec2:"00",
				cycle:[],
				idx:0,
				action_id:0,
				start_time:0,
				end_time:0,
				oneList:[],
				page_count:0
			}
		},
		components:{
			List
		},
		created() {
			this.getPromtionActionList(1);
				
		},
		methods:{
			// 场次
			handleItem(e,id,start,end){
				this.start_time = start;
				this.end_time = end;
				this.action_id = id;
				this.idx = e.currentTarget.dataset.index;
				this.changeShow()
				//console.log(id,start,end)
			},
			
			// 获取当天竞拍活动
			getPromtionActionList(page_index = 1){
				request("/index/getPromtionActionList",{},"GET")
				.then((res)=>{
					this.cycle = res.data.data;
					this.action_id = this.cycle[0].action_id;
					this.start_time = this.cycle[0].start_time;
					this.end_time =  this.cycle[0].end_time;
					this.changeShow()
					request("/index/getActionGoodsList",{
						page_index:page_index,
						page_size:10,
						promotion_id:this.action_id
					},"GET")
					.then((res)=>{
						let data = res.data.data.data;
						if(page_index > 1){
							data = this.oneList.concat(data)
						}
						this.oneList = data;
						this.page_count = res.data.data.page_count;
						this.$emit("changePage",page_index,this.page_count)
					})
				})
			},
			changeShow(){
				let date = Math.round(new Date().getTime()/1000);
				if(date < this.start_time){
					this.countdowns2(this.start_time);
					this.show2 = true;
					this.show1 = false;
					this.show3 = false;
				}else if(date < this.end_time){
					this.countdowns1(this.end_time);
					this.show1 = true;
					this.show2 = false;
					this.show3 = false;
				}else{
					this.show1 = false;
					this.show2 = false;
					this.show3 = true;
				}
			},
			countdowns1(time){
				const end = new Date(parseInt(time) * 1000)
				clearInterval(timer)
				timer = setInterval(async ()=>{
					let {hr,min,sec} = await countdown(end)
					if(sec){
						this.hr1 = hr;
						this.min1 = min;
						this.sec1 = sec
					}else{
						clearInterval(timer)
					}	  
				},1000)
			},
			countdowns2(time){
				const end =  new Date(parseInt(time) * 1000)
				clearInterval(timer)
				timer = setInterval(async ()=>{	
					let {hr,min,sec} = await countdown(end)
					if(sec){
						this.hr2 = hr;
						this.min2 = min;
						this.sec2 = sec
					}else{
						clearInterval(timer)
					}	  
				},1000)
			},
			
			// 转换时间
			transferTime(time){
				var date = new Date(parseInt(time) * 1000);
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let newDate = h+ ":" +m;
				return newDate
			},
			handleRules(){
				goWindow("/other_pages/help/index?help_id=",15)
			}
			
		}
	}
</script>

<style scoped lang="stylus">
	.about
		width 100%
		height 435rpx
		.img
			margin auto
			width 411rpx
			height 350rpx
			image
				width 100%
				height 100%
	.swiper
		height 84rpx
		background-color #F4F4F4
		.swiper-box
			width 50% !important
			text-align center
			.item
				background-color #0657A6
				color #FFFFFF !important
			.swiper-item
				line-height 84rpx
				font-size 32rpx
				color #222222
			
	.field-rules
		padding 20rpx
		border-bottom 1rpx #F4F4F4 solid
		text-align center
		.countdown
			display inline-block
			color #444444
			font-size 28rpx
			//font-weight 600
			text
				display inline-block
				width 42rpx
				border 1rpx solid #F4F4F4
				border-radius 10rpx
				line-height 42rpx
		.rules
			display inline-block
			float right
			width 109rpx
			border 1rpx #0657A6 solid
			color #0657A6
			line-height 42rpx
			font-size 21rpx
			border-radius 10rpx
			
	
</style>
