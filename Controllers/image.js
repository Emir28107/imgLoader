var fs = require("fs");
var path = require("path");
var sidebar = require("../helpers/sidebar");
var model = require("../models");
var md5 = require("MD5");

module.exports = {
    index : function(req , res)
     {
        var viewModel =  { 
            image : {} ,
            comment : [] 
            };
 
     model.image.findOne({ filename : { $regex : req.params.image_id }} , function(err , image){
         if(err) throw err;
         if(image) {
              
              image.views  = image.views + 1;
              viewModel.image = image;
              image.save(); 
              model.comment.find({ image_id : image._id } , {} , { sort : { timestamp : 1 }} , function(err , comments){
                  if(err) throw err;

                  viewModel.comment = comments;
                  sidebar(viewModel , function(viewModel){
                   res.render("image" , viewModel);
                    });
                });
            } else {
             res.redirect("/");
          }
       });
     },
     create : function(req , res)
     {
        
        var saveImage = function()
         {
            var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
            var imgUrl = "";
            for(var i = 0 ; i < 6 ; i++){
                imgUrl += possible.charAt(Math.floor(Math.random()*possible.length));
            }

            var tempPath = req.files.file.path;
           
            var extName = path.extname(req.files.file.name).toLowerCase();
            var imgPath = path.resolve(__dirname + "/../Public/upload/" + imgUrl + extName);
            
            if(extName === ".png" || extName === ".jpg" || extName === ".jpeg" || extName === ".gif"){
                fs.rename(tempPath , imgPath , function(err){
                    if(err) throw err;
                    model.image.find({ filename : imgUrl } , function(err , images){
                        if(images.length > 0) {
                            saveImage()
                        }
                        else {
                            var image = new model.image({
                                title : req.body.title,
                                description : req.body.description,
                                filename : imgUrl + extName
                            });

                            image.save(function(err , image){
                                console.log("Image is Saved");
                                res.redirect("images/" + image.uniqueId); // cumbersome situation for uniqueId
                            })
                        }
                    })
                   // res.redirect("/images/" + imgUrl);
                });
            }
            else
            {
                fs.unlink(tempPath , function(err){
                    if(err) throw err;
                    console.log("unlinking successfull");
                    res.json(500 , { Error : "Correct Image Extension file must be provided" });
                });
            }
         };
    
        saveImage(); 

    },
     like : function(req , res)
     {
        model.image.findOne({ filename : { $regex : req.params.image_id } } , function(err , image){
                if(!err && image)
                       {  //  console.log("If Barrier is Passed Here");
                            image.likes = image.likes + 1;
                            image.save(function(err , img){
                                if(err) throw err;
                                res.json({ likes : img.likes });
                            });           
                        }
           }); 
    },
     comment : function(req , res)
     {
         model.image.findOne({ filename : { $regex : req.params.image_id }} , function(err , image){
             if(!err && image){
                 var newComment = new model.comment(req.body);
                 newComment.gravatar = md5(req.body.email);
                 newComment.image_id = image._id;
                 newComment.save(function(err , comment){
                     if(!err) res.redirect("/images/" + image.uniqueId + "#" + newComment._id); 
                 });
             }
         });
     },

     delete : function(req , res){
         model.image.findOne( { filename : { $regex : req.params.image_id } } , function(err , image){
                 if(!err && image){
                     fs.unlink(path.resolve("./Public/upload/" + image.filename) , function(err){
                         if(err) throw err;
                         model.comment.remove({ image_id : image._id } , function(err){
                             if(err) throw err;
                             image.remove(function(err){
                               if(err) throw err;
                               res.redirect("/");  
                             })
                         });
                     });
                 } else {
                     res.send(404 , "No Such File Found");
                 }
         });
     } 
}