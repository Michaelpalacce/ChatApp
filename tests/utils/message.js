const { Development }	= require( 'event_request' );
const { test, assert }	= Development.Testing;

const { generateMessage }	= require( '../../src/utils/message' );

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