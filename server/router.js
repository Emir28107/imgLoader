var home = require("../Controllers/home");
var image = require("../Controllers/image");

module.exports.initialize = function(app)
{
   app.get("/" , home.index);
   app.get("/images/:image_id" , image.index);
   app.post("/images" ,  image.create );
   app.post("/images/:image_id/like" , image.like);
   app.post("/images/:image_id/comment" , image.comment);
   app.delete("/images/:image_id" , image.delete);
  // app.get(/[A-Za-z0-9]+/ , home.error);
}
