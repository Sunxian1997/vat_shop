'use strict';

const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		_id,
		name,
		price,
		qualityGuaranteePeriod,
		produceDate,
		remark,
		picUrls,
	} = event
	if (event.opration) {
		const {
			opration,
			openid,
			commodityCode
		} = event
		// 先查询当前登录角色是否收藏过该商品 
		const isCollect = await db.collection('users').where({
			openid: dbCmd.eq(openid)
		}).get()
		let collectArr = isCollect.data[0].collect
		if (isCollect.data && isCollect.data.length && isCollect.data[0].collect.indexOf(commodityCode)) {
			// 如果已经存在了 则表示此时执行取消收藏 且将用户表中的收藏列表移除当前的商品
		} else {
			const updateCurrentUser = await db.collection('users').where({
				openid: dbCmd.eq(openid)
			}).update({
				collect: [
					collectArr && collectArr.length ? ...collectArr : ...[],
					commodityCode
				]
			})
			return updateCurrentUser
		}
	}
	//  else {
	// 	let res = await db.collection('commodity').doc(_id).update({
	// 		name,
	// 		price,
	// 		qualityGuaranteePeriod,
	// 		produceDate,
	// 		remark,
	// 		picUrls,
	// 		posttime: Date.now(),
	// 	})
	// 	return res
	// }


};
