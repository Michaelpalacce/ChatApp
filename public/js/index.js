const socket	= io();
const messages	= $( '#messages' );
const userName	= 'Stefan';

socket.on( 'connect', ()=>{
	console.log( 'Connected to server' );
});

socket.on( 'disconnect', ()=>{
	console.log( 'Disconnected from server' );
});

socket.on( 'newMessage', ( newMessage )=>{
	const li	= $( '<li></li>');
	li.text( `${newMessage.from}: ${newMessage.text}` );
	messages.append( li );
});

socket.on( 'newLocationMessage', ( newMessage )=>{
	const li	= $( '<li></li>' );
	const a		= $( '<a target="_blank">My current location</a>' );

	li.text( `${newMessage.from}` );
	a.attr( 'href', newMessage.url );
	li.append( a );
	messages.append( li );
});

$( '#message-form' ).on( 'submit', ( e )=>{
	const input	= $( '#message-input' );
	e.preventDefault();
	socket.emit( 'createMessage',
		{
			from: userName,
			text: input.val()
		},
		( data )=>{
			console.log( 'Acknowledged!', data );
			input.val( '' );
		}
	);
});

const locationButton	= $( '#send-location' );
locationButton.on( 'click', ()=>{
	if ( ! navigator.geolocation )
	{
		return alert( 'Geolocation not supported by your browser!' );
	}

	navigator.geolocation.getCurrentPosition( ( position )=>{
		socket.emit( 'createLocationMessage', {
			from: userName,
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, ()=>{
		alert( 'Unable to fetch location.' );
	})
});