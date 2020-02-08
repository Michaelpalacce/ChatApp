const socket	= io();
const messages	= $( '#messages' );
const input		= $( '#message-input' );

const userName	= 'Stefan';

socket.on( 'connect', ()=>{
	console.log( 'Connected to server' );
});

socket.on( 'disconnect', ()=>{
	console.log( 'Disconnected from server' );
});

socket.on( 'newMessage', ( newMessage )=>{
	const formattedTime	= moment( newMessage.createdAt ).format( 'H:MM' );

	const li	= $( '<li></li>');
	li.text( `${newMessage.from} ${formattedTime}: ${newMessage.text}` );
	messages.append( li );
});

socket.on( 'newLocationMessage', ( newMessage )=>{
	const formattedTime	= moment( newMessage.createdAt ).format( 'H:MM' );
	const li			= $( '<li></li>' );
	const a				= $( '<a target="_blank">My current location</a>' );

	li.text( `${newMessage.from} ${formattedTime}: ` );
	a.attr( 'href', newMessage.url );
	li.append( a );
	messages.append( li );
});

$( '#message-form' ).on( 'submit', ( e )=>{
	e.preventDefault();
	socket.emit( 'createMessage',
		{
			from: userName,
			text: input.val()
		},
		( data )=>{
			console.log( 'Acknowledged!', data );
			input.val('');
		}
	);
});

const locationButton	= $( '#send-location' );
locationButton.on( 'click', ()=>{
	if ( ! navigator.geolocation )
	{
		return alert( 'Geolocation not supported by your browser!' );
	}

	locationButton.attr( 'disabled', 'disabled' ).text( 'Sending location...' );

	navigator.geolocation.getCurrentPosition( ( position )=>{
		locationButton.removeAttr( 'disabled' ).text( 'Send Location' );
		socket.emit( 'createLocationMessage', {
			from: userName,
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, ()=>{
		locationButton.removeAttr( 'disabled' ).text( 'Send Location' );
		alert( 'Unable to fetch location.' );
	})
});

input.focus();
input.select();