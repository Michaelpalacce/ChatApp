'use strict';

const { Server, Loggur }	= require( 'event_request' );
const ejs					= require( 'ejs' );
const socketIO				= require( 'socket.io' );
const path					= require( 'path' );
const http					= require( 'http' );
const {
	generateMessage,
	generateLocationMessage
}	= require( './utils/message' );

/**
 * @brief	Instantiate the server
 */
const app			= Server();
const server		= http.createServer( Server.attach() );
const io			= socketIO( server );
const templateDir	= path.join( path.dirname( require.main.filename ), './public' );

app.apply( 'er_static_resources', { paths : ['public'] } );
app.apply( 'er_templating_engine', { templateDir } );

app.get( '/',( event )=>{
	event.render( 'index' );
});

io.on( 'connection', ( socket )=>{
	socket.emit( 'newMessage', generateMessage( 'ADMIN', 'Welcome to the chat app' ) );

	socket.broadcast.emit( 'newMessage', generateMessage( 'ADMIN', 'New user joined' ) );

	socket.on( 'createMessage', ( message, callback )=>{
		message	= generateMessage( message.from, message.text );
		socket.broadcast.emit( 'newMessage', message );
		callback();
	});

	socket.on( 'createLocationMessage', ( message )=>{
		socket.broadcast.emit( 'newLocationMessage', generateLocationMessage( message.from, message.latitude, message.longitude ) );
	});

	socket.on( 'disconnect', ()=>{
		Loggur.log( 'User Disconnected' )
	});
} );

module.exports	= server;