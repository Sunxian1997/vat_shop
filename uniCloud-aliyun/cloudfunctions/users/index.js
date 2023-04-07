'use strict';
exports.main = async (event, context) => {
	const {
		opration,
		oprationData,
		_id,
		openid,
		session_key,
		avatarUrl,
		city,
		country,
		gender,
		is_demote,
		language,
		nickName,
		province,
		growthValue,
		lastDailyAttendance
	} = event
	const db = uniCloud.database();
	const dbCmd = db.command
	const dbUser = db.collection('users');
	switch (opration) {
		case 'update':
			const updateCurrentUser = await dbUser.where({
				_id: _id
			}).updateAndReturn({
				...oprationData
			})
			return updateCurrentUser
		case 'getUserInfo':
			const userInfo = await dbUser.where({
				openid: dbCmd.eq(event.openid)
			}).get()
			return userInfo
		default:
			// 先查是否存在当前用户
			const isExistCurrentUser = await dbUser.where({
				openid: openid
			}).get()
			// 没有用户信息，进入注册
			if (isExistCurrentUser.data && isExistCurrentUser.data.length === 0) {
				const registerUser = await dbUser.add({
					openid,
					session_key,
					avatarUrl,
					city,
					country,
					gender,
					is_demote,
					language,
					nickName,
					province,
					growthValue,
					lastDailyAttendance
				})
				return {
					_id: registerUser.id
				}
			} else {
				// 存在用户，则返回用户信息
				return isExistCurrentUser.data[0]
			}
	}

};
