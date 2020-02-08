const { Development }	= require( 'event_request' );
const { test, assert }	= Development.Testing;

const {
	generateMessage,
	generateLocationMessage
}	= require( '../../src/utils/message' );

test({
	message: 'generateMessage should generate correct message object',
	test:	( done )=>{
		const text		= 'Test Message';
		const from		= 'John Smith';
		const message	= generateMessage( from, text );

		assert.equal( message.text, text );
		assert.equal( message.from, from );

		done();
	}
});
test({
	message: 'generateLocationMessage should generate correct message object',
	test: ( done )=>{
		const from		= 'John Smith';
		const longitude	= 100;
		const latitude	= 100;
		const message	= generateLocationMessage( from, latitude, longitude );

		assert.equal( message.from, from );
		assert.equal( message.url, `https://www.google.com/maps?q=${latitude},${longitude}` );

		done();
	}
});