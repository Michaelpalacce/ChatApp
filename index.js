const { Loggur }	= require( 'event_request' );
const server		= require( './src/server' );

server.listen( process.env.PORT || 3000, '0.0.0.0', ()=>{
	Loggur.log( 'Server is UN' );
});
