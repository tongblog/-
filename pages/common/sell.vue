<template>
	<view class="sell">
		<view style="position: relative;">
			<slot></slot>
			<view class="uni-flex uni-row sell-title">
				<view class="flex-item" @click="handlesort">
					<text :class="{txtC:show1}">智能排序</text> 
					<icon :class="{rotate:show1}" class="iconfont icon-jiantou1"></icon>
					<text class="border"></text>
				</view>
				<view class="flex-item" @click="handlemodels">
					<text :class="{txtC:show2}">车型</text>
					<icon :class="{rotate:show2}" class="iconfont icon-jiantou1"></icon>
					<text class="border"></text>
				</view>
				<view class="flex-item" @click="handlebrand">
					<text>品牌</text>
					<icon class="iconfont icon-jiantou1"></icon>
					<text class="border"></text>
				</view>
				<view class="flex-item" @click="handleprice">
					<text :class="{txtC:show4}">价格</text>
					<icon :class="{rotate:show4}" class="iconfont icon-jiantou1"></icon>
					<text class="border"></text>
				</view>
				<view class="flex-item" @click="handlemore">
					<text :class="{txtC:show5}">更多</text>
					<icon :class="{rotate:show5}" class="iconfont icon-jiantou1"></icon>
				</view>
			</view>
			<view class="smart-sort" v-if="show1">
				<view class="uni-column smart-column">
					<view 
						class="sort-item" 
						v-for="(item,index) in sortItem" 
						:key="index" 
						:data-num="item.num" 
						:class="{on:num == item.num}" 
						@tap="handleOld($event,item.text)">
						<icon class="iconfont" :class="item.icon"></icon>
						<text>{{item.text}}</text>
					</view>
					
				</view>
			</view>
			<view class="models" v-if="show2">
				<view class="car-models uni-row">
					<view class="models-item" v-for="(car,index) in car_type" :key="index" @tap="handleCarType(index,car)">
						<text>{{car}}</text>
					</view>
				</view>
			</view>
			
			<view class="price-drop uni-column" v-if="show4">
				<view 
					class="flex-item" 
					v-for="(price,index) in priceData" 
					:key="index" 
					@tap="handlePrice(index,price.max_price,price.min_price,price.text)">{{price.text}}</view>
			</view>
			<view class="more uni-column" v-if="show5">
				<view class="flex-item more-content">
					<picker @change="bindPickerChange1" :value="index1" :range="array1">
						<text>排放</text>
						<view>
							<text>{{array1[index1]}}</text>
							<icon class="iconfont icon-jiantou"></icon>	
						</view>
					</picker>
					
				</view>
				<view class="flex-item more-content">
					<picker @change="bindPickerChange2" :value="index2" :range="array2">
						<text>驱动形式</text>
						<view>
							<text>{{array2[index2]}}</text>
							<icon class="iconfont icon-jiantou"></icon>
						</view>
					</picker>
					
				</view>
				<view class="flex-item more-content">
					<picker @change="bindPickerChange3" :value="index3" :range="array3">
						<text>马力</text>
						<view>
							<text>{{array3[index3]}}</text>
							<icon class="iconfont icon-jiantou"></icon>	
						</view>
					</picker>
				</view>
				<view class="flex-item item-content">
					<view class="con-left" @tap="handleReset">重置</view>
					<view class="con-right" @tap="handleChange">确定</view>
					<!-- <text>过户记录</text>
					<radio-group @change="tapRecord" style="display: inline; margin-left: 400rpx;">
						<label class="radio"><radio style="transform: scale(0.5)" color="#0657A6" value="1" />有</label>
						<label class="radio"><radio style="transform: scale(0.5)" color="#0657A6" value="2" />无</label>
					</radio-group> -->
				</view>	
			</view>
			<view v-if="show6" class="screening" style="position: relative;background-color:#F4F4F4;">
				<scroll-view scroll-x="true" style="width:85%;">
					<view class="gather">
						<view class="gather-item" v-for="(item,index) in merge" :key="index">
							<text class="list">{{item}}</text>
							<!-- <text class="close">×</text> -->
						</view>
					</view>
				</scroll-view>
				<view class="gather-right" @tap="bindScreening">
					<icon class="iconfont icon-zhongzhi"></icon>
					<text class="reset">重置</text>
				</view>
			</view>
			
			
			
		</view>
	</view>
</template>

