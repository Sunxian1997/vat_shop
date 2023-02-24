'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {name,filesUrl} = event
	let res = await db.collection()
	return event
};
