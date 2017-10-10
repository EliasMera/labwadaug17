$(document).ready(function(){
	var jsonToSend = {
		"action"	: "LOADESPPROJECT",
		"projectId" : sessionStorage.getItem("projectId")

		}
		
			$.ajax({
				url: "PHP/applicationLayer.php",
				type: "POST",
				data : jsonToSend,
				dataType: "json",
				async:false,
				contentType: "application/x-www-form-urlencoded",
				success: function(jsonResponse){
					var newHtml = "";
					newHtml += "<table>" + "<tr>" + "<th>" + "name" + "</th>" 
					  + "<th>" + "company" + "</th>" + "<th>" + "description" + "</th>" + 
					  "<th>" + "classification" + "</th>" + "<th>" + "business" + "</th>" + 
					   "<th>" + "semester" + "</th>" + "<th>" + "recomended" + "</th>" + "<th>" 
					   + "rank" + "</th>" + "<th>" + "active" + "</th>" +  "</tr>";
						for(i = 0; i < jsonResponse.length; i++){
							newHtml += "<tr>" + "<td>" + jsonResponse[i].name + "</td>" +
										"<td>" + jsonResponse[i].company + "</td>" +
										"<td>" + jsonResponse[i].description + "</td>" +
										"<td>" + jsonResponse[i].classification + "</td>" +
										"<td>" + jsonResponse[i].business + "</td>" + 
										"<td>" + jsonResponse[i].semester + "</td>" +
										"<td>" + jsonResponse[i].recomended + "</td>" +
										"<td>" + jsonResponse[i].rank + "</td>" +
										"<td>" + jsonResponse[i].active + "</td>" + "</tr>";
						}

						newHtml += "</table>";
						$("#resDiv").append(newHtml);

					

				},
				error: function(errorMessage){
					alert(errorMessage);
				}

		});


	var jsonToSend2 = {
		"action" 	: "LOADSTUDENTS",
		"projectId" : sessionStorage.getItem("projectId"),
		"grupoId"	: sessionStorage.getItem("grupoId")

		}	
			 

			$.ajax({
			url: "PHP/applicationLayer.php",
			type: "POST",
			data : jsonToSend2,
			dataType: "json",
			async:false,
			contentType: "application/x-www-form-urlencoded",
			success: function(jsonResponse){
				var newHtml = "";
				newHtml += "<table>" + "<tr>" + "<th>" + "Matricula" + "</th>"
				+ "<th>" + "Nombre" + "</th>" + "<th>" + "Carrera" + "</th>"
				+ "<th>" + "Email academico" + "</th>" 
				+ "<th>" + "Email personal" + "</th>"
				+ "<th>" + "Celular" + "</th>" + "</tr>";	

				for(i = 0; i < jsonResponse.length; i++){

				newHtml += "<tr>" + "<td>" + jsonResponse[i].studentId + "</td>"
				+ "<td>" + jsonResponse[i].name + "</td>"
				+ "<td>" + jsonResponse[i].bachelor + "</td>"
				+ "<td>" + jsonResponse[i].academicEmail + "</td>"
				+ "<td>" + jsonResponse[i].personalEmail + "</td>"
				+ "<td>" + jsonResponse[i].cellphone + "</td>" + "</tr>";	
				}

				newHtml += "</table>";

				$("#mainBody").append(newHtml);	
					
				

			},
			error: function(errorMessage){
				alert(errorMessage);
			}

	});





});