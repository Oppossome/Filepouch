const db = require('./db.js');

exports.randStr = (len) => {
	let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	let token = ""

	for(let i = 0; i < len; i++)
		token += chars[Math.floor(Math.random() * chars.length)];

	return token;
}

exports.conditonalCombine = (cond, arr1, arr2) => {
	return cond ? Object.assign({}, arr1, arr2) : arr1
}

exports.getRequestedUser = (req) => {
	return new Promise((resolve, reject) => {
		if(req.params.id == "undefined") return resolve();
		let reqId = db.sanitize(req.params.id)

		if(reqId == "me"){
			if(req.user){
				reqId = req.user._id;
			} else {
				return resolve();
			}
		}

		if(req.user && req.user._id == reqId){
			resolve(req.user);
		}else{
			db.User.findOne({_id: reqId}).then((user) => {
				resolve(user);
			}).catch(err => {
				reject(err);
			})
		}
	})
}