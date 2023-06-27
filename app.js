const express = require("express");
const https = require("https");
require('dotenv').config()

let apiKey = process.env.SECRET_KEY


const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function (request, response) {

  response.sendFile(__dirname + "/index.html");

});

app.post("/",function(reuqest,response){
  const query = reuqest.body.cityName;

  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  
  https.get(url, function (resp) {
    console.log(resp.statusCode);
  
    resp.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
  
  
      response.write("<p>Server is up and running.<p>");
 
      response.write("<h1>The weather is currently " + weatherDescription + ".</h1>");
  
      response.write("<h2>The temperature in " + query + " is " + temp + " degrees Celcius.</h2>");
  
      response.write("<img src=" + imageURL + ">");
  
      response.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on 3000.");
});
