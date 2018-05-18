const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {isRealString} = require('./utils/validations')
const {generateMessage, generateLocationMessage} = require('./utils/utils')
const {Users} = require('./utils/users')

const port = process.env.PORT || 3007
const publicPath = path.join(__dirname, '../public')

const app = express()
const server = http.createServer(app)
var io = socketIO(server)
var users = new Users()

io.on('connection',(socket)=>{
    console.log('connection accepted')

    socket.on('join', (params, callback) =>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room are required')
        }else{
            socket.join(params.room)

            users.removeUser(socket.id)

            users.addUser(socket.id, params.name, params.room)
            io.to(params.room).emit('updateUserList', users.getuserList(params.room))


            socket.emit('newMessage',generateMessage('Admin', 'Welcome to chat'))

            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))
            callback()
        }
    })

    socket.on('createMessage', (message, callback) =>{
        var user = users.getUser(socket.id)

        console.log(`createMessage ${message.text}`)
        io.to(user.room).emit('newMessage', generateMessage(message.from, message.text))
        callback()
    })

    socket.on('createLocationMessage', (coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude))
    })

    socket.on('disconnect', ()=>{
        debugger
        var user = users.removeUser(socket.id)

        if(user){
            io.to(user.room).emit('updateUserList', users.getuserList(user.room));
            io.to(user.room).emit('newmessage', generateMessage('Admin', `${user.name} has left`));
        }
        console.log('socket client dsiconnected')
    })    
    
})


app.use(express.static(publicPath))

server.listen(port,()=>{
    console.log(`server started on port ${port}`)
})