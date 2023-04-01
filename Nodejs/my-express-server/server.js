//jshint esversion:6

const express = require("express");     // bind express module to file.

const app = express();                  // simply referring express module.

app.get("/", function(req, res){   // a method that's provided by Express that allows us to specify what should happen when a browser makes a get request.
    res.send("<h1>Hello, world!</h1>");
});       

app.get("/contact", function(req, res){
    res.send("Contact me at : angela@gmail.com");
});

app.get("/about", function(req, res){
    res.send("I am a Developer.");
});

app.get("/hobbies", function(req, res){
    res.send("<ul><li>Coffee</li><li>Code</li></ul>");
});

app.listen(3000, function(){    // tells it to listen on a specific port for any HTTP request that get sent to our server.
    console.log("Server started on port 3000");
});                       