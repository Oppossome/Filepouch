import React, { useState, useEffect, useCallback } from 'react';
import * as globals from './globals.js';
import './App.css';

import UploadsPage from './components/UploadsPage.js';
import NotFound from './components/NotFound.js';
import Userpage from './components/Userpage.js';
import Header from './components/Header.js';
import Hero from './components/Hero.js';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

function App() {
	globals.registerState("currentUser", useState({}));

	useEffect(() => {
		fetch("/api/users/me").then(response => response.json()).then(data => {
			globals.setState("currentUser", data);
		})
	}, [])


	// Janky fix for https://bugs.chromium.org/p/chromium/issues/detail?id=332189
	let pageLoad = useCallback((elem) => {
		if(!elem) return;
		elem.classList.add("anim-me");
	}, [])

	return (
	<div className="App" ref={pageLoad}>
		<Router>
			<Switch>
				<Route exact path="/">
					<Hero/>
				</Route>
				<Route path="/user/:userid?">
					<Header/>
					<Userpage/>
				</Route>
				<Route path="/uploads">
					<Header/>
					<UploadsPage/>
				</Route>
				<Route path="*">
					<NotFound/>
				</Route>
			</Switch>
		</Router>
	</div>
	);
}

export default App;
