window.onload = function()
{
    var postComment = document.getElementById("post-comment");
    var btnComment = document.getElementById("btn-comment");
    var btnLike = document.getElementById("btn-like");
    var btnDelete = document.getElementById("btn-delete");
    var likesCount = document.querySelector(".likes-count");
    var data = "";
    postComment.style.display = "none"; 
    btnComment.addEventListener("click" , function(event){
        event.preventDefault();
        postComment.style.display = "block"; 
    });

    btnLike.addEventListener("click" , function(event){
        event.preventDefault();

        var imgId = this.dataset.id;
        //console.log(imgId);

        var XHR = new XMLHttpRequest();
        
        XHR.open("POST" , "/images/" + imgId + "/like");
        XHR.setRequestHeader("content-type" , "application/json");
        XHR.send();
        XHR.addEventListener("loadend" , function(e){
             console.log("event completely loaded " , XHR.responseText);
             data = JSON.parse(XHR.response);
             likesCount.textContent = data.likes; 
             btnLike.disabled = true;     
        });  
    });

    btnDelete.addEventListener("click" , function(event){
          event.preventDefault();
          var node = this;
          var remove = confirm("Are you sure to delete this image ? ");
          if(remove)
          {
             var XHR = new XMLHttpRequest();
             var imgData = btnDelete.dataset.id;
             XHR.open("DELETE" , "/images/" + imgData);
             XHR.send();

             XHR.addEventListener("loadend" , function(ev){
                 console.log("Load End Correspondingly ends it's work" , XHR.status);
                 if(XHR.status === 301){
                     window.location.reload();
                 }    
            });
             
           }
        });
};