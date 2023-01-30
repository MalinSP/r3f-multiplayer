const express = require('express')
const app = express()
const cors = require('cors')
const { createServer } = require('http')
const { Server } = require('socket.io')
app.use(cors())

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

let users = []

io.on('connection', (socket) => {
  socket.on('setID', (data) => {
    users.push(data)
    io.emit('userCreated', users)
    console.log(users)
  })

  socket.on('sendStartAnimation', (data) => {
    console.log(data)
    io.emit('startAnimation', data)
  })

  socket.on('disconnect', () => {
    users = users.filter((user) => user.id !== socket.id)
    io.emit('newUserResponse', users)
    socket.disconnect()
    console.log(users)
  })
})

httpServer.listen(3001, () => {
  console.log('server is running')
})
