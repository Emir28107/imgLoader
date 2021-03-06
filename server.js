var express = require('express');
var configure = require("./server/configure");
var Mongoose = require("mongoose");
var uri = process.env.MONGOLAB_AMBER_URI ;
if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

Mongoose.connect(uri);
Mongoose.connection.on("open" , function(err){
    if(err) throw err;
    console.log("Mongoose is Connected");
});

var app = express();
var port = process.env["PORT"] || 3300;

app.set("port" , process.env.PORT || 3300);
app.set("views" , __dirname + '/Views');

app = configure(app);
var server = app.listen(app.get("port") , function(err) 
{   if(err) throw err;
    console.log(`Express is up : http://localhost:${app.get("port")}`);
});
