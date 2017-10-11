$(document).ready(function(){

	$("#register").on("click", function(){
		var jsonToSend = {
			"action" : "register",
			"text" : "admin"
		}
		$.ajax({
            url : "../PHP/applicationLayer.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonResponse){
                alert("success");
            },
            error : function(errorMessage){
                alert(errorMessage.responseText);
            }
        });
	});

});