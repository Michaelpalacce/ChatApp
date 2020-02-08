const socket    = io();

socket.on( 'connect', ()=>{
	console.log( 'Connected to server' );

	socket.emit( 'createMessage', {
		from: 'Stefan',
		text: 'Works Fine!'
	});
});

socket.on( 'disconnect', ()=>{
	console.log( 'Disconnected from server' );
});

socket.on( 'newMessage', ( newMessage )=>{
	console.log( newMessage );
});
