'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let res = await db.collection('weChatApplet').get()
	return res.data
};
