import React, { useState, useEffect } from 'react';
import * as globals from '../globals.js';
import {Link} from 'react-router-dom';
import Textlogo from './Textlogo';
import './Hero.css';


export default function Hero() {
	let currentUser = globals.getState("currentUser");
	let loginBtn = (<a className="stylized-btn" href="/auth/discord">Sign in</a>)

	if(currentUser.hasOwnProperty("id")) {
		loginBtn = (<Link to="/user/me" className="stylized-btn">My Profile</Link>);
	}


	return (
		<body id="hero">
			<div id="hero-center">
				<Textlogo />
				<p>An Open Source Filehost</p>
				{loginBtn}
			</div>
		</body>
	)
}