<script>
	// 下拉选择页面
	import {request} from '@/api/reques.js';
	import {goWindow} from '@/api/navigate.js'  // 页面跳转
	let _this = this;
	export default{
		props:{
			status:{
				type:Number,
			}
		},
		data(){
			return{
				show1:false,
				show2:false,
				show3:false,
				show4:false,
				show5:false,
				show6:false,
				olds:[],
				higt:[],
				low:[],
				latest:[],
				num:'',
				car_type:[], // 车型
				sortItem:[
					{
						num:1,
						icon:"icon-chelingzuiduan",
						text:"车龄最短",
					},{
						num:2,
						icon:"icon--jiageyougaodaodi",
						text:"价格由高到低",
					},{
						num:3,
						icon:"icon--jiageyoudidaogao",
						text:"价格由低到高",
					}// ,{
					// 	num:4,
					// 	icon:"icon--zuixinshangxian",
					// 	text:"最新上线",
					// }
				],
				priceData:[{
					text:"20万以上",
					min_price:200000,
					max_price:9999999,
				},{
					text:"15-20万",
					max_price:210000,
					min_price:150000,
				},{
					text:"10-15万",
					max_price:160000,
					min_price:100000,
				},{
					text:"10万以下",
					max_price:110000,
					min_price:0,
				}],
				index1:0,
				array1:[], // 排放
				index2:0,
				array2:[], // 驱动
				index3:0,
				array3:["不限","0 - 199","200 - 399","400 - 600"],
				min_ml:0,
				max_ml:600,
				gatherItem:[],
				modelsCar:[],
				brandName:[],
				priceDrop:[],
				arrs:[],
				
			}
		},
		created() {
			_this = this;
			this.getSearchCondition()
		},
		watch:{
			"$store.state.cars":(v)=>{
				_this.handleBrands(v)
			},
			status(num){
				if(num == 1){
					_this.bindScreening()
					_this.handleReset()
				}else if(num == 2){
					_this.handleReset()
				}
				
			}
		},
		computed:{
			merge(){
				return this.arrs.concat(this.gatherItem,this.modelsCar,this.brandName,this.priceDrop)
			}
		},
		methods:{
			handlesort(){
				this.show1 = !this.show1
				this.show2 = false
				this.show3 = false
				this.show4 = false
				this.show5 = false
			},
			handlemodels(){
				this.show2 = !this.show2
				this.show1 = false
				this.show3 = false
				this.show4 = false
				this.show5 = false
			},
			handlebrand(){
				this.show3 = !this.show3
				this.show1 = false
				this.show2 = false
				this.show4 = false
				this.show5 = false
				goWindow("/pages/common/brand")
			},
			handleprice(){
				this.show4 = !this.show4
				this.show1 = false
				this.show2 = false
				this.show3 = false
				this.show5 = false
			},
			handlemore(){
				this.show5 = !this.show5
				this.show1 = false
				this.show2 = false
				this.show3 = false
				this.show4 = false
			},
			//车龄最短
			handleOld(e,text){
				this.gatherItem = [];
				this.num = e.currentTarget.dataset.num;
				this.gatherItem.push(text);
				this.show1 = false;
				this.$emit('handleOld',this.num)
				this.show6 = true;
			},
			// 获取车型,排放,驱动
			getSearchCondition(){
				request("/index/getSearchCondition",{},"GET")
				.then((res)=>{
					this.array2 = res.data.data.qd_type; // 驱动
					this.array1 = res.data.data.pf_type; // 排放
					this.car_type = res.data.data.car_type.slice(1); // 车型
					/* let arr = ["挂车"];
					this.car_type = carType.concat(arr) */
				})
			},
			// 根据车型筛选
			handleCarType(index,car){
				this.modelsCar = [];
				let carId = index + 1;
				this.$emit('handleCarType',carId);
				this.show2 = false;
				this.modelsCar.push(car);
				this.show6 = true;
			},
			// 根据品牌筛选
			handleBrands(brandObj){
				if(Object.keys(brandObj).length == 0)return
				this.brandName = [];
				this.$emit('handleBrands',brandObj);
				let brand = brandObj.brandName + brandObj.categoryName;
				this.brandName.push(brand);
				
				this.show6 = true;
				//this.$EventBus.$emit('handleBrands',brandData,brandId)
			},
			// 根据价格筛选
			handlePrice(index,max,min,text){
				this.priceDrop = [];
				this.$emit('handlePrice',index + 1,max,min);
				this.show4 = false;
				this.priceDrop.push(text);
				this.show6 = true;
			},
			// 排放筛选
			bindPickerChange1(e){
				this.index1 = e.target.value
			},
			// 驱动筛选
			bindPickerChange2(e){
				this.index2 = e.target.value	
			},
			// 马力筛选
			bindPickerChange3(e){
				this.index3 = parseInt(e.target.value)
				if(this.index3 == 0){
					this.tapMl(0,600);
				}else if(this.index3 == 1){
					this.tapMl(0,199);
				}else if(this.index3 == 2){
					this.tapMl(200,399);
				}else if(this.index3 == 3){
					this.tapMl(400,600);
				}
			},	
			// 马力
			tapMl(min,max){
				this.min_ml = min;
				this.max_ml = max;
				
			},
			// 确定按钮
			handleChange(){
				this.$emit('bindPickerChange1',true,this.index1,this.index2,this.min_ml,this.max_ml)
				this.show5 = false
			},
			// 重置按钮
			handleReset(){
				this.index1 = this.index2 = this.index3 = 0;
				this.$emit('bindPickerChange2',true)
				this.show5 = false
			},
			// 删除点击列表
			bindScreening(){
				this.gatherItem = this.modelsCar = this.brandName = this.priceDrop = [];
				this.$emit('bindScreening',true)
				this.show6 = false
			}
		}
	}
