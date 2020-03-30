<template>
	<view class="order-time">
		<view class="order-content" :class="{orderHeight:order_time}">
			<view class="order-title">
				<text>Hi , 您想什么时间看车？</text>
				<icon @tap="handleClose" class="iconfont icon-guanbi"></icon>
			</view>
			<view class="fiveday">
				<!-- <view 
					class="day-list" 
					v-for="(item,index) in dayList"
					:key="index"
					:class="{oneday:num == item.day}" 
					:data-num="item.day"
					@tap="handleDay">
					<view class="on" :class="{one:num == item.day}">{{getEvery(index).week}}</view>
					<view class="down" :class="{one:num == item.day}">{{getEvery(index).monthAay}}</view>
				</view> -->
				<view class="day-list" :class="{oneday:num == 1}" data-num="1" @tap="handleDay">
					<view class="on" :class="{one:num == 1}">{{getEvery(0).week | filterWeek1}}</view>
					<view class="down" :class="{one:num == 1}">{{getEvery(0).monthAay}}</view>
				</view>
				<view class="day-list" :class="{oneday:num == 2}" data-num="2" @tap="handleDay">
					<view class="on" :class="{one:num == 2}">{{getEvery(1).week | filterWeek2}}</view>
					<view class="down" :class="{one:num == 2}">{{getEvery(1).monthAay}}</view>
				</view>
				<view class="day-list" :class="{oneday:num == 3}" data-num="3" @tap="handleDay">
					<view class="on" :class="{one:num == 3}">{{getEvery(2).week}}</view>
					<view class="down" :class="{one:num == 3}">{{getEvery(2).monthAay}}</view>
				</view>
				<view class="day-list" :class="{oneday:num == 4}" data-num="4" @tap="handleDay">
					<view class="on" :class="{one:num == 4}">{{getEvery(3).week}}</view>
					<view class="down" :class="{one:num == 4}">{{getEvery(3).monthAay}}</view>
				</view>
				<view class="day-list" :class="{oneday:num == 5}" data-num="5" @tap="handleDay">
					<view class="on" :class="{one:num == 5}">{{getEvery(4).week}}</view>
					<view class="down" :class="{one:num == 5}">{{getEvery(4).monthAay}}</view>
				</view>
			</view>
			<view class="timer">
				 <picker-view class="scroll" :indicator-style="indicatorStyle" :value="value" @change="changrTimer">
					<picker-view-column>
						<view class="hour" v-for="(item,index) in hours" :key="index">{{item}}时</view>
					</picker-view-column>
					<text style="color: #FFF;">::</text>
					<picker-view-column>
						<view class="minute hour" v-for="(item,index) in minutes" :key="index">{{item}}分</view>
					</picker-view-column>
				</picker-view>
			</view>
			<view class="prompt">看车时间不便时 , 可随时取消哦</view>
			<view class="btn">
				<view class="ensure" @tap="handleSure">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			const nowDate = new Date();
			let hour = nowDate.getHours();
			let minute = nowDate.getMinutes();
			const hours = []
			const minutes = []
			for(let i = 0;i <= 23;i++){
				i = i > 9 ? i : '0' + i
				hours.push(i)
			}
			for(let i = 0;i <= 59;i++){
				i = i > 9 ? i : '0' + i
				minutes.push(i)
			}
			return{
				indicatorStyle:`background-image:linear-gradient(#65A3E0, #0657A6, #65A3E0);z-index:-1;`,
				maskStyle:``,
				hour,
				hours,
				minutes,
				minute,
				num:1,
				order_time:false,
				monthAay:"",
				year:"",
				time:[0,0],
				value:[hour,minute],
				dayList:[
					{
						day:1,
					},{
						day:2,
					},{
						day:3,
					},{
						day:4,
					},{
						day:5,
					}
				],
				
			}
		},
		created() {
			this.order_time = true
		},
		filters:{
			filterWeek1(str){
				if(str){
					return "今天"
				}
			},
			filterWeek2(str){
				if(str){
					return "明天"
				}
			}
		},
		methods:{
			handleDay(e){
				this.num = e.currentTarget.dataset.num;
				
			},
			changrTimer(e){
				const val = e.detail.value;
				this.hour = this.hours[val[0]];
				this.minute = this.minutes[val[1]];
			},
			getEvery(day){
				let toDay = new Date();
				let weekDayArr=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
				toDay.setTime(toDay.getTime() + day*24*60*60*1000)
				this.year = toDay.getFullYear()
				let monthAay = (toDay.getMonth()+1) + "月" + toDay.getDate() + "日";
				let week = weekDayArr[toDay.getDay()]; 
				
				return {
					monthAay,
					week
				}
			},
			// 关闭
			handleClose(){
				this.$emit("handleClose",false)
			},
			// 约定时间
			handleSure(){
				this.monthAay = this.getEvery(this.num-1).monthAay;
				let reg = /\d+/g;
				let months = this.monthAay.match(reg).join("-");
				let date = this.year+"-"+months+" "+this.hour+":"+this.minute+":"+"00";
				if(new Date(date) <= new Date()){
					this.$c.msg("您选择的时间已过")
				}else{
					this.$emit("handleDate",date)
				}
			}
			
		}
	}
</script>

<style scoped lang="stylus">
	.order-time
		position fixed
		top 0
		bottom 0
		left 0
		right 0
		z-index 910
		background-color rgba(0,0,0,.5)
		.orderHeight
			height 600rpx !important
		.order-content
			position absolute
			bottom 0
			left 0
			right 0
			height 0
			transition .3s
			background-color #FFFFFF
			.order-title
				position relative
				border-bottom 1rpx solid #F4F4F4
				text-align center
				line-height 80rpx
				text
					font-size 30rpx
					color #333
				icon
					position absolute
					right 0
					padding-right 25rpx
					font-size 26rpx
					color #666
			.fiveday
				display flex
				border-bottom 1rpx solid #F4F4F4
				.oneday
					background-color rgba(6,87,166,.1)
				.day-list
					width 20%
					padding 10rpx 0
					text-align center
					.one
						color #0657A6 !important
					.on
						font-size 26rpx
						color #666
					.down
						font-size 26rpx
						color #666
			.timer
				display flex
				overflow hidden
				width 50%
				height 200rpx
				margin auto
				flex-wrap wrap
				.scroll
					width 100%
					height 200rpx
					text-align center
					color #FFFFFF
					.hour
						line-height 68rpx
						
			.prompt
				text-align center
				font-size 26rpx
				color #333333
			.btn 
				padding 20rpx 25rpx 0
				.ensure
					width 680rpx
					margin auto
					border-radius 10rpx
					background-color #0657A6
					color #FFFFFF
					text-align center
					line-height 80rpx
</style>
