const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "your api key";
    const unit = "metric";
    const lang = "kr";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey + "&lang=kr&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);   // raw data is expressed in hexadecimal way and need to be parsed into JSON type.
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"}); // Setting for Korean language.
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in Uijeongbu-si is " + temp + " degrees Celcius.</h1>"); // we can have multiple write method.
            res.write("<img src=" + imageURL + ">");
            res.send();  // we can only have one send method.
        });
    });
});


app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});