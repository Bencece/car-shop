const express = require('express')
const mongoose = require('mongoose');
const app = express()
const productSchema = require("./models/Product")
const userSchema = require("./models/User")

require('dotenv').config();
 
var url = process.env.MONGODB

mongoose
.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Csatlakoztunk!")
})
.catch((err)=>{
    console.log(err)
})

const Product = mongoose.model('Product', productSchema)
const User = mongoose.model('User', userSchema)

/*
const tmp = new Product({itemid: "2", name: "BMW", description: "Zöld autó", quantity: "5", prize: "14000000", image: "assets/car2.jpg"});
tmp.save();
*/
/*
const tmp = new User({ name: "szaboz", password: "PRF2021"})
tmp.save()
*/

app.use(express.static("frontend/car-shop/dist/car-shop/", {root: __dirname}))

app.get('/', function (req, res) {
  res.send('Hello World')
})

var port = process.env.PORT
app.listen(port)