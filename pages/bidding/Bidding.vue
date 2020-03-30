<template>
	<view>
		<field @changePage="changePage"></field>
	</view>
</template>

<script>
	import Field from './base/field.vue';
	export default{
		data(){
			return{
				action_id:0,
				page:1,
				count:1,
			}
		},
		// 上拉加载
		onReachBottom(){
			if (this.page < this.count) {
				this.page ++;
			}else{
				return
			}
			this.$children[0].getPromtionActionList(this.page)
		},
		components:{
			Field,
		},
		methods:{
			changePage(page,count){
				this.page = page;
				this.count = count;
			}
		}
		
	}
</script>

<style scoped lang="stylus">
	
</style>
