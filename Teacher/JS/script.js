$(document).ready(function(){
	function groupButton(){
		alert("melapelantodosda");
	}

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