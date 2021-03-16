const mongoose = require('mongoose');
const db = require('../db.js');

const passport = require('passport');
const express = require('express');
const router = express.Router();


/* DISCORD AUTHING
====================*/
var DiscordStrategy = require('passport-discord').Strategy;

passport.use(new DiscordStrategy({
	clientID: process.env.DISCORD_CLIENT_ID,
	clientSecret: process.env.DISCORD_CLIENT_SECRET,
	callbackURL: process.env.DISCORD_CALLBACK_URL,
	scope: ['identify']
}, function(accessToken, refreshToken, profile, cb) {
	db.findOrCreate(db.User, {discordId: profile.id}, {displayName: db.sanitize(profile.username)}, (err, user) => {
		if(profile.id == process.env.DISCORD_OWNER_ID) { // Make the owner an admin automatically :9
			user.admin = true;
			user.save();
		}

		cb(err, user);
	})
}))

router.get('/discord', passport.authenticate('discord'));

router.get('/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('/user/'+req.user._id) // Successful auth
});


/*Logout
====================*/
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
})


/* SERIALIZATION
====================*/

passport.serializeUser(function(user, done) {
	done(null, user.userToken);
});

passport.deserializeUser(function(token, done) {
	db.User.findOne({userToken: token}).then((user) => {
		done(null, user);
	}).catch((err) => {
		done(err);
	})
});

module.exports = router;