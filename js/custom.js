function getSlides() {
  $.getJSON('data/data.json')
  .done( function(data){                                 // SERVER RETURNS DATA
  	$.each(data.slides, function(key, val) {
  		console.log(key + " : " + val);
      $("#buttons").append("<button id='btn" + key + "'>" + (key+1) + "</button>");
     
      $("#btn" + key).on('click', function () {
        $(".slide").hide();
        $("#slide" + key).delay(100).fadeIn(500);
      });

  		msg = "<div class='slide' id='slide" + key + "'>"; 
  		msg += "<div class='titleArea'><h2>" + val.title + "</h2>";
  		msg += " ";
  		msg += val.description;
  		msg += "</div></div>";

  		$('#content').append(msg); 

  		$('#slide' + key).css("background", "url(" + val.image + ") top left no-repeat");
      $('#slide' + key).hide();

      if (key === 0) {
        $('#slide0').show();
      };
	  });
   
     
    $('#buttons').append("<button id='prev'></button><button id='next'></button>"); 
     

    $("#prev").on ('click', function () {
      
        var i = $(".slide:visible").index();
        
        if (i < 1) {
            $(".slide:visible").hide();
            $(".slide:last").effect("pulsate", {times:5}, 800);       
        } else {
            $(".slide:visible").hide().prev(".slide").effect("pulsate", {times:5}, 800).next().hide();
        };
        
    });    
    
    $("#next").on ('click', function () {

        var i = $(".slide:visible").index();
        var len = $(".slide").length - 1;
        
        if (i < len) {
                    $(".slide:visible").hide().next(".slide").slideDown(500).prev().hide();
        } else {
            $(".slide:visible").hide();
            $(".slide:first").effect("bounce", {times:4}, 800);
        };
    });                           
  }).fail( function() {     
                               // THERE IS AN ERROR
    $('#content').text('Sorry, we cannot load data.'); 
      // Show error message 
  }).always( function() {                                // ALWAYS RUNS
     var reload = '<a id="refresh" href="#">';           // Add refresh link
     reload += 'Reload</a>';
     $('#reload').html(reload);                          // Add refresh link
     $('#refresh').on('click', function(e) {             // Add click handler
       e.preventDefault();                               // Stop link
       getSlides();                                      
     });
  }); 
}

$(document).ready(function() {

	getSlides();  
    
});

