import Vue from "vue"
import config from "./config.js"

export default function SocketAction() {
	this.lockReconnect = false;//避免重复连接
	this.tt = null; // 重连时间间隔
	this.init(this) // 初始化socket
}

SocketAction.prototype.init = (_this) => {
	_this.action.connect(_this) // 连接socket
	_this.action.onOpen(_this) // 连接socket时间
	_this.action.onMessage(_this) // 服务端返回消息
	_this.action.onClose(_this) // socket关闭事件
	_this.action.onError(_this) // socket报错事件
}

SocketAction.prototype.setPageObject = (_this, page_name, page_object) => {
	_this[page_name] = page_object
}

SocketAction.prototype.action = {
	connect: (_this) => {
		_this.socket_task = uni.connectSocket({
			url: config.socket_url,
			data() {

			},
			header: {
				'content-type': 'application/json'
			},
			// protocols: ['protocol1'],
			method: 'GET',
			success: (res) => {
				console.log(res);
			},
			fail: (res) => {
				console.log(res);
			}
		});
	},
	onOpen: (_this) => {
		_this.socket_task.onOpen((res) => {
			_this.socket_task.send({
				data: JSON.stringify({
					"uid": ''
				})
			})
		})
	},
	onMessage: (_this) => {
		_this.socket_task.onMessage((res) => {

			let json_data = {}
			_this.heartCheck.start(_this); // 心跳开始

			try {
				json_data = JSON.parse(res.data);
			} catch (e) {
				//TODO handle the exception
				// console.log(e);
			}

			if (typeof json_data == 'object') {
				if (json_data.type == undefined) return
				if (_this[json_data.type] != undefined) {
					let page_obj = _this[json_data.type]
					if(page_obj.$options !== undefined){
						try{
							if (page_obj.$options.socketMethod != undefined && page_obj.$options.socketMethod != null && typeof page_obj.$options.socketMethod != 'undefined') {
								if (typeof page_obj.$options.socketMethod[json_data.event] == 'function') {
									page_obj.$options.socketMethod[json_data.event](page_obj, json_data)
								}
							}
						}catch(e){
							console.log(e)
						} 
					}
					
				}
			}

		})
	},

	close: (_this) => {
		_this.socket_task.close()
	},

	onClose: (_this) => {
		_this.socket_task.onClose((res) => {
			console.log(res)
			_this.action.reconnect(_this)
		})
	},

	onError: (_this) => {
		_this.socket_task.onError((err) => {
			_this.action.reconnect(_this)
		})
	},
	reconnect: (_this) => {
		if (_this.lockReconnect) {
			return;
		}
		_this.lockReconnect = true;
		//没连接上会一直重连，设置延迟避免请求过多
		_this.tt && clearTimeout(_this.tt);
		_this.tt = setTimeout(() => {
			_this.init(_this);
			_this.lockReconnect = false;
		}, 10000);
	},
}

/**
 * 心跳检测
 */
SocketAction.prototype.heartCheck = {
	timeout: 10000, // 心跳时间 
	timeoutObj: null,
	serverTimeoutObj: null,
	start: function(_this) {
		let self = this;
		this.timeoutObj && clearTimeout(this.timeoutObj);
		this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
		this.timeoutObj = setTimeout(function() {
			//这里发送一个心跳，后端收到后，返回一个心跳消息，
			//onmessage拿到返回的心跳就说明连接正常
			_this.socket_task.send({
				'data' : JSON.stringify({
					"heart": '10'
				})
			}); // 心跳包
			 //计算答复的超时时间
			self.serverTimeoutObj = setTimeout(function() {
				_this.action.onClose(_this);
				// createWebSocket();
			}, self.timeout);

		}, this.timeout)
	}
}
