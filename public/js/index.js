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
})

