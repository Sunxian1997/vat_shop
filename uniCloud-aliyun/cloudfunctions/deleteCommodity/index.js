'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {id} = event
	let res = await db.collection('commodity').doc(id).remove()
	return res
};
