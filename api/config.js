var config = {
	baseUrl:'',
	timeout:10000,
	domain : 'https://api.chinartn.cn/',
	socket_url : 'wss://socket.chinartn.cn'
}

/* 
 api.chinartn.cn
 beta.api.chinartn.cn
 */
var baseUrl = '';
if (process.env.NODE_ENV == 'development') {
    baseUrl = `https://api.chinartn.cn/api.php?s=`; // 开发环境地址
} else if (process.env.NODE_ENV == 'production') {
    baseUrl = `https://api.chinartn.cn/api.php?s=`; //生产环境地址
}

config.baseUrl = baseUrl;
export default config;