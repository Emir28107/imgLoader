var stats = require("./stats");
var images = require("./images");
var comments = require("./comments");
var async = require("async");


module.exports = function(viewModel , callback){
 /*    viewModel.sidebar = {
         stats : stats(),
         popular : images.popular(),
         comments : comments.newest()
     };

     */

     async.parallel([
         function(next){
             stats(next);
         },
         function(next){
             images.popular(next);
         },
         function(next){
             comments.newest(next);
         }
        ] , function(err , results){
            viewModel.sidebar = {
                stats : results[0],
                popular : results[1],
                comments : results[2]
            };

            callback(viewModel);
        });
    };
