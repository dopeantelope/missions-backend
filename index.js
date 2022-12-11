var cors = require('cors');
const express = require('express'); 
const app = express(); 
const http = require('http'); 
const server = http.createServer(app); 
const socketio = require("socket.io"); 
const logger = require('morgan') 

app.use(cors()); 
let io = socketio(server,{ cors: { origin: '*', methods: ['GET', 'POST'] } }); 

//const mongoose = require('mongoose') 
//const connectDB = require('./config/db') 
// connectDB() 

require("dotenv").config({ path: "./config/.env" })

app.get('/', (req, res) => { 
  res.send('hello world'); 
});

app.use(logger("dev"))

io.on('connection', client => { 
  console.log('a user connected');
}); 

server.listen(process.env.PORT, () => { 
  console.log(`Server is listening on port ${process.env.PORT}`); 
});