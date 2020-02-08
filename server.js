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

	socket.on( 'createMessage', ( message )=>{
		Loggur.log( message );
	});

	socket.on( 'disconnect', ()=>{
		Loggur.log( 'User Disconnected' )
	});

	socket.emit( 'newMessage', {
		from: 'Stefan',
		text: 'Hello from yourself!',
		createdAt: Math.floor( new Date().getTime() / 1000 )
	})
} );

server.listen( process.env.PORT || 3000, '0.0.0.0', ()=>{
	Loggur.log( 'Server is UN' );
	Loggur.log( process.env.PORT || 3000 )
} );