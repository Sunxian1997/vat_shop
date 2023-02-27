'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		name
	} = event
	let res = undefined
	if (name) {
		res = await db.collection("commodity").where({
			name: dbCmd.eq(name)
		}).orderBy('posttime','desc').get()
	} else {
		res = await db.collection("commodity").orderBy('posttime','desc').get()
	}

	return res.data
};
