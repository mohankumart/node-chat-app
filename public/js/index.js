var socket = io()
socket.on('connect',()=>{
    console.log('connected to server')
    socket.emit('createEmail', {
        to: 'hello@fireeye.com',
        text: 'Hello World'
    })
})

socket.on('disconnect',()=>{
    console.log('disconnected to server')
})

socket.on('newMessage', (data)=>{
    console.log(`New Message has come. ${data.from}`);
})

// socket.emit('createMessage', {
//     'from': 'Adrew',
//     'text': 'hello andrew'
// })