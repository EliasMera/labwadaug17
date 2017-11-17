$(document).ready(function(){

    $('#successAlertClose').on("click", function() {
        $('#successAlert').hide();
    });
	$("#grupoEsp").val(sessionStorage.getItem("curso")+ "." + sessionStorage.getItem("grupo"));

	var jsonToSend = {
		"action"	: "LOADESPPROJECT",
		"projectId" : sessionStorage.getItem("projectId")

	}

	console.log(sessionStorage.getItem("projectId"));

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
			+ "<th>" + "company" + "</th>" + 
			"<th>" + "classification" + "</th>" + "<th>" + "business" + "</th>" + 
		  "</tr>";
			for(i = 0; i < jsonResponse.length; i++){
				newHtml += "<tr>" + "<td>" + jsonResponse[i].name + "</td>" +
				"<td>" + jsonResponse[i].company + "</td>" +
				"<td>" + jsonResponse[i].classification + "</td>" +
				"<td>" + jsonResponse[i].business + "</td>" + "</tr>";
			}

			newHtml += "</table>";
			$("#resDiv").append(newHtml);
		},
		error: function(errorMessage){
			//alert(errorMessage);
		}

	});

	$("#grupoEsp").text(sessionStorage.getItem("curso"));

	var comentarios = "<br> Comentarios <br>";
	comentarios += '<a class="btn btn-primary" data-toggle="modal" data-target="#formModal">Agregar Feedback</a>';
	$("#resDiv").append(comentarios);


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
			+ "<th>" + "Nombre" + "</th>"  
			+ "<th>Borrar</th></tr>";	

			for(i = 0; i < jsonResponse.length; i++){
				var matricula = jsonResponse[i].studentId;
				newHtml += "<tr>" + "<td>" + matricula + "</td>"
				+ "<td>" + jsonResponse[i].name + "</td>"
				+ "<td><input id='delete' name='" + matricula 
				+ "' type='button' data-toggle='modal'"
				+ "class='btn btn-primary' data-target='#myModal' value='-'/></td></tr>";
			}
			newHtml += "</table>";
			var agrega = "<br><br><input type='submit' id='agregaBtn' class='btn btn-primary' value='Agregar integrante' /><br>";
			$("#mainBody").append(agrega);
			$("#mainBody").append(newHtml);	
		},
		error: function(errorMessage){
			//alert(errorMessage);
		}
	});

	$('#successAlertClose').on("click", function() {
        $('#successAlert').hide();
    });

	// Guardar nueva clasificacion sectorial
    $("#save").on("click", function() {
		var feed =  $("#newClassification").val().toUpperCase();
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
				$('#successAlert').show();
				$("#newClassification").val("");
			},
			error: function(errorMessage){
				console.log("fallo guardar");
			}
		});
    });


	$("#grupoEsp").on("click", function(){
		window.location.replace("Grupo.html");
	});


	$("#agregaBtn").on("click", function(){
		sessionStorage.setItem('source', "PROYECTO");
		window.location.replace("AgregaAlumnos.html");
	});

	$('body').delegate("#delete", "click", function() {
		console.log("click");
      	var id = $(this).parent().parent().find('td:eq(0)').text();
      	var text = $(this).parent().parent().find('td:eq(1)').text();
      	text += " con matricula " + id;
		$(".modal-body p strong").text(text);
		$(".modal-body p sub").text(id);
		$(".modal-body p sub").hide();
    });

    $("#confirmDelete").on("click", function() {
    	var matr = $(".modal-body p sub").text();
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
				location.reload();
			}
		});
    });

});