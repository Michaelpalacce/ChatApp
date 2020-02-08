'use strict';

function getCurrentTime() {
	return Math.floor( new Date().getTime() / 1000 );
}

/**
 * @brief	Formats the message in a unified way
 *
 * @param	String from
 * @param	String text
 *
 * @returns	Object
 */
const generateMessage	= ( from, text )=>{
	return {
		from,
		text,
		createdAt: getCurrentTime()
	}
};

/**
 * @brief	Formats a location message
 *
 * @param	String from
 * @param	Number latitude
 * @param	Number longitude
 *
 * @returns	Object
 */
const generateLocationMessage	= ( from, latitude, longitude )=>{
	return {
		from,
		url: `https://www.google.com/maps?q=${latitude},${longitude}`,
		createdAt: getCurrentTime()
	};
};

module.exports	= { generateMessage, generateLocationMessage };