import React, { useState, useEffect } from 'react';
import ImageGrid from './ImageGrid.js';

export default function UploadsPage(props) {
	let [gridImages, setGridImages] = useState([]);

	return (<>
		<ImageGrid Title='All Uploads' Endpoint='/api/files/uploads' GridImages={[gridImages, setGridImages]}/>
	</>);
}