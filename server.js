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

app.apply( 'er_static_resources', { paths : ['public', 'favicon.ico'] } );
app.apply( 'er_templating_engine', { templateDir : path.join( __dirname, './public' ), engine : ejs } );

app.get( '/',( event )=>{
	event.render( 'index' );
});

Server.listen( process.env.PORT || 80, '0.0.0.0', ()=>{
	Loggur.log( 'Server is UN' )
} );