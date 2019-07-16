    
var connect = require("connect");
var path = require("path");
var moment = require("moment");
var express3_handlebars = require("express-handlebars");
var routes = require("./router");
var fs = require("fs");

module.exports = function(app) { 

  //configurational statements
   //console.log("i m right now at beginning of configure.js file");
   app.engine("handlebars" , express3_handlebars.create({
           defaultLayout : 'main',
           layoutsDir : app.get("views") + "/layouts",
           partialsDir : [app.get("views") + "/partials"],
           helpers : {
                   timeago : function(timestamp) {
                           return moment(timestamp).startOf('minute').fromNow();
                   }   
           }
        }).engine);

   app.set("view engine" , "handlebars");

   app.use(connect.logger('dev'));
   app.use(connect.bodyParser({
           uploadDir : path.join(__dirname , '../Public/upload/temp')
   }));
   app.use(connect.json());
   app.use(connect.urlencoded());
   app.use(connect.methodOverride());
   app.use(connect.cookieParser('some-secret-value-here'));
   app.use(app.router);
   console.log(path.join(__dirname , "../Public"));
   app.use('/Public/' , connect.static(path.join(__dirname , "../Public/")) );

   if('development' === app.get('env'))
   {
           app.use(connect.errorHandler());
   }

    routes.initialize(app);
  //  console.log("i m right now at the end of configure.js file");

    fs.exists(path.join(__dirname , "../public/upload/temp") , function(exist){
             if(!exist){
                     fs.mkdir(path.join(__dirname , "../Public/upload")  , function(err){
                             console.log(err);
                             fs.mkdir(path.join(__dirname , "../Public/upload/temp") , function(err){
                                     console.log(err);
                             });
                     });
             }
    });
    return app;
};
