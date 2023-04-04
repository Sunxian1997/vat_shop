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
		opration
	} = event
	// 判断是否有特殊操作
	if (opration) {
		const {
			openid,
			commodityInfo: {
				favoriteList,
				_id
			}
		} = event
		let newFavoriteList = []
		// 如果是收藏功能
		if (opration === 'cancleFavorite') {
			// 拿到商品的收藏列表
			newFavoriteList = favoriteList.filter(item => item != openid)

		} else if (opration === 'addFavorite') {
			// 说明该账户没有收藏过
			newFavoriteList = [...favoriteList, openid]
		}
		let res = await db.collection('commodity').doc(_id).update({
			favoriteList: newFavoriteList,
			posttime: Date.now(),
		})
		return res
	} else {
		let res = await db.collection('commodity').doc(_id).update({
			name,
			price,
			qualityGuaranteePeriod,
			produceDate,
			remark,
			picUrls,
			posttime: Date.now(),
		})
		return res
	}


};
