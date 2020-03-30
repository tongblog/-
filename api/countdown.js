export let countdown = (endTime)=>{
		// 定义结束时间戳
		const end = endTime;
		// 定义当前时间戳
		const now = Date.parse(new Date())
		
		// 用结束时间减去当前时间获得倒计时时间戳
		const msec = end - now
		let hr = parseInt(msec / 1000 / 60 / 60 % 24)//算出小时数
		let min = parseInt(msec / 1000 / 60 % 60)//算出分钟数
		let sec = parseInt(msec / 1000 % 60)//算出秒数
		// 做判断当倒计时结束时都为0
		if (now > end) {
			hr = 0
			min = 0
			sec = 0
			return 0
		}else{
			//给数据赋值
			hr = hr > 9 ? hr : '0' + hr
			min = min > 9 ? min : '0' + min
			sec = sec > 9 ? sec : '0' + sec
		}
		
		return {
			hr,
			min,
			sec
		}
					
}