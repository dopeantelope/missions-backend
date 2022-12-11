const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const logger = require('morgan')

require("dotenv").config({ path: './config/.env' })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB()

app.get('/', (req, res) => {
  res.send('hi')
})

app.use(logger("dev"))

app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});