const express = require('express');
const app = express();

const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../config.env')});

/* MIDDLEWARE
====================*/
const mongoSanitize = require('express-mongo-sanitize');
const cookieSession = require('cookie-session');
const passport = require('passport');

app.use(mongoSanitize());
app.use(cookieSession({name: 'filepouch-sess', keys: [process.env.COOKIE_ID], maxAge: 24 * 60 * 60 * 7000}));
app.use(passport.initialize());
app.use(passport.session());


/* APP ROUTES
====================*/

app.use('/api/users', require('./routes/users.js'));
app.use('/api/files', require('./routes/files.js'));
app.use('/auth/', require('./routes/auth.js'));


/* FALLBACK ROUTER
====================*/
const normalize = require('normalize-path');
const fileFallback = normalize(path.join(__dirname+"\\frontend\\build", "index.html"));
const db = require('./db.js');
const fs = require('fs');


let fileMatch = /^[A-Z0-9]{6}_.+$/i
app.get('*', (req, res) => {
	let realPath = req.path.substring(1);
	if(realPath.length == 0) realPath = "index.html";
	let safePath = normalize(path.normalize(realPath).replace(/^(\.\.(\/|\\|$))+/, ''));
	let isFile = fileMatch.test(safePath);

	if(isFile){
		db.File.findOne({fileName: db.sanitize(safePath)}).populate('postedBy').then((file) => {
			if(!file) return res.sendFile(fileFallback);
			if(!req.user || !req.user._id.equals(file.postedBy._id)){
				file.views++;
				file.save();
			}

			let filePath = normalize(path.join(__dirname + "\\..\\", file.fileLocation));
			res.sendFile(filePath);
		}).catch((err) => {
			res.status(500).send();
			console.log(err);

		})

	} else {
		let filePath = normalize(path.join(__dirname+"\\frontend\\build", safePath));
		let fileToSend = (fs.existsSync(filePath) ? filePath : fileFallback);
		res.sendFile(fileToSend);
	}
})

/* DB CONNECTION
====================*/
const mongoose = require('mongoose');
const { match } = require('assert');
const { config } = require('dotenv');

mongoose.connect(process.env.DB_CONN);
const dbC = mongoose.connection;

dbC.on('error', console.error.bind(console, 'connection error:'));

dbC.on('open', () => {
	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
})