'use strict';
 /*
 * custom library by paul chinonso
 * Licence: MIT
 */

(function(){

//Templating Engine
const templatingEngine = (string, {start = '|', stop: stop} = {}) => {
	//check to make sure that the arguments are in the required format
	if(typeof(string) !== 'string' || typeof(start) !== 'string' || typeof(stop) !== 'string' && stop){
		console.log(`please enter the required format in the configuration object`);
		return;
	}

	//initialize variables
	const matches = [], stringsToInterpolate = [], endMatches = [];
	let startIndex = 0, newString = '`';

	//loop through string and retrieve the index number of starting delimeters
	//and ending delimeters iff both deleimeters are the same
	for(let i = 0; i <= string.length-1; i++ ){
		const match = string.indexOf(start, i);
		if(match === -1 ) break;
		matches.push(match);
		i = match + 1;
	}

	//if no match was found return the string in a new function
	if(matches.length === 0) return new Function(`num`, `for(let i = 1; i <= num; i++ )
	{
		console.log(${newString} ${string} ${newString});
	}
	return ${newString} ${string} ${newString};`);

	//takes the index number of end delimeters if any
	if(stop && stop !== start){
		for(let i = 0; i <= matches.length-1; i++ ){

			const match = string.indexOf(stop, matches[i] + 1);
			if(match === -1 ) break;
			endMatches.push(match);
		}
	}

	//uses delimeter's index to retrieve text content for variables and arguments
	for(let i = 0; i <= matches.length-1; i++ ){

		if(!stop || stop === start){
			let customString = string.slice(matches[i] + start.length, matches[i+1]);
			//take the string before the start delimeter and between similar delimeter
			newString += string.slice(startIndex, matches[i]) + "${" + customString + "}";
			//check the custom string for any . and remove any if found
			if(customString.indexOf('.') > -1)	customString = customString.slice(0, customString.indexOf('.'));
			//trim custom string for use as an argument
			stringsToInterpolate.push(customString.trim());
			startIndex = matches[i+1] + start.length;
			i += 1;

		}else{

			let customString = string.slice(matches[i] + start.length, endMatches[i]);
			//take the string before the start delimeter and between disimilar delimeter
			newString += string.slice(startIndex, matches[i]) + "${" + customString + "}";
			//check the custom string for any . and remove any if found
			if(customString.indexOf('.') > -1)	customString = customString.slice(0, customString.indexOf('.'));
			//trim custom string for use as an argument
			stringsToInterpolate.push(customString.trim());
			startIndex = endMatches[i] + stop.length;

		}
		//when the final delimeter has been reached grab all the
		//remaining string and add it to newString
		if(i === matches.length-1) newString += string.slice(startIndex) + '`';
		
	}

	//remove any repeated strings in the list for argument
	for(let i = stringsToInterpolate.length - 1; i > 0; i--){

		if(stringsToInterpolate[i] === stringsToInterpolate[i-1]) stringsToInterpolate.pop();			

	 }

	 //return new function ready to be called with data for interpolation;
	return new Function(...stringsToInterpolate, `num`, 
	`for(let i = 1; i <= num; i++ ){

		console.log(${newString});
	}
	return ${newString};`);
};

//Event Management System
  class EventTracker {
 	constructor(name){
 		this.name= name;
 	}

 	test(arg1, arg2){
		if(typeof(arg1) === 'function' || typeof(arg1) === 'object' && arg1 instanceof EventTracker){
			return typeof(arg1) === 'function' ? 'function' : 'object';
 		}else if(arg1 instanceof Array){

 			//filter the array and return only callbacks or objects;
 			if(arg2 === 'function'){
 				const newArray = arg1.filter((func) => typeof(func) === 'function');
 				//check the new array if empty return undefined if not return the array
 				return newArray.length > 0 ? newArray : undefined;
 			}
 			if(arg2 === 'object'){
 				const newArray = arg1.filter((obj) => typeof(obj) === 'object' && obj instanceof EventTracker);
 				return newArray.length > 0 ? newArray : undefined;
 			}
 		}else{
 			return undefined;
 		}
 	}

 	on(event, callback){
 		//add an event property to the object if there's none, property should point to an object
 		//add key, pair values for event name and array of callbacks
 		if( !this.test(callback, 'function') || typeof(event) !== 'string') return;
		const update = () => {
	 		if(this.test(callback, 'function') === 'function'){
	 				this._events[event].push(callback);
	 		}else{
	 			this.test(callback, 'function').forEach((func) => this._events[event].push(func));
	 		}
 		};
 		const create = () => {
 			this._events[event] = [];
 			update();
 		};
 		const setUp = () => {
 			this._events = {};
 			create();
 		};
 		this._events ? this._events[event] ? update() : create() : setUp();
 		
 	}

 	notify(obj, event){
 		//check if ._notify is defined if not create it;
 		//then add event name and object to notify, as key pair value;
 		if( !this.test(obj, 'object') || typeof(event) !== 'string') return;
 		const update = () => {
 			if(this.test(obj, 'object') === 'object'){
 				this._notify[event].push(obj);
 			}else{
 				this.test(obj, 'object').forEach((object) => this._notify[event].push(object));
 			}
 			
 		}; 
 		const create = () => {
 			this._notify[event] = [];
 			update();
 		};
 		const setUp = () => {
 			this._notify = {};
 			create();
 		};
 		this._notify ?  this._notify[event] ? update() : create() : setUp();
 		
 	}

 	trigger(event, ...data){
 		//loops through the event and call the functions attached to that event
 		//check the notify property for any object to be notified of this event
 		//notify them;
 		if(typeof(event) !== 'string') return;
 		if(this._events && this._events[event]) this._events[event].forEach((callback) => callback.call(this,...data));
 		if(this._notify && this._notify[event]) this._notify[event].forEach((obj) => obj.trigger(event));
 	}
 }

 window.library = {
 	templatingEngine : templatingEngine,
 	eventTracker : EventTracker
 
 }

})();