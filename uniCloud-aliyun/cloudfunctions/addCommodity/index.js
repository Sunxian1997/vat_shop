'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let res = await db.collection('commodity').add({
		...event,
		posttime:Date.now(),
	})
	return res.data
};
