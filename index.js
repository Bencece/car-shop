const express = require('express')
const mongoose = require('mongoose');
const app = express()

require('dotenv').config();
 
var url = process.env.MONGODB

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Csatlakoztunk!")
})
.catch((err)=>{
    console.log(err)
})

app.get('/', function (req, res) {
  res.send('Hello World')
})

var port = process.env.PORT
app.listen(port)