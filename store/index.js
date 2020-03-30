import Vue from 'vue'
import Vuex from 'vuex'
import amap from '@/libs/amap-wx.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		city:'' || "全国",
		letter:"",
		history:'',
		search:'',
		cars:{},
		group:0,
	},
    mutations: {
		// 定位城市
		changeCity(state,city) {  
			state.city = city;
		},
		// 获取字母 
		changeLetter(state,letter){
			state.letter = letter;
		},
		// 获取点击历史搜索字段
		changeHistory(state,history){
			state.history = history;
		},
		// 获取搜索框字段
		changeSearch(state,search){
			state.search = search;
		},
		// 获取车系数据
		changeCars(state,cars){
			state.cars = cars
		},
		// 活动id
		changeGroup(state,group){
			state.group = group
		},
	},
    actions: {}
})
export default store