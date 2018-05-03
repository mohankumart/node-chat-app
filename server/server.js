const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const port = process.env.PORT || 3001
const publicPath = path.join(__dirname, '../public')

const app = express()
const server = http.createServer(app)
var io = socketIO(server)

io.on('connection',(socket)=>{
    console.log('connection accepted')

    socket.emit('newMessage', {
        from: 'mohan@fireeye.com',
        text: 'hello',
        creatAt: 'today'
    })

    socket.on('createMessage', (message) =>{
        console.log(`createMessage ${message}`)
    })

    socket.on('disconnect', ()=>{
        console.log('socket client dsiconnected')
    })    
    
})


app.use(express.static(publicPath))

server.listen(port,()=>{
    console.log(`server started on port ${port}`)
})