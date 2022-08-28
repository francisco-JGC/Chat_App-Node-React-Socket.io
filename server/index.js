import express from 'express'
import morgan from 'morgan'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import cors from 'cors'

import { PORT } from './config.js'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

app.use(cors())
app.use(morgan('dev'))

io.on('connection', (socket) => {

    socket.on('client:send-message', message => {
        if(message){
            const OBJMessage = {
                from: socket.id,
                body: message,
                date: new Date()
            }
            socket.broadcast.emit('server:forward-message', OBJMessage)
        }
    })

    socket.on('client:user-typing', user => {
        socket.broadcast.emit('server:is-typing', user)
    })

    socket.on('disconnect', () => {
        
    })
})

server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})