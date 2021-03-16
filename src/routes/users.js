const db = require('../db.js');
const util = require('../util.js');
const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
	util.getRequestedUser(req).then(user => {
		if(!user) return res.json({err: 'User not found!'});
		return res.json(user.giveUserData(req));
	}).catch(err => {
		res.status(500).json({err: 'User not found'});
	})
})

router.post('/:id/:action', (req, res) => {
	util.getRequestedUser(req).then(user => {
		if(!user.canModerate(req)) return res.json({err: 'Insufficient permissions'});

		if(req.params.action === 'TOGGLE_APPROVAL'){
			user.isUserApproved = !user.isUserApproved;
			user.save();
		}else if(req.params.action === 'BAN_USER') {
			user.isUserBanned = !user.isUserBanned;
			user.save();
		}

		return res.json(user.giveUserData(req));
	})
})

router.get('/files/:id/:page?', (req, res) => {
	if(!req.params.page) req.params.page = 0;
	util.getRequestedUser(req).then(user => {
		if(user) {
			let isAllowedToView = (req.user && (req.user.admin || req.user._id.equals(user._id)));
			if(!isAllowedToView) return res.status(401).send();

			db.File.find({postedBy: user}).sort({date:-1}).skip(20 * req.params.page).limit(20).populate('postedBy').then((files) => {
				let result = [];

				for(let ind in files){
					result.push(files[ind].giveUserData(req));
				}

				res.json(result)
			})
		}else{
			res.json([]);
		}
	}).catch(err => {
		res.status(500).send();
		console.log(err);
	})
})

module.exports = router;