<template>
	<detection-list :testList="testList" :orderId="orderId"></detection-list>
</template>

<script>
	let _this
	import DetectionList from './base/detectionList.vue';
	import * as MemberApi from '@/api/member/member.js';
	export default{
		data(){
			return{
				testList:[],
				orderId:'',
				address:'',
				page_count:0,
				page_index:1,
			}
		},
		components:{
			DetectionList
		},
		onLoad(option) {
			_this = this;
			this.orderId = option.id
			this.getTestingList()
		},
		// 上拉加载
		onReachBottom(){
			if (_this.page_index < _this.page_count) {
				_this.page_index++;
				_thisgetTestingList(_this.address,_this.page_index);
			}else{
				return
			}	
		},
		methods:{
			getTestingList(page_index = 1){
				MemberApi.getTestingList({
					page_index:page_index,
					page_size:10,
					city_name:_this.$store.state.city,
				}).then((res)=>{
					let data = res.data.data;
					if(page_index > 1){
						data = _this.testList.concat(data)
					}
					_this.testList = data;
					_this.page_count = res.data.page_count;
				})
			}
		}
	}
</script>

<style>
</style>
