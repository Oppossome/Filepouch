const util = require('../util.js');
const db = require('../db.js');
const path = require('path');

const express = require('express');
const multer = require('multer');
const { json } = require('express');
const router = express.Router();

/* MULTER CONFIG
====================*/

let storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, path.join(process.cwd(), './uploads/'));
	},
	filename: function(req, file, cb) {
		cb(null, util.randStr(6) + "_" + db.sanitize(file.originalname));
	}
})

let upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 3
	}
}).single("file")


/* ROUTER CONFIG
====================*/

router.post('/upload', (req, res) => {
	if(req.headers && req.headers.uploadtoken){
		let uploadToken = db.sanitize(req.headers.uploadtoken); // Receive the user's upload token

		db.User.findOne({uploadToken: uploadToken}).then((user) => {
			if(!user) return res.status(401).json({err: "Invalid upload token"});
			if(!user.canUserUpload()) return res.status(401).json({err: "You're not permitted to upload until your account has been approved by an administrator."});

			upload(req, res, function(err) {
				if(err) {
					res.status(400).json({err: "File too large"});
					console.log(err);
					return;
				}

				if(req.hasOwnProperty("file")){
					db.File.create({
						fileName: req.file.filename,
						fileLocation: req.file.path,
						postedBy: user
					}).then((file) => {
						res.json(file.giveUserData(req))

					}).catch((err) => {
						res.status(500).json({err: 'Uploading failed'});
						console.log(err);
					})
				} else {
					res.status(500).json({err: 'Invalid file?'});
				}

			})
		}).catch((err) => {
			res.status(500).json({err: 'User not found!'});
			console.log(err);

		})
	}else{
		res.status(401).json({err: "No upload token provided"})
	}
})


router.get('/uploads/:page?', (req, res) => {
	if(!req.params.page) req.params.page = 0;
	if(req.user && req.user.admin) {
		db.File.find().sort({date:-1}).skip(req.params.page * 20).limit(20).populate('postedBy').then((files) => {
			let result = [];

			for(let ind in files){
				result.push(files[ind].giveUserData(req));
			}

			res.json(result)
		})
	} else {
		res.json({err: "Insufficient permissions"});
	}
})


router.get('/:id', (req, res) => {
	db.File.findOne({fileName: db.sanitize(req.params.id)}).populate('postedBy').then((file) => {
		if(!file) return res.json({});
		res.json(file.giveUserData(req));
	}).catch((err) => {
		res.status(500).send();
		console.log(err);

	})
})

router.delete('/:id', (req, res) => {
	db.File.findOne({fileName: db.sanitize(req.params.id)}).populate('postedBy').then((file) => {
		if(!file) return res.json({});

		if( req.user && (req.user.admin || req.user._id.equals(file.postedBy._id))){
			file.deleteEntry();
			res.json({});

		}else{
			res.status(401).json({err: 'Unauthorized request'});

		}

	}).catch((err) => {
		res.status(500).json({err: 'File not found'});
		console.log(err);

	})
})


module.exports = router