// =========== REQUIRE MODULES ==============
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('express-flash');
const path = require("path"); 
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Points to the angular file to server the index.html
app.use(express.static(__dirname + '/public/dist/public'));

// =========== LISTEN PORT ==============
app.listen(port, function () {
    console.log("You are listening on port 8000")
})


// ======= MONGOOSE CONNECTION ==========
// Here is where you can change the database information
// from the name to the collections 

mongoose.connect('mongodb://localhost/Restaurantsdb');

// ============= SCHEMA =================
var ReviewSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name must be at least 3 characters'], minlength: 3 },
    content: {type: String, required: [true, 'Review Content must be at least 3 characters long'], minlength: 3},
    rating: {type: String, required: [true, 'Rating']},   
}, {timestamps: true})

var RestaurantSchema = new mongoose.Schema({
    restaurant: {type: String, required: [true, "Restaurant name must have at least 3 characters"], minlength:3 }, 
    cuisine: {type: String, required: [true, "Cuisine must have at least 3 characters"], minlength: 3},
    review: [ReviewSchema]
},{timestamps: true})


mongoose.model('Restaurant', RestaurantSchema);
var Restaurant = mongoose.model('Restaurant');

mongoose.model('Review', ReviewSchema);
var Review = mongoose.model('Review'); 

mongoose.Promise = global.Promise;

//=========================== ROUTES ============================//
//===============================================================// 

//--------- GET ALL RESTAURANTS 
app.get('/restaurants', (req, res) => {
    console.log ("Getting all restaurants!")
    Restaurant.find({}, (err, restaurant) => {
        res.json({message: "Success, Got all restaurants!", restaurant})
    })
})

//--------- FIND ONE RESTAURANT
app.get('/restaurant/:id', (req, res) => {
    console.log("Get one restaurant: " , req.params.id)
    Restaurant.findOne({ _id: req.params.id} , (err, restaurant) => {
        if (err) {
            console.log("Error message", err)
            res.json(err)
        }else{
            res.json({ message: "Success! Retrieved One Restaurant", restaurant })
        }
    })
})

//---------- CREATE RESTAURANT  
app.post('/restaurant/new', (req, res) => {
    console.log(req.body)
    Restaurant.create(req.body, (err, restaurants) => {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({
                message: "Error",
                error: err
            })
        } else {
            // respond with JSON
            res.json({
                message: "Success! Created new restaurant!",
                data: restaurants
            })
        }
    })
})

//--------- EDIT ROUTE 
app.put('/restaurants/:id', (req, res) => {
    Restaurant.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true
    }, (err, products) => {
        if (err) {
            console.log("Returned error", err);
            res.json({
                message: "Error",
                error: err
            })
        } else {
            res.json({
                message: "Success edited one restaurant ",
                data: products
            })
        }
    })
})

//--------- DELETE ROUTE 
app.delete('/restaurants/:id', (req, res) => {
    Restaurant.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({
                message: "Error",
                error: err
            })
        } else {
            // respond with JSON
            res.json({
                message: "Success"
            })
        }
    })
})

//--------- CREATE REVIEW ROUTE 
app.post('/restaurant/:id/review', (req, res) => {
    console.log(req.body)
    Review.create(req.body, (err, reviews) => {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({
                message: "Error",
                error: err
            })
        } else {
            // respond with JSON
            res.json({
                message: "Success! Created a review!",
                data: reviews
            })
        }
    })
})

app.post('/rest/:id/review', (req, res) => {
    Restaurant.findByIdAndUpdate(req.params.id, {$push : {review: req.body}})
    .then( task => {res.json({ "message" : "SUccess", 'restaurant': restaurant}) })
    .catch( err => {res.json({ "message" : "Error", "err": err}) })
})

//--------- 404 Re-Routing 
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
  });

