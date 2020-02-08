'use strict';

const { Server, Loggur }	= require( 'event_request' );
const ejs					= require( 'ejs' );
const socketIO				= require( 'socket.io' );
const path					= require( 'path' );
const http					= require( 'http' );

/**
 * @brief	Instantiate the server
 */
const app					= Server();
const server				= http.createServer( Server.attach() );
const io					= socketIO( server );

app.apply( 'er_static_resources', { paths : ['public'] } );
app.apply( 'er_templating_engine', { templateDir : path.join( __dirname, './public' ), engine : ejs } );

app.get( '/',( event )=>{
	event.render( 'index' );
});

io.on( 'connection', ( socket )=>{
	Loggur.log( 'New user connected' );

	socket.on( 'disconnect', ()=>{
		console.log( 'User Disconnected' )
	} );
} );



server.listen( process.env.PORT || 3000, '0.0.0.0', ()=>{
	Loggur.log( 'Server is UN' );
	Loggur.log( process.env.PORT || 3000 )
} );