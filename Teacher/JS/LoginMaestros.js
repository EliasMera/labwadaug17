$(document).ready(function(){
	$("#login").on("click",function(){
		checked = false;
		if($("#rememberme").is(":checked")){
			checked = true;
		}

		var jsonToSend = {
			"action" : "LOGIN",
			"teacherId" : $("#teacherId").val(),
			"teacherPasswrd" : $("#passwrd").val(),
			"save" : checked
		};

		$.ajax({
			url : "PHP/LoginApplicationLayer.php",
			type : "POST",
			data : jsonToSend,
			dataType : "json",
			contentType : "application/x-www-form-urlencoded",
			success: function(jsonResponse){
                    //alert(jsonResponse.fName + " " + jsonResponse.lName);
                    window.location.replace("base.html");

                },
                error : function(errorMessage){
                	alert(errorMessage.responseText);
                }

            });

	});

	$("#registerLink").on("click",function(){
		window.location.replace("Register.html");
	});

	var jsonCookie = {
	"action" : "GETCOOKIE"
	};

	$.ajax({
		url: "PHP/LoginApplicationLayer.php",
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