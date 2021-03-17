import React, { useEffect } from 'react';
import * as globals from '../globals.js';
import {Link} from 'react-router-dom';
import './ModalImage.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function ModalImage(props) {
	let imgData = props.ImgData;

	let deleteFile = (e) => {
		props.DeleteFile(imgData.fileName);
		e.preventDefault();
	}

	let closeModal = (e) => {
		props.SetSelectedImage(null);
		e.preventDefault();
	}

	let escFunc = ((e) => {
		if(e.keyCode === 27){
			closeModal(e);
		}
	})

	useEffect(() => {
		document.addEventListener("keydown", escFunc, false);

		const url = new URL(window.location);
		url.searchParams.set('image', imgData.fileName);
		window.history.replaceState({}, '', url);

		return () => {
			document.removeEventListener("keydown", escFunc, false);

			url.searchParams.delete('image');
			window.history.replaceState({}, '', url);
		}

	// eslint-disable-next-line
	},[])


	let fileName = imgData.fileName.match(/^\w{7}(.*)$/);
	let uploadDate = globals.makeDateGood(imgData.date);

	return (
		<div onClick={closeModal} className="modalImage">
			<div onClick={(e)=>{e.stopPropagation()}}className="modalImage-inner">
				<div className="modalImage-topbar">
				<Link tabIndex="1" to={"/user/"+imgData.postedBy.id }><span>{globals.sanitize(imgData.postedBy.username)}</span> · {uploadDate}</Link>
					<button tabIndex="2" href="#" onClick={closeModal}><FontAwesomeIcon icon={faTimes} /></button>
				</div>

				<div className="modalImage-imgholder">
					<img src={"/" + imgData.fileName} alt=""></img>
				</div>

				<div className="modalImage-bottombar">
					<div className = "modalImage-titlebar">
						<h2 tabIndex="3">{globals.sanitize(fileName[1])}</h2>
						{imgData.canDelete && <button onClick={deleteFile} tabIndex="4"><FontAwesomeIcon icon={faTrashAlt} /></button>}
					</div>
					<p tabIndex="5">{imgData.views} View{imgData.views !== 1 ? "s" : ""}</p>

				</div>
			</div>
		</div>
	)
}