const mongoose = require("mongoose");
const util = require("./util.js");

/* UTILITY METHODS
====================*/

exports.sanitize = (input) => {
	return input.replace(/^\$/g, "_");
};

exports.findOrCreate = (obj, match, values, cb) => {
	obj.findOne(match).then((res) => {
		if (!res) {
			let newObj = obj.create(Object.assign({}, match, values)).then((res) => {
				cb(null, res);
			}).catch((err) => {
				cb(err);
			});
		} else {
			cb(null, res);
		}
	}).catch((err) => {
		cb(err);
	});
};



/* USER SCHEMA
====================*/

const userSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		default: () => new mongoose.Types.ObjectId(),
	},
	userToken: {
		type: String,
		unique: true,
		default: () => util.randStr(64),
	},
	uploadToken: {
		type: String,
		unique: true,
		default: () => util.randStr(64),
	},
	date: {
		type: Date,
		default: Date.now
	},
	isUserBanned: {
		type: Boolean,
		default: false
	},
	isUserApproved: {
		type: Boolean,
		default: false
	},
	discordId: {
		type: mongoose.Schema.Types.String,
		required: true
	},
	displayName: mongoose.Schema.Types.String,
	admin: mongoose.Schema.Types.Boolean,
});

userSchema.methods.giveUserData = function(req) {
	let isUserApproved = (process.env.REQUIRE_ACCOUNT_APPROVAL == "false" || this.admin || this.isUserApproved);
	let isSameUser = (req.user && req.user._id.equals(this._id));

	return util.conditonalCombine(isSameUser, {
		canModerate: this.canModerate(req),
		isUserBanned: this.isUserBanned,
		isUserApproved: isUserApproved,

		username: this.displayName,
		date: this.date,
		id: this._id
	}, {
		uploadToken: this.uploadToken,
		admin: this.admin

	})
}

userSchema.methods.canModerate = function(req) {
	if(req.user && req.user.admin) {
		if(this.admin && req.user.discordId !== process.env.DISCORD_OWNER_ID) {
			return false;
		} else if(this._id.equals(req.user._id)){
			return false;
		}

		return true;
	}
}

userSchema.methods.canUserUpload = function() {
	let isUserApproved = (process.env.REQUIRE_ACCOUNT_APPROVAL === "false" || this.admin || this.isUserApproved);
	return (!this.isUserBanned && isUserApproved);
}

exports.User = mongoose.model("User", userSchema);

/* FILE SCHEMA
====================*/
const fs = require('fs')

const fileSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		default: () => new mongoose.Types.ObjectId(),
	},
	views: {
		type: mongoose.Schema.Types.Number,
		default: 0,
	},
	fileName: {
		type: mongoose.Schema.Types.String,
		required: true,
		unique: true,
	},
	fileLocation: {
		type: mongoose.Schema.Types.String,
		required: true,
	},
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	date: {
		type: Date,
		default: Date.now
	}
});

fileSchema.methods.giveUserData = function(req) {
	let canDeleteFile = (req.user && (this.postedBy.canModerate(req) || req.user._id.equals(this.postedBy._id)));

	return {
		postedBy: this.postedBy.giveUserData({}),
		canDelete: canDeleteFile,
		fileName: this.fileName,
		views: this.views,
		date: this.date
	}
}

fileSchema.methods.deleteEntry = function() {
	fs.unlink(this.fileLocation, (err) => {});
	exports.File.deleteOne({_id: this._id}).exec();
}

exports.File = mongoose.model("File", fileSchema);
