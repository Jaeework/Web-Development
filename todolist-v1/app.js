
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const date = require(__dirname + "/date.js");

const app = express();

// const items = ["Buy Food", "Cook Food", "Eat Food"];    // It's possible to push items into the constant array. Assigning a new array to the variable throws an error
// const workItems = [];


app.set("view engine", "ejs");  // for using ejs, need to make a folder named 'views' and ejs file under the folder.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// The URL that we're going to connect where our MongoDB is hosted locally
// todolistDB : the name of our database
mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });

// create Schema
/*
  const <schemaName> = {
    <fieldName> : <FieldDataType>,
  };
 
 */
const itemSchema = {
    name: String
};

// create model base on the schema
//const = mongoose.model("SingularCollectionName", <schemaName>);
const Item = mongoose.model("Item", itemSchema);

/* const <constantName> = new <ModelName>({
    <fieldName> : <fieldData>,
}); */
const item1 = new Item({ name: "Welcome to your todolist!" });
const item2 = new Item({ name: "Hit the + button to add a new item." });
const item3 = new Item({ name: "<-- Hit this to delete an item." });

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

/* GET */
// root route
app.get("/", function (req, res) {

    //const day = date.getDate();

    /* Mongoose find()
        <ModelName>.find({conditions}, function(err, results){
        });
    */
    Item.find({}).then(function (foundItems) {
        console.log(foundItems);
        if (foundItems.length == 0) {
            Item.insertMany(defaultItems).then(function () {
                console.log("Successfully saved defulat items to DB.");
            }).catch(function (err) {
                console.log(err);
            });
            res.redirect("/");
        } else {
            // render method uses the view engine that we set up to render a particular page.
            res.render("list", { listTitle: "Today", newListItems: foundItems });
        }

    }).catch(function (err) {
        console.log(err);
    });



});

// dynamic route
app.get("/:customListName", function(req, res){
    const customListName = req.params.customListName;

    List.findOne({name: customListName}).then(function(foundList){
        if(!foundList) {
            const list = new List({
                name: customListName,
                items: defaultItems
            });
        
            list.save();
        } else {
            res.render("list", { listTitle: "foundList.name", newListItems: foundList.itmes })
        }
    }).catch(function(err){
    });

    const list = new List({
        name: customListName,
        items: defaultItems
    });

    list.save();


});
/* 
// work route
app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

// about route
app.get("/about", function (req, res) {
    res.render("about");
});
 */

/* POST */
app.post("/", function (req, res) {
    const itemName = req.body.newItem;

    const item = new Item({
        name : itemName
    });

    item.save();

    res.redirect("/");

    /* if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    } */

});

app.post("/delete", function(req, res){
    const checkedItemId = req.body.checkbox;

    Item.findByIdAndRemove(checkedItemId).then(function(){
        console.log("Successfully deleted checked item.");
        res.redirect("/");
    }).catch(function(err) {
        console.log(err);
    });
});


app.listen(3000, function () {
    console.log("Server started on port 3000");
});