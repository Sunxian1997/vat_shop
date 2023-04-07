'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {openid,currentDate} = event
	const res = await db.collection('users').where({
		openid:dbCmd.eq(openid)
	}).update({
		lastDailyAttendance:currentDate,
		growthValue:dbCmd.inc(1)
	})
	
	//返回数据给客户端
	return res
};
