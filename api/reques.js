const baseUrl = 'https://api.chinartn.cn/api.php?s=';
// 'https://beta.api.chinartn.cn/api.php?s='
import {goWindow} from '@/api/navigate.js'  // 页面跳转
// request 封装

export let request = (url, params, type) => {
	return new Promise((resolve, reject) => {
		let token = '';
		if (uni.getStorageSync('token')) {
			token = uni.getStorageSync('token')
		}
		let typeState = 'POST';
		if (type) {
			typeState = type
		}
		uni.request({
			url: baseUrl + url,
			method: typeState,
			data: params,
			dataType: 'json',
			header: {
				'content-type': 'application/json'
			},
			success(res){
				if((parseInt(res.data.code) == -9997 || parseInt(res.data.code) == -9998 || parseInt(res.data.code) == -9999)){
					uni.removeStorage({
					    key: 'token',
					    success() {
					        goWindow('/pages/common/login')
					        return
					    },
						fail(){
							goWindow('/pages/common/login')
							return
						}
					});
					
				}else{
					resolve(res);
				}
			},
			fail(err){
				reject(err)
			}
		})
	})
}

