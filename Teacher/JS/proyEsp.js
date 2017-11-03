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

	var jsonToSendF = {
		"action"	: "LOADFEEDBACK",
		"projectId"	: sessionStorage.getItem("projectId")
	}

	$.ajax({
		url: "PHP/applicationLayer.php",
		type: "POST",
		data : jsonToSendF,
		dataType: "json",
		async:false,
		contentType: "application/x-www-form-urlencoded",
		success: function(jsonResponse){
			var comentarios = "<br> Comentarios <br>";
			comentarios += "<textarea id='feed' rows='5' cols='150' disabled>";
			for(i = 0; i < jsonResponse.length; i++){
				comentarios += jsonResponse[i].comment;	
			}
			comentarios += "</textarea><br>";
			comentarios += "<input type='submit' id='editaFeed' value='Editar' />  ";
			comentarios += "<input type='submit' id='guardaFeed' value='Guardar' /><br>";
			$("#mainBody").append(comentarios);
		},
		error: function(errorMessage){
			var comentarios = "<br> Comentarios <br>";
			comentarios += "<textarea id='feed' rows='5' cols='150' disabled>";
			comentarios += ""; //agrega feedback
			comentarios += "</textarea><br>";
			comentarios += "<input type='submit' id='editaFeed' value='Editar' />  ";
			comentarios += "<input type='submit' id='guardaFeed' value='Guardar' /><br>";
			$("#mainBody").append(comentarios);
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
			var agrega = "<br><br><input type='submit' id='agregaBtn' value='Agregar integrante' /><br>";
			$("#mainBody").append(agrega);
			$("#mainBody").append(newHtml);	
		},
		error: function(errorMessage){
			alert(errorMessage);
		}
	});

	$("#editaFeed").on("click", function(){
		$("#feed").attr("disabled", false); 
	});

	$("#guardaFeed").on("click", function(){
		$("#feed").attr("disabled", true);
		var feed =  $('#feed').val(); 

		var json2Send = {
			"action"	: "SAVEFEEDBACK",
			"comment"	: feed,
			"projectId"	: sessionStorage.getItem("projectId")
		}

		$.ajax({
			url: "PHP/applicationLayer.php",
			type: "POST",
			data : json2Send,
			dataType: "json",
			async : false,
			contentType: "application/x-www-form-urlencoded",
			success: function(jsonResponse){
				location.reload();
			},
			error: function(errorMessage){
				console.log("fallo guardar");
			}
		});
	});	

	$("#agregaBtn").on("click", function(){
		sessionStorage.setItem('source', "PROYECTO");
		window.location.replace("RegistroAlumnos.html");
	});

	$("#mainBody").on("click",".btnEdit", function(){
		sessionStorage.setItem('matricula', $(this).attr("name"));
		window.location.replace("EditaAlumnos.html");
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