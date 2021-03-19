import React, { useState, useEffect, useRef } from 'react';
import {useParams} from 'react-router-dom';
import * as globals from '../globals.js';
import './Userpage.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import ImageGrid from './ImageGrid.js'

function FileDropzone(props) {
	let [uploadCount, setUploadCount] = useState({total: 0, amount: 0});
	let [gridImages, setGridImages] = props.gridImages;

	let uploadFiles = (files) => {
		let fileTotal = files.length;
		let fileCount = fileTotal;
		let completedFiles = [];

		for(let i = 0; i < fileTotal; i++){
			let formData = new FormData();
			formData.append("file", files[i]);

			let req = new XMLHttpRequest();

			// TODO: MAKE LESS JANK
			// eslint-disable-next-line
			req.onreadystatechange = function() {
				if (req.readyState === XMLHttpRequest.DONE) {
					let uploadResponse = JSON.parse(req.responseText);
					if(!uploadResponse.hasOwnProperty("err")){
						uploadResponse.justUploaded = globals.getCurrentTime(1000);
						completedFiles.unshift(uploadResponse);
						setGridImages([...completedFiles, ...gridImages]);
					}

					fileCount--;
					setUploadCount({total: fileTotal, count: fileTotal - fileCount});
				}

				if(fileCount === 0){
					setUploadCount({total: 0, count: 0});
				}
			}

			req.open("POST", "/api/files/upload");
			req.setRequestHeader("uploadToken", globals.getState("currentUser").uploadToken);
			req.send(formData);
		}

		setUploadCount({total: fileTotal, count: 0});
	}

	let manualUpload = (e) => {
		let files = e.target.files;
		e.preventDefault();
		if(uploadCount.total !== 0 || files.length === 0) return;
		uploadFiles(files);
	}

	let dragOverHandler = (e) => {
		e.preventDefault();
		if(uploadCount.total !== 0) return;
		e.currentTarget.classList.add("isOver");
	}

	let dragLeaveHandler = (e) => {
		e.preventDefault();
		if(uploadCount.total !== 0) return;
		e.currentTarget.classList.remove("isOver");
	}

	let dropHandler = async (e) => {
		e.preventDefault();
		if(uploadCount.total !== 0) return;

		if(e.dataTransfer.items) {
			uploadFiles(e.dataTransfer.files);
		}
	}

	let isUploading = uploadCount.total !== 0;
	return (<div id="drop_outer" className="container">
		<div id="drop_zone" className={isUploading ? "isOver" : ""} onDrop={dropHandler} onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler}>
			<label htmlFor={!isUploading ? "drop_manual-upload" : ""} id="drop_manual-label">{isUploading ? `Uploading files ${uploadCount.count} of ${uploadCount.total}` : (<><span>Choose a file</span> or drag it here.</>)}</label>
			<input type="file" id="drop_manual-upload" onChange={manualUpload} multiple />
		</div>
	</div>)
}

function TokenHolder(props) {
	let [isCopied, setIsCopied] = useState(false);
	let tokenHolder = useRef(null);
	let tokenInput = useRef(null);

	let doCopy = (e) => {
		e.preventDefault();
		navigator.clipboard.writeText(props.User.uploadToken).then(() => {
			setTimeout(() => { setIsCopied(false);}, 3000);
			setIsCopied(true);
		});
	}

	if(props.User.isUserApproved){
		return (<div ref={tokenHolder} className={isCopied ? "tokenCopied" : ""} id="tokenholder">
			<p>Upload Token</p>
			<input onChange={()=>{}} ref={tokenInput} id="tokencapture" type="text" value={props.User.uploadToken} />
			<button className={isCopied ? "no-hover" : ""} onClick={doCopy}>{isCopied ? "Copied!" : "Copy"}</button>
		</div>)
	} else {
		return (<p className="tokenholder-denied">This account requires admin approval to upload</p>)
	}
}

function AdminPanel(props) {
	let [targetUser, setTargetUser] = props.TargetUser;

	let allowUser = (e, action) => {
		e.preventDefault();
		fetch(`/api/users/${targetUser.id}/${action}`, {method: 'POST'}).then(async (rawData) => {
			let data = await rawData.json();
			if(!data.hasOwnProperty("err")) {
				setTargetUser(data);
			}
		}).catch((err) => {
			alert(err);
		})
	}

	console.log(targetUser.isUserApproved);
	return (
		<div id="adminPanel" className="container">
			<h2 className="containerHeader">Admin Panel</h2>
			<div className="adminPanel-btns">
				{!targetUser.isUserApproved && <button onClick={(e) => allowUser(e, "TOGGLE_APPROVAL")}>Allow user to upload</button>}
				<button href="" onClick={(e) => allowUser(e, "BAN_USER")}>{targetUser.isUserBanned ? "Unban User" : "Ban User"}</button>
			</div>
		</div>
	)
}

export default function Userpage(props) {
	let currentUser = globals.getState("currentUser");
	let [gridImages, setGridImages] = useState([]);
	let [thisUser, setThisUser] = useState({});
	let {userid} = useParams();

	useEffect(() => {
		if(userid === "me") return setThisUser(currentUser);
		fetch("/api/users/"+userid).then(async (rawData) => {
			let data = await rawData.json();
			setThisUser(data);
		})

	// eslint-disable-next-line
	}, [currentUser])

	useEffect(() => {
		const url = new URL(window.location);
		if(thisUser.hasOwnProperty("id") && url.pathname === '/user/me'){
			url.pathname = `/user/${thisUser.id}`;
			window.history.replaceState({}, '', url);
		}

	}, [thisUser])

	let isErrored = thisUser.hasOwnProperty("err")

	if(!thisUser.hasOwnProperty("id") || isErrored) {
		return (<div className="container">
			<h2>{isErrored ? "User not found" : "Loading user..."}</h2>
		</div>)

	} else {
		let isSelf = thisUser.hasOwnProperty("uploadToken");
		let joinDate = globals.makeDateGood(thisUser.date);
		let gridTitle = gridImages.length > 0 ? thisUser.username+"'s Uploads" : thisUser.username+" has no uploads";
		let endPoint = `/api/users/files/${thisUser.id}`;

		return (<>
			<div id="userpage" className="container">
				<div className="userInfo">
					<h2>{globals.sanitize(thisUser.username)}</h2>
					<div className="userinfo-holder">
						<span title="Joined on"><p><FontAwesomeIcon icon={faCalendar} /> {joinDate}</p></span>
					</div>
				</div>
				{isSelf && <TokenHolder User={thisUser}/>}
			</div>

			{(thisUser.canModerate) && <AdminPanel TargetUser={[thisUser, setThisUser]}/>}
			{isSelf && <FileDropzone gridImages={[gridImages, setGridImages]}/>}
			<ImageGrid Title={gridTitle} Endpoint={endPoint} GridImages={[gridImages, setGridImages]}/>
		</>)
	}
}