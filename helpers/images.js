var models = require("../models");


module.exports = {
    popular : function(callback){

     /*  var images = [
         {
            uniqueId : 1,
            title : "Sample Image 1",
            description : "",
            filename : "sample1.jpg",
            views : 0,
            likes : 0,
            timestamp : Date.now()
        },
        {
            uniqueId : 2,
            title : "Sample Image 2",
            description : "",
            filename : "sample2.jpg",
            views : 0,
            likes : 0,
            timestamp : Date.now()
        },
        {
            uniqueId : 3,
            title : "Sample Image 3",
            description : "",
            filename : "sample3.jpg",
            views : 0,
            likes : 0,
            timestamp : Date.now()
        },
        {
            uniqueId : 4,
            title : "Sample Image 4",
            description : "",
            filename : "sample4.jpg",
            views : 0,
            likes : 0,
            timestamp : Date.now()
        }
    ];
    return images;  */

    models.image.find({} , {} ,{ limit : 9 , sort : {  likes : -1 } } , function(err , images){
              if(err) throw err;
              callback(null , images);
    });
   }  
};