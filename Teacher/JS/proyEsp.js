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
			+ "<th>" + "Celular" + "</th>" 
			+ "<th>Editar</th><th>Borrar</th></tr>";	

			for(i = 0; i < jsonResponse.length; i++){
				var matricula = jsonResponse[i].studentId;
				newHtml += "<tr>" + "<td>" + matricula + "</td>"
				+ "<td>" + jsonResponse[i].name + "</td>"
				+ "<td>" + jsonResponse[i].bachelor + "</td>"
				+ "<td>" + jsonResponse[i].academicEmail + "</td>"
				+ "<td>" + jsonResponse[i].personalEmail + "</td>"
				+ "<td>" + jsonResponse[i].cellphone + "</td>" 
				+ "<td><input class='btnEdit' type='submit' value='Editar' name='" + matricula + "'/></td>"
				+ "<td><input class='btnBorra' type='submit' value='Borrar' name='" + matricula + "'/></td>"
				+ "</tr>";	
			}
			newHtml += "</table>";
			var agrega = "<br><input type='submit' id='agregaBtn' value='Agregar integrante' /><br><br>";
			$("#mainBody").append(agrega);
			$("#mainBody").append(newHtml);	
		},
		error: function(errorMessage){
			alert(errorMessage);
		}
	});

	$("#agregaBtn").on("click", function(){
		window.location.replace("RegistroAlumnos.html")
	});

	$("#mainBody").on("click",".btnEdit", function(){
		sessionStorage.setItem('matricula', $(this).attr("name"));
		window.location.replace("EditaAlumnos.html");
		//saco numero de grupo
		//var grupo = $(this).closest('td').next().text();

		/*var grupoId = $(this).closest('td').next().next().text();

		sessionStorage.setItem('curso', $(this).attr("name"));
		sessionStorage.setItem('grupo', $(this).closest('td').next().text());
		sessionStorage.setItem('grupoId', $(this).closest('td').next().next().text());
		window.location.replace("Grupo.html");*/
	});

	$("#mainBody").on("click",".btnBorra", function(){
		var matr = $(this).attr("name");
		if (confirm('Seguro de eliminar alumno con matricula ' + matr + '?')) {
		    var jsonToSend3 = {
				"action" 	: "DELETESTUDENT",
				"matricula" : matr
			}

			$.ajax({
				url: "PHP/applicationLayer.php",
				type: "POST",
				data : jsonToSend3,
				dataType: "json",
				async : false,
				contentType: "application/x-www-form-urlencoded",
				success: function(jsonResponse){
					location.reload();
				},
				error: function(errorMessage){
					console.log("fallo");
					alert(errorMessage.message);
				}
			});
		} 
	});

});