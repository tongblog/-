import Vue from "vue"
import config from "./config.js"
import {goWindow} from '@/api/navigate.js'  // 页面跳转

export default function request(cfg) {
	var options = {
		method: 'GET',
		data: {
			token : ''
		},
		withCredentials: true,
		header: {},
		is_login : false // 是否需要登录 true为登录
	}
	Object.assign(options, cfg)
	
	// 处理数据
	options.data = options.params;
	
	
	options.data.token = getToken();
	
	// token为空 且 需要登录
	if(options.data.token == '' && options.is_login){
		goWindow('/pages/common/login')
		return
	}

	
	options.url = config.baseUrl + options.url;
	

	
	var paramsStr = [];
	if (options.params) {
		for (var key in options.params) {
			options.params[key] && paramsStr.push(key + '=' + options.params[key])
		}
	}
	if (options.method === 'GET' || options.method === 'get') {
		if (paramsStr && paramsStr.length) {
			options.url = options.url + '?' + paramsStr.join('&');
		}
	}

	function fetch_promise() {
		return new Promise((resolve, reject) => {
			var requestTask = uni.request({
				...options,
				success: (res) => {
					
					if((parseInt(res.data.code) == -9997 || parseInt(res.data.code) == -9998 || parseInt(res.data.code) == -9999) && options.is_login){
						uni.removeStorage({
						    key: 'token',
						    success: function (res) {
						        goWindow('/pages/common/login')
						        return
						    },
							fail : function(err){
								goWindow('/pages/common/login')
								return
							}
						});
						
					}else{
						resolve(res.data);
					}
					
					//console.log(res.data)
				},
				fail: (err) => {
					reject(err)
				}
			});
		})
	}

	return Promise.race([
			fetch_promise(),
			timeout_promise()
		])
		.then((res) => {
			return res;
		})
		.catch((err) => {
			uni.showToast({
				title: err,
				duration: 2000
			});
			return err;
		})
};

function timeout_promise() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject('504')
		}, config.timeout)
	})

}

function getToken(){
	let token = '';
	try{
		token =  uni.getStorageSync('token',) || '';
	}catch(e){
		//TODO handle the exception
		console.log(e)
	}
	return token;
	
}
