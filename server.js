const { Server, Loggur }	= require( 'event_request' );

/**
 * @brief	Instantiate the server
 */
const server	= Server();

// Add a new Route
server.get( '/', ( event ) => {
	event.send( '<h1>Hello World!</h1>' );
});

server.start( ()=>{
	Loggur.log( 'Server started' );
});