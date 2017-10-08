$(document).ready(function(){

	var jsonCookie = {
	"action" : "GETCOOKIE"
	};

	$.ajax({
		url: "PHP/applicationLayer.php",
		type: "POST",
		data : jsonCookie,
		dataType: "json",
		async: false,
		contentType: "application/x-www-form-urlencoded",
		success: function(jsonResponse){


			id = jsonResponse.id;
	    	console.log(id);

				var jsonGroups = {
				"action" : "GETGROUPS",
				"teacherId" : id
				};	    		
				debugger;	
	    		$.ajax({
					url: "PHP/applicationLayer.php",
					type: "POST",
					data : jsonGroups,
					dataType: "json",
					contentType: "application/x-www-form-urlencoded",
					success: function(jsonResponse){
						debugger;
						var newHtml = "";
						for(i = 0; i < jsonResponse.length; i++){
						newHtml += "<table>" + "<tr>" + "<th>" + "Course Key" + "</th>" +
						"<th>" + "group Number" + "</th>" + "</tr>" + "<tr>" + "<td>" + 
						jsonResponse[i].courseKey + "</td>" + "<td>"+ jsonResponse[i].groupNumber +
						 "</td>" + "</tr>";
						}
						newHtml += "</table>";

						$("#resDiv").append(newHtml);


					},
					error: function(errorMessage){
						console.log(errorMessage)
					}

	    		});
	    
		},
		error: function(errorMessage) {
			console.log(errorMessage);
		}
	});





});