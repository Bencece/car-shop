const express = require('express')
const mongoose = require('mongoose');
const app = express()
const productSchema = require("./models/Product")
const userSchema = require("./models/User")
const bodyParser = require('body-parser')

var cors = require('cors')
app.use(cors())
app.use(bodyParser.json())

require('dotenv').config();

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

var url = process.env.MONGODB

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Csatlakoztunk!")
    })
    .catch((err) => {
        console.log(err)
    })

const Product = mongoose.model('Product', productSchema)
const User = mongoose.model('User', userSchema)

/*
const tmp = new Product({itemid: "3", name: "BMW", description: "Fekete autó", quantity: "5", prize: "20000000", image: "assets/car2.jpg"});
tmp.save();
*/
/*
const tmp = new User({ name: "szaboz", password: "PRF2021"})
tmp.save()
*/

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
},
    function (name, password, done) {
        User.findOne({
            name: name
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            user.comparePasswords(password, (err, isMatch)=>{
                if(err) return done(err, false);
                if(!isMatch) return done("Incorrect password", false);
                return done(null, user);
            })
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

app.post('/login', (req, res) =>{
    if(req.body.name) {
        passport.authenticate('local', (err, user)=>{
            if (err) return res.status(500).send(err);
            req.login(user, (err)=>{
                if (err) return res.status(500).send(err)
                return res.status(200).send("Authenticated!")
            })
        })(req, res);
    } else {
        return res.status(400).send("Bad request")
    }
});

app.use(express.static("frontend/car-shop/dist/car-shop/", {
    root: __dirname
}))

app.get('/', function (req, res) {
    res.sendFile("frontend/car-shop/dist/car-shop/index.html", {
        root: __dirname
    })
})

app.post('/products', (req, res) => {
    Product.find({
        "quantity": {
            $gt: 0
        }
    }, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

var port = process.env.PORT
app.listen(port)