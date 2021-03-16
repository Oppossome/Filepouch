/*Global Values
===================*/

export let states = {};

export function getState(stateName){
	return states[stateName].value;
}

export function setState(stateName, value){
	states[stateName].setValue(value);
}

export function registerState(stateName, [stateValue, setValue]) {
	states[stateName] = {value: stateValue, setValue};
	return states[stateName];
}

export function sanitize(string="") {
	const map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#x27;',
		"/": '&#x2F;',
	};

	const reg = /[&<>"'/]/ig;
	return string.replace(reg, (match)=>(map[match]));
}

export function getCurrentTime(divValue=1) {
	return Math.floor(Date.now() / divValue);
}


let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function makeDateGood(toParse) {
	let date = new Date(toParse);
	let dateDiff = (Date.now() - date) / 1000;
	let daysPassed = (dateDiff / 86400);

	if(daysPassed < 1) {
		let hoursPassed = (dateDiff / 3600);
		return (hoursPassed < 1 ? Math.floor(dateDiff/60) + "m" : Math.floor(hoursPassed) + "h");

	} else if(daysPassed <= 7) {
		return Math.floor(daysPassed)+"d";
	}

	return `${months[date.getMonth()]} ${date.getDay()} ${daysPassed > 365 ? date.getFullYear() : ''}`;
}