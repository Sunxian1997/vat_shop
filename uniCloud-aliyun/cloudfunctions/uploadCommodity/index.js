'use strict';

const db = uniCloud.database()
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
	let res = await db.collection('commodity').doc(_id).update({
		name,
		price,
		qualityGuaranteePeriod,
		produceDate,
		remark,
		picUrls,
		posttime:Date.now(),
	})
	return res
};
