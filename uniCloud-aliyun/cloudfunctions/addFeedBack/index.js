'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let res = await db.collection('feedback').add({
		...event,
		posttime:Date.now(),
	})
	//返回数据给客户端
	return res.result
};
