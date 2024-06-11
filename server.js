// Import the Express.js framework and create an instance of the app
const express = require('express')
const app = express()

// Import the Node.js built-in 'http' module and create an HTTP server using Express app
const http = require('http').createServer(app)

// Define a constant PORT, using the environment variable if available, or default to 3000
const PORT = process.env.PORT || 3000

// Start the HTTP server and listen on the specified PORT
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'))

// Define a route for the root URL ('/') that sends the 'index.html' file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Import the Socket.io library and create a Socket.io server using the HTTP server
const io = require('socket.io')(http)

// Handle WebSocket connections when clients connect to the server
io.on('connection', (socket) => {
    console.log('Connected...')
    
    // Listen for the 'message' event from clients and broadcast the message to all connected clients
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})
