<template>
	<view class="letter-list">
		<view class="letters uni-column">
			<view class="flex-item">热</view>
			<view class="flex-item" v-for="(citys,key) in letters" :key="key" @tap="handleLetter(key)" >{{key}}</view>
		</view>
	</view>
</template>

<script>
	// 城市选择字母列表
	import {getCity} from "@/api/home/city.js"
	export default{
		data(){
			return{
				letters:[],
			}
		},
		created() {
			this.getCitys()
		},
		methods:{
			async getCitys(){
				await getCity().then((res)=>{
					this.letters = res.data
					//console.log(res)
				})
			},
			handleLetter(key){
				this.$store.commit("changeLetter",key) 
			}
		}
	}
</script>

<style scoped lang="stylus">
	.letters
		position fixed
		//z-index 201
		right 0
		top 18%
		margin auto
		color #333333
		.flex-item
			padding-right 20rpx
			line-height 40rpx
			text-align center
			font-size 22rpx
</style>
