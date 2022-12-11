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
}); 

server.listen(process.env.PORT, () => { 
  console.log(`Server is listening on port ${process.env.PORT}`); 
});