const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

// Declare different use sets of the express app
app.use(express.static("public"));  // by using app.use(express.static), providing the path of our static files,
// we should be able to refer to these static files by a relative URL.

app.use(bodyParser.urlencoded({ extended: true }));


// GET
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});


// POST
// root route
app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;



    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    mailchimp.setConfig({
        apiKey: "YOUR_API_KEY",
        server: "YOUR_SERVER_PREFIX",
    });

    const run = async function () {
        const response = await mailchimp.lists.batchListMembers("YOUR_LIST_ID",
            jsonData
        ).then(function() {
            res.sendFile(__dirname + "/success.html");
        }).catch(function(){
            res.sendFile(__dirname + "/failure.html");
        });
    }

    run();

});

// failure route
app.post("/failure", function(req, res){
    res.redirect("/");
});


app.listen(3000, function () {
    console.log("server is running on port 3000");
});