'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		searchKey
	} = event
	let res = undefined
	if (searchKey) {
		res = await db.collection("commodity").where(
			// 不可跨字段
			// {
			// 	name: dbCmd.eq(searchKey),
			// 	commodityCode: dbCmd.eq(searchKey),
			// }

			// 跨字段写法
			dbCmd.or({
				name: dbCmd.eq(searchKey),
			}, {
				commodityCode: dbCmd.eq(searchKey),
			}, )
		).orderBy('posttime', 'desc').get()
	} else {
		res = await db.collection("commodity").orderBy('posttime', 'desc').get()
	}

	return res.data
};
