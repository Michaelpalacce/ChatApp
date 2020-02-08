'use strict';

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
		createdAt: Math.floor( new Date().getTime() / 1000 )
	}
};

module.exports	= { generateMessage };