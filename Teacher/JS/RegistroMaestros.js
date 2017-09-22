$(document).ready(function(){
	$("#cancel").on("click",function(){
		window.location.replace("LoginMaestros.html");
	});

	$("#register").on("click",function(){
		var $teacherId = $("#teacherId")
		var $name = $("#name")
		var $passwrd = $("#passwrd");
		var $passConf = $("#passwordconfirmation");

		if($teacherId.val() == "" || $name.val() == "" || $passwrd.val() == "" || $passwrd.val() != $passConf.val()){
			if($passwrd.val() != $passConf.val()){
				console.log($passwrd.val());
				alert("Error,la contrasenas no son iguales");
			}
			else{
				alert("Error,porfavor llene toda la informacion necesaria");
			}
		}
		else{	
        	var jsonToSend = {
        		"action" : "TREGISTER",
        		"teacherId" : $("#teacherId").val(),
        		"name" : $("#name").val(),
        		"passwrd" : $("#passwrd").val(),
            };


            $.ajax({
            	url : "PHP/applicationLayer.php",
            	type : "POST",
            	data : jsonToSend,
            	dataType : "json",
            	contentType : "application/x-www-form-urlencoded",
            	success: function(jsonResponse){
            		alert("Registration succesfull");
            		window.location.replace("Inicio.html");
            	},
            	error : function(errorMessage){
            		alert(errorMessage.responseText);
            	}

            });
		}

	});

	var jsonCookie = {
    	"action" : "GETCOOKIE"
		};

	$.ajax({
    	url: "PHP/applicationLayer.php",
    	type: "POST",
    	data : jsonCookie,
    	dataType: "json",
    	contentType: "application/x-www-form-urlencoded",
    	success: function(jsonResponse){
        	$("#teacherId").val(jsonResponse.teacherId);
    	},
    	error: function(errorMessage) {
    	}
	});
});