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


jQuery('#message-form').on('submit', (e)=>{
    e.preventDefault()
    socket.emit('createMessage',{
        from: "User",
        text: jQuery('[name=message]').val()
    },(data)=>{
        
    })
})