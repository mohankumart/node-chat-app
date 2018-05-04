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
    console.log(`${data.text} from ${data.from}`);
    var li = jQuery('<li></li>')
    li.text(`${data.from}: ${data.text}`)
    jQuery('#messages').append(li)
})

socket.on('newLocationMessage', (message)=>{
    var li = jQuery('<li></li>')
    var a = jQuery('<a target="_blank">My Current Location</a>')

    li.text(`${message.from}: `)
    a.attr('href', message.url)

    li.append(a)

    jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', (e)=>{
    e.preventDefault()
    socket.emit('createMessage',{
        from: "User",
        text: jQuery('[name=message]').val()
    },(data)=>{
        
    })
})

var locationButton = jQuery('#sendLocation')

locationButton.on('click', (e)=>{
    if(!navigator.geolocation){
        return alert('GeoLocation not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, ()=>{
        alert('Unable to fetch location')
    })
})