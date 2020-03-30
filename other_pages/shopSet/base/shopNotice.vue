<template>
	<view class="notice">
		<textarea 
			class="tarea" 
			placeholder-style="color:#CCC" 
			maxlength="50" 
			placeholder="限制字符(50字以内)"
			disable-default-padding="true"
			show-confirm-bar="true"
			@confirm="handleConfirm"/>
	</view>
</template>

<script>
	import * as MemberApi from '@/api/member/member.js';
	export default{
		data(){
			return{
				
			}
		},
		props:{
			shopId:{
				type:Number,
			}
		},
		methods:{
			handleConfirm(e){
				let _this = this;
				let shop_notice = e.detail.value;
				MemberApi.setShopNotice({
					shop_id:_this.shopId,
					shop_notice:shop_notice,
				})
				.then(res => {
					if(res.code > 0){
						_this.$c.msg("店铺公告设置完成")
					}
				})
				
			}
		}
	}
</script>

<style scoped lang="stylus">
	.notice
		height 100vh
		background-color #f4f4f4
		.tarea
			width 100%
			padding 10rpx 15rpx
			border-top 10rpx #F4F4F4 solid
			background-color #fff
			
</style>
