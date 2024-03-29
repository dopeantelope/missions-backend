const cors = require('cors');
const express = require('express'); 
const app = express(); 
const http = require('http'); 
const server = http.createServer(app); 
const socketio = require("socket.io"); 
const logger = require('morgan')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const { addUser, getUser, deleteUser, getUsers } = require('./users')
// const missionRoutes = require("./routers/missions");
const Missions = require("./models/Missions");
const {getMissions, randomizeCorrectNumberOfMissions, allocateMissions} = require("./missions")


require("dotenv").config({ path: "./config/.env" })


app.use(cors());

let io = socketio(server, { cors: { origin: '*', methods: ['GET', 'POST'] } }); 

//mongoose deprecation preparation
mongoose.set('strictQuery', false);

//connect to database
connectDB();

app.use(logger("dev"))

app.get('/', (req, res) => { 
  res.send('hello world'); 
});


io.on('connection', socket => {
  let room, host

  socket.on('newGame', ({ username }) => {
    room = generateRoomCode();
    const { user } = addUser(socket.id, username, room, [])
    host = socket.id
    socket.join(user.room)
    socket.emit('getGameCode', ({room, host}))
    let userRoom = getUsers(room)
    io.in(room).emit('usersList', (userRoom))


  })

  socket.on('joinGame', ( {username, room} ) => {
    const { user } = addUser(socket.id, username, room)
    socket.join(user.room)
    socket.emit('getGameCode', ({room, host}))
    io.in(room).emit('usersList', getUsers(room))

  });

  socket.on('startGame', () => {
    getMissions(room)
  })


}); 


// app.use("/missions", missionRoutes);


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