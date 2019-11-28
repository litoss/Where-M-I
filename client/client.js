

function listM(){

  $.get( "/list_place", function(res) { 
     console.log(res);
     //alert(res);
     var x = document.getElementById("testo");
     x.innerHTML = res;
   })
  
   
}



$(document).ready(function () {
   console.log('Ready...');

   $('#addMongo').click(function (e) {
      var nome = document.getElementById("name_box").value;
      var loc_code = document.getElementById("OLC_box").value;
      var data = 
      {	"OLC": loc_code,
      "user":"fox",
      "name": nome,
      "category":"pizzeria"
   }


      $.ajax({
         url: "/new_place",
         type:"POST",
         data: JSON.stringify(data),
         contentType:"application/json; charset=utf-8",
         success: function(res){ 

            console.log(res);
            alert(res);
            console.log("richiesta aggiunta eseguita");
         },
         error: function(res){
            
            console.log(res);
            alert(res);

         }      
      })
   });




   $('#find_button').click(function (e) {

      var loc_code = document.getElementById("find_olc_box").value;
      var utente = document.getElementById("find_user_box").value;
      var nome = document.getElementById("find_name_box").value;
      var categoria = document.getElementById("find_category_box").value;
      var media_rating = document.getElementById("find_mrating_box").value;

      var data = 
      {	"OLC": loc_code,
      "user": utente,
      "name": nome,
      "category": categoria,
      "m_rating": media_rating 
   }

      $.post( "/find", data, function(res) { 
         console.log(res);

       })
   });

   $('#categorie').click(function(e){
   
      $.get("/categorie", function(res){
         console.log(res);
      })

   });






});