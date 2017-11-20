$(document).ready(function(){
	$("#login").on("click",function(){
		checked = true;
		// if($("#rememberme").is(":checked")){
		// 	checked = true;
		// }

		var jsonToSend = {
			"action" : "LOGIN",
			"teacherId" : $("#teacherId").val(),
			"teacherPasswrd" : $("#passwrd").val(),
			"save" : checked
		};

		$.ajax({
			url : "PHP/applicationLayer.php",
			type : "POST",
			data : jsonToSend,
			dataType : "json",
			contentType : "application/x-www-form-urlencoded",
			success: function(jsonResponse){
                    window.location.replace("Inicio.html");

                },
                error : function(errorMessage){
                	alert(errorMessage.responseText);
                }

            });

	});

	$("#registerLink").on("click",function(){
		window.location.replace("RegistroMaestros.html");
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
			console.log(jsonResponse.teacherId);
	    	$("#teacherId").val(jsonResponse.teacherId);
	    
		},
		error: function(errorMessage) {
		}
	});
	
});