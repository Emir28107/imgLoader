var express = require('express');
var configure = require("./Server/configure");
var Mongoose = require("mongoose");

Mongoose.connect("mongodb://Emir28107:MuskanEmir143@ds237072.mlab.com:37072/imcha");
Mongoose.connection.on("open" , function(err){
    if(err) throw err;
    console.log("Mongoose is Connected");
});

var app = express();

app.set("port" , process.env.PORT || 3300);
app.set("views" , __dirname + '/Views');

app = configure(app);
var server = app.listen(app.get("port") , function(err) 
{   if(err) throw err;
    console.log(`Express is up : http://localhost:${app.get("port")}`);
});
