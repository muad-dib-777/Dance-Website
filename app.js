const express = require("express");
const app = express();
const fs = require("fs")
const path = require('path');
const port = 80;
const bodyparser = require('body-parser');
//let mongoose = require('mongoose');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/contactData", () => {
    console.log("Connected");
});

const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    address: String
  });

const Contact = mongoose.model('Contact', contactSchema);

//Express specific
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//Pug specific
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


//Endpoints

app.get("/", (req,res) => {
    
    res.status(200).render('home.pug')
})

app.get("/about", (req, res) => {

    res.status(200).render('about.pug')
})

app.get("/contact", (req,res) => {
    
    res.status(200).render('contact.pug')
})

app.post("/contact", (req, res) => {

    let myData = new Contact(req.body);

    myData.save().then(() => {
        res.status(200).render('formResponse.pug');
    }).catch(() => {
        res.status(400).send("Error");
    });
    
})



//Start the server 
app.listen(port, () => {
    console.log(`The app is listening at port ${port}`);
})
