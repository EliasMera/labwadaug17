$(document).ready(function(){
	$('#loginBtn').on("click", function(){
		if ($('#userId').val() != "" && $('#userPassword').val() != "") {
			var jsonToSend = {
				"action" : "LOGIN",
				"userId" : $('#userId').val(),
				"userPassword" : $('#userPassword').val()
			}
			$.ajax({
	            url : "../PHP/applicationLayer.php",
	            type : "POST",
	            data : jsonToSend,
	            dataType : "json",
	            contentType : "application/x-www-form-urlencoded",
	            success : function(jsonResponse){
	                window.location.assign("Inicio.html");
	            },
	            error : function(errorMessage){
	                alert(errorMessage.responseText);
	            }
	        });
		}
	});
});