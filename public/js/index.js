const socket    = io();

socket.on( 'connect', ()=>{
	console.log( 'Connected to server' );


});

socket.on( 'disconnect', ()=>{
	console.log( 'Disconnected from server' );
});

socket.on( 'newMessage', ( newMessage )=>{
	console.log( newMessage );
	const li	= $( '<li></li>');
	li.text( `${newMessage.from}: ${newMessage.text}` );

	$( '#messages' ).append( li );
});

$( '#message-form' ).on( 'submit', ( e )=>{
	const input	= $( '#message-input' );
	e.preventDefault();
	socket.emit( 'createMessage',
		{
			from: 'Stefan',
			text: input.val()
		},
		( data )=>{
			console.log( 'Acknowledged!', data );
			input.val( '' );
		}
	);
});