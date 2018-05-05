var socket = io()
socket.on('connect',()=>{
    console.log('connected to server')
    socket.emit('createEmail', {
        to: 'hello@fireeye.com',
        text: 'Hello World',
        createdAt: 12
    })
})

socket.on('disconnect',()=>{
    console.log('disconnected to server')
})

socket.on('newMessage', (data)=>{
    var formattedTime = moment(moment.createdAt).format('h:mm a')
    var li = jQuery('<li></li>')
    li.text(`${data.from} ${formattedTime}: ${data.text}`)
    jQuery('#messages').append(li)
})

socket.on('newLocationMessage', (message)=>{
    var formattedTime = moment(moment.createdAt).format('h:mm a')

    var li = jQuery('<li></li>')
    var a = jQuery('<a target="_blank">My Current Location</a>')

    li.text(`${message.from}: ${formattedTime}`)
    a.attr('href', message.url)

    li.append(a)

    jQuery('#messages').append(li)
})

var messageTextbox = jQuery('[name=message]')

jQuery('#message-form').on('submit', (e)=>{
    e.preventDefault()
    socket.emit('createMessage',{
        from: "User",
        text: messageTextbox.val()
    },(data)=>{
        messageTextbox.val('')
    })
})

var locationButton = jQuery('#sendLocation')
locationButton.on('click', (e)=>{
    if(!navigator.geolocation){
        return alert('GeoLocation not supported by your browser')
    }
    locationButton.attr('disabled', 'disabled').text('Sending location..')
    navigator.geolocation.getCurrentPosition((position)=>{
        locationButton.removeAttr('disabled').text('Send GeoLocation')
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, ()=>{
        locationButton.removeAttr('disabled').text('Send GeoLocation')
        alert('Unable to fetch location')
    })
})