</script>

<style scoped lang="stylus">
	.more
		position absolute
		z-index 100
		width 100vw
		background-color #FFFFFF
		.item-content
			display flex
			height 80rpx
			text-align center
			.con-left
				width 50%
				background-color #EEEEEE
				color #444444
				line-height 80rpx
			.con-right
				width 50%
				background-color #0657A6
				color #FFFFFF
				line-height 80rpx
		.more-content
			padding 20rpx
			border-bottom 1rpx #EEEEEE solid
			font-size 26rpx
			line-height 40rpx
			color #333333
			text 
				//padding-top 15rpx
			view
				display inline-block
				float right
				margin-top -20rpx
				font-size 24rpx
				color #AAAAAA
				icon
					font-size 18rpx
					padding-left 10rpx
					
	.price-drop
		position absolute
		z-index 100
		width 100%
		background-color #FFFFFF
		.flex-item
			padding 20rpx
			border-bottom 1rpx #EEEEEE solid
			font-size 24rpx
			color #333333	
	.models
		position absolute
		z-index 100
		width 100%
		//height 300rpx
		background-color #FFFFFF
		.car-models
			display flex
			flex-wrap wrap
			padding 20rpx 30rpx
			border-bottom 2rpx solid 
			.models-item
				width 25%
				margin 10px
				border 1rpx #DDDDDD solid
				border-radius 10rpx
				line-height 72rpx
				text-align center
				font-size 24rpx
				color #222222
	.smart-sort
		position absolute
		z-index 100
		width 100%
		background-color #FFFFFF
		.smart-column
			padding 0 24rpx
			.on
				color #0657A6!important
			.sort-item
				border-bottom 1rpx #EEEEEE solid
				line-height 80rpx
				color #222222
				text
					margin-left 25rpx
					font-size 26rpx
				icon
					font-size 30rpx
	.sell-title
		display flex
		height 72rpx
		border-bottom 1rpx #F4F4F4 solid
		align-items center	
		.flex-item
			width 20%
			height 72rpx
			text-align center
			line-height 72rpx
			font-size 0rpx
			.border
				display inline-block
				float right
				width 0
				height 40rpx
				margin-top 16rpx
				border-right 1px #ccc solid
			text
				font-size 24rpx
				vertical-align middle
			text.txtC
				color #0657A6
			icon
				font-size 20rpx
				vertical-align middle
				margin-left 8rpx
			icon.rotate	
				transform rotate(180deg)
				color #0657A6
	
	.gather
		display flex
		height 70rpx
		padding 0 24rpx
		align-items center
		.gather-item
			height 40rpx
			padding 5rpx 15rpx
			background-color #FFFFFF
			margin-right 30rpx
			line-height 36rpx
			white-space nowrap
			text
				font-size 24rpx
				color #444444
				vertical-align middle
			text.close
				padding-left 15rpx
	.gather-right
		position absolute
		top 0
		bottom 0
		right 0
		margin auto
		width 15%
		text-align center
		white-space nowrap
		.reset
			padding-left 10rpx
			font-size 24rpx
			color #444444
		icon
			color #AAAAAA
			font-size 24rpx
</style>
