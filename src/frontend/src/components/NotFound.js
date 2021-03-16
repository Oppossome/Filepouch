import {Link} from 'react-router-dom';
import React from 'react';
import './NotFound.css'


function NotFound() {
	console.log("WAWA");

	return (
		<div id="notfound">
			<div id="notfound-inner">
				<h2><span id="flicker">4</span><span>0</span><span>4</span></h2>
				<p>This page could not be found</p>
				<Link to="/"className="stylized-btn">Home</Link>
			</div>
		</div>
	)
}

export default NotFound