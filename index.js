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


//socketio

io.on('connection', socket => {
  let room = generateRoomCode();

  

  socket.on('newGame', ({ username }) => {
    const { user } = addUser(socket.id, username, room)
    socket.join(user.room)
    socket.emit('getGameCode', room)
    getMissions()
    io.in(room).emit('usersList', getUsers(room))


  })

  socket.on('joinGame', ( {username, room} ) => {
    const { user } = addUser(socket.id, username, room)
    socket.join(user.room)
    const rooms = io.sockets.adapter.rooms;
    socket.emit('getGameCode', room)
    io.in(room).emit('usersList', getUsers(room))

  });

  socket.on('startGame', ({ username, room, missions}) => {
    console.log('start game')
  })


}); 

async function getMissions() {
    try {
      const mission = await Missions.find()
      console.log(mission)

    } catch (err) {
      console.log(err);
    }
}


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