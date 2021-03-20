import React, { useState, useEffect } from 'react';
import * as globals from '../globals.js';

import './ImageGrid.css'
import ModalImage from './ModalImage.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faCalendar } from '@fortawesome/free-solid-svg-icons'

function ImageObject(props) {
	let imgData = props.ImgData;
	console.log(imgData); //Test!!

	let displayFile = () => {
		props.displayFile(imgData);
	}

	let postDate = globals.makeDateGood(imgData.date);
	let fileName = imgData.fileName.match(/^\w{7}(.*)$/)
	let doAnim = imgData.justUploaded === globals.getCurrentTime(1000);
	return (<div onClick={displayFile} className={doAnim ? "image-entry entry-popin" : "image-entry"}>
		<div style={{"backgroundImage": "url('/"+imgData.fileName+"')"}} className="img" />
		<h3>{globals.sanitize(fileName[1])}</h3>

		<div className="extended-info">
			<span title="Views"><p><FontAwesomeIcon icon={faEye} /> {imgData.views}</p></span>
			<span title="Posted on"><p><FontAwesomeIcon icon={faCalendar} /> {postDate}</p></span>
		</div>
	</div>)
}

export default function ImageGrid(props) {
	let [gridImages, setGridImages] = props.GridImages;
	let [currentError, setCurrentError] = useState("");
	let [selectedImage, setSelectedImage] = useState();
	let [currentPage, setCurrentPage] = useState(0);
	let [isLoading, setIsLoading] = useState(true);

	let displayFile = (imgData) => {
		setSelectedImage(imgData);
	}

	let deleteFile = (fileName) => {
		fetch("/api/files/"+fileName, {method: 'DELETE'}).then(async (rawData) => {
			let data = await rawData.json();
			if( !data.hasOwnProperty("err") ) {
				setGridImages(gridImages.filter((file) => file.fileName !== fileName));
				setSelectedImage(null);
			}
		})
	}

	let handleScroll = (e) => {
		if(isLoading || currentPage === -1) return;
		let scrollFromBottom = document.body.scrollHeight - (document.documentElement.scrollTop + window.innerHeight);
		if(scrollFromBottom < 10) {
			setCurrentPage(currentPage + 1);
		}
	}

	useEffect(() => {
		if(currentPage === -1) return;
		setIsLoading(true);

		fetch(`${props.Endpoint}/${currentPage}`).then(async (rawData) => {
			let data = await rawData.json();
			if(!data.hasOwnProperty("err")){
				if(data.length !== 20) setCurrentPage(-1);
				setGridImages([...gridImages, ...data]);
				setIsLoading(false);
			} else {
				setCurrentError(data.err);
				setIsLoading(false);
				setCurrentPage(-1);
			}

		}).catch(() => {
			setCurrentPage(-2);
			setIsLoading(false);

		})

	// eslint-disable-next-line
	}, [currentPage])

	useEffect(() => {
		document.addEventListener('scroll', handleScroll, false);

		return () => {
			document.removeEventListener('scroll', handleScroll, false);
		}
	})

	return (<div id="user-images" className="container">
		{selectedImage && <ModalImage ImgData={selectedImage} DeleteFile={deleteFile} SetSelectedImage={setSelectedImage}/>}

		<h2 className="containerHeader">{currentError === "" ? props.Title : currentError}</h2>
		<div className="images">
			{gridImages.map((img, ind) => (
				<ImageObject key={ind} ImgData={img} displayFile={displayFile} />
			))}
		</div>

		{(currentPage === -1 && gridImages.length >= 16) &&
			<div className="imgGrid-return">
				<h3>... and then there were none</h3>
				<button onClick={() => {window.scrollTo(0, 0)}}>return to top</button>
			</div>
		}

		{isLoading && <h3 className="imgGrid-Loading">Loading files<span>.</span><span>.</span><span>.</span></h3>}
	</div>);
}