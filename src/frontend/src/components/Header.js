import React from 'react';
import * as globals from '../globals.js';
import Textlogo from './Textlogo.js';
import './Header.css';


function Header(props) {
	let currentUser = globals.getState("currentUser");
	let isLoggedIn = currentUser.hasOwnProperty("id");

	return (
		<header id="pageHeader">
			<div id="pageHeader-inner">
				<Textlogo />
				<a href={isLoggedIn ? "/auth/logout" : "/auth/discord" }>{isLoggedIn ? "Logout" : "Login"}</a>
			</div>
		</header>
	)
}

export default Header;