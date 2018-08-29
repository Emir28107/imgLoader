var models = require("../models");
var async = require("async");
var viewsTotal , likesTotal;

module.exports = function(callback){
    
    async.parallel([
             function(next){
                 models.image.count({} , function(err , total){
                     next(err , total);
                 });
             },
             function(next){
                 models.comment.count({} , next);
             },
             function(next){
                 models.image.aggregate([{ $group : {
                     _id : '1',
                     viewsTotal : { $sum : '$views' }
                 }}] , function(err , results){
                     if(results.length > 0){
                         viewsTotal += results[0].viewsTotal;
                     }
                    next(null , viewsTotal);    
                 });
             },
             function(next){
                models.image.aggregate([{ $group : {
                    _id : '1',
                    likesTotal : { $sum : '$likes' }
                }}] , function(err , results){
                    if(results.length > 0){
                        likesTotal += results[0].viewsTotal;
                    }
                   next(null , likesTotal);    
                });  
             }
    ] , function(err , results){
        callback(null , {
            images : results[0],
            comments : results[1],
            views : results[2],
            likes : results[3]
        }); 
        
    });
   /* var stats = {
        images : 0,
        comments : 0,
        views : 0,
        likes : 0,
    };  */
}