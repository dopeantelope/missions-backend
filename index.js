const cors = require('cors');
const express = require('express'); 
const app = express(); 
const http = require('http'); 
const server = http.createServer(app); 
const socketio = require("socket.io"); 
const logger = require('morgan')
const mongoose = require('mongoose')
const connectDB = require('./config/db') 
const clientRooms = {};



require("dotenv").config({ path: "./config/.env" })


app.use(cors());

let io = socketio(server, { cors: { origin: '*', methods: ['GET', 'POST'] } }); 

//mongoose deprecation preparation
//mongoose.set('strictQuery', false);

//connect to database
//connectDB();

app.use(logger("dev"))

app.get('/', (req, res) => { 
  res.send('hello world'); 
});

io.on('connection', client => {
  client.id = 'dopeantelope'
  console.log(client.id)
  console.log('a user connected');

  client.on('newGame', handleNewGame);
  client.on('joinGame', handleJoinGame);


  function handleNewGame() {
    console.log("in new game method")
    let roomName = generateRoomCode();
    clientRooms[client.id] = roomName;


    client.join(roomName);
    client.emit('getGameCode', roomName)
  }

  function handleJoinGame(roomName) {
    console.log("in handle join game method")
    const room = io.sockets.adapter.rooms[roomName];
    console.log(room)

    let allUsers;
    if (room) {
      allUsers = room.sockets;
    }
    let numClients = 0;
    if (allUsers) {
      numClients = Object.keys(allUsers).length;
    }

    if (numClients === 0) {
      client.emit('unknownCode');
      return;
    } 
    clientRooms[client.id] = roomName;

    client.join(roomName);
  }
}); 


const generateRoomCode = () => {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let str = '';
  for (let i = 0; i < 4; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};

server.listen(process.env.PORT, () => { 
  console.log(`Server is listening on port ${process.env.PORT}`); 
});