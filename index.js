var cors = require('cors');
const express = require('express'); 
const app = express(); 
const http = require('http'); 
const server = http.createServer(app); 
const socketio = require("socket.io"); 
const logger = require('morgan')
const mongoose = require('mongoose')
const connectDB = require('./config/db') 


require("dotenv").config({ path: "./config/.env" })


app.use(cors()); 
let io = socketio(server,{ cors: { origin: '*', methods: ['GET', 'POST'] } }); 

//mongoose deprecation preparation
mongoose.set('strictQuery', false);

//connect to database
connectDB();

app.use(logger("dev"))

app.get('/', (req, res) => { 
  res.send('hello world'); 
});

io.on('connection', client => { 
  console.log('a user connected');


io.on('connection', client => { 
  console.log('a user connected');

  client.on('newGame', handleNewGame);

  function handleNewGame() {
    console.log("in new game method")
    let roomName = "myRoom";
    clientRooms[client.id] = roomName;
    client.emit('gameCode', roomName);

   // state[roomName] = initGame();

    client.join(roomName);
    client.emit('gameCode', roomName)
    //client.number = 1;
    //client.emit('init', 1);
  }
}); 
}); 

server.listen(process.env.PORT, () => { 
  console.log(`Server is listening on port ${process.env.PORT}`); 
});