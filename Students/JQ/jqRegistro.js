$(document).ready(function(){
	$("#cancel").on("click",function(){
		window.location.replace("LoginAlumnos.html");
	});

	$("#register").on("click",function(){
		var $studentId = $("#studentId");
		var $name = $("#name");
		var $bachelor = $("bachelor");
		var $passwrd = $("#password");
		var $passConf = $("#passwordConfirm");
		var $academicEmail = $("#academicEmail");
		var $personalEmail = $("#personalEmail");
		var $cellphone = $("#cellphone");
		var $groupId = $("groupId");
		var $projectId = $("projectId");


		if($studentId.val() == "" || $name.val() == "" || $bachelor.val() == "" || $academicEmail.val() == "" || $personalEmail.val() == "" || $cellphone.val() == "" || $groupId.val() == "" || $projectId.val() == "" || $passwrd.val() == "" || $passwrd.val() != $passConf.val()){

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
	                "action" : "REGISTER",
	                "studentId" : $("#studentId").val(),
	                "name" : $("#name").val(),
	                "passwrd" : $("#password").val(),
	                "academicEmail" : $("#academicEmail").val(),
	                "personalEmail" : $("#personalEmail").val(),
	                "cellphone" : $("#cellphone").val(),
	                "groupId" : $("grupdId").val(),
	                "projectId" : $("projectId").val()

	    };


	        $.ajax({
	                url : "PHP/applicationLayer.php",
	                type : "POST",
	                data : jsonToSend,
	                dataType : "json",
	                contentType : "application/x-www-form-urlencoded",
	                success: function(jsonResponse){
	                		alert("Registration succesfull");
	                		window.location.replace("base.html");
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
                	url: "PHP/RegistroApplicationLayer.php",
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