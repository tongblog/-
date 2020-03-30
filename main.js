import Vue from 'vue'
import App from './App'
//引入vuex
import store from './store'
import common from '@/common/vue/common.vue'
import SocketAction from '@/api/socket.js'
import './static/iconfont/iconfont.css'
import EventBus from '@/utils/eventBus.js';
import './utils/mtj-wx-sdk';
Vue.prototype.$EventBus = EventBus;

//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype.$c = common
Vue.prototype.$SocketAction = new SocketAction()

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	 store
})
app.$mount()
