var socket = io()
socket.on('connect',()=>{
    console.log('connected to server')
    socket.emit('createEmail', {
        to: 'hello@fireeye.com',
        text: 'Hello World',
        createdAt: 12
    })
})

var scrollBotton = function(){
    var messages = jQuery('#messages')
    var newMessage = messages.children('li:last-child')

    var clientHeight = messages.prop('clientHeight')
    var scrollHeight = messages.prop('scrollHeight')
    var scrollTop = messages.prop('scrollTop')
    var newMessageHeight = newMessage.innerHeight()
    var lastMessageHeight = newMessage.prev().innerHeight()
        
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        debugger;
        messages.scrollTop(scrollHeight)

    }
}

socket.on('disconnect',()=>{
    console.log('disconnected to server')
})

socket.on('newMessage', (data)=>{

    var template = jQuery('#message-template').html()
    var formattedTime = moment(moment.createdAt).format('h:mm a')

    var html = Mustache.render(template, {
        text: data.text,
        from: data.from,
        createdAt: formattedTime
    })

    jQuery('#messages').append(html)
    scrollBotton()
    //
})

socket.on('newLocationMessage', (data)=>{
    var formattedTime = moment(moment.createdAt).format('h:mm a')

    var template = jQuery('#location-message-template').html()
    var formattedTime = moment(moment.createdAt).format('h:mm a')

    var html = Mustache.render(template, {
        url: data.url,
        from: data.from,
        createdAt: formattedTime
    })

    jQuery('#messages').append(html)
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