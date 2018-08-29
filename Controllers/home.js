var sidebar = require("../helpers/sidebar");
var imageSection = require("../models/").image;
var commentSection = require("../models/").comment;

module.exports = {
    index : function(req , res)
    {
        
      //  console.log("The Home is Synchronised");
        var viewModel =  { 
            newImages : []
        };
      /*  sidebar(viewModel , function(viewModel){
             res.render("index" , viewModel); 
        });  */
        
        imageSection.find({} , {} , { $sort : { timestamp : -1 }} , function(err , images){
            if(err) throw err;
         //   console.log(images.length);
            viewModel.newImages = images;
            sidebar(viewModel , function(viewModel){
             res.render("index" , viewModel); 
             });
        })
    },

    error : function(req , res){
      //  console.log(req.url);
        res.send(404 , "No Such File Found");
    }
};