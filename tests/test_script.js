const { Development }	= require( 'event_request' );
const { runAllTests }	= Development.Testing;

require( './utils/message' );

runAllTests();