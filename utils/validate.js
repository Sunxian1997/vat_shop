export function isPhone(value) {
	const reg = /^1[3,4,5,6,7,8,9]\d{9}$/;
	return reg.test(value);
}

export function getCurrentDate(style) {
	var myDate = new Date(); //创建Date对象
	var Y = myDate.getFullYear(); //获取当前完整年份
	var M = myDate.getMonth() + 1; //获取当前月份
	var D = myDate.getDate(); //获取当前日1-31
	var H = myDate.getHours(); //获取当前小时
	var i = myDate.getMinutes(); //获取当前分钟
	var s = myDate.getSeconds(); //获取当前秒数
	// 月份不足10补0
	if (M < 10) {
		M = '0' + M;
	}
	// 日不足10补0
	if (D < 10) {
		D = '0' + D;
	}
	// 小时不足10补0
	if (H < 10) {
		H = '0' + H;
	}
	// 分钟不足10补0
	if (i < 10) {
		i = '0' + i;
	}
	// 秒数不足10补0
	if (s < 10) {
		s = '0' + s;
	}
	switch (style) {
		case 'yyyy-mm-dd 00:00:00':
			return `${Y}-${M}-${D} 00:00:00`
		default:
			return Y + '-' + M + '-' + D + ' ' + H + ':' + i + ':' + s;
	}
}
