
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];    // It's possible to push items into the constant array. Assigning a new array to the variable throws an error
const workItems = [];

app.set("view engine", "ejs");  // for using ejs, need to make a folder named 'views' and ejs file under the folder.

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


/* GET */
// root route
app.get("/", function(req, res){

    const day = date.getDate();

    res.render("list", {listTitle : day, newListItems : items});    // render method uses the view engine that we set up to render a particular page.
    
});

// work route
app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems : workItems});
});

// about route
app.get("/about", function(req, res) {
    res.render("about");
});


/* POST */
app.post("/", function(req, res) {
    const item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
    
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
});