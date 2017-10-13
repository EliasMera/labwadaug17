$(document).ready(function(){
	
	var jsonToSend = {
		"action"	: "LOADPROJECTS"
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
			newHtml += "<table>" + "<tr>" + "<th>" + "Nombre" + "</th>"
			+ "<th>" + "Prioridad" + "</th>" + "<th>" + "Apto" + "</th>" + "</tr>";
			for(i = 0; i < jsonResponse.length; i++){
				var recommended = jsonResponse[i].recomended == 1;
				var opcion1 = (recommended ? "SI" : "NO");
				var opcion2 = (recommended ? "NO" : "SI");
				var projId = jsonResponse[i].id;
				newHtml += "<tr>" + "<td>" + jsonResponse[i].name + "</td>" + "<td>" + jsonResponse[i].rank + "</td>" + "<td>"
				+ "<select name='" + projId + "' id='apto'>" + "<option value='" + opcion1 + "'>" + opcion1 + "</option>" + "<option value='" + opcion2 + "'>"
				+ opcion2 + "</option>" + "</select>" + "</td>"
				+ "<td>" + "<input align='center' class='viewPButton' type='submit' value='Ver' "  + "</td>" 
				+ "<td class='hidden'>" + projId + "</td>" + "</tr>";
			}
			newHtml += "</table>";

			$("#mainBody").append(newHtml);


		},
		error: function(errorMessage){
			$("#mainBody").append("There are no projects registered");
		}
	});

	$("select").change(function() {
		var projectId = $(this).attr("name");
		var recommended = $(this).val() === "SI"? 1 : 0;

		var jsonToSend = {
			"action"	: "UPDATERECOMMEND",
			"recommend"	: recommended,
			"projectId"	: projectId
		}
	  	
	  	$.ajax({
			url: "PHP/applicationLayer.php",
			type: "POST",
			data : jsonToSend,
			dataType: "json",
			async : false,
			contentType: "application/x-www-form-urlencoded",
			success: function(jsonResponse){
				console.log(recommended);
			},
			error: function(errorMessage){
			}
		});
	});

	$("#groupBtn").val(sessionStorage.getItem("curso")+ "." + sessionStorage.getItem("grupo"));

	$("#mainBody").on("click",".viewPButton", function(){
		//debugger;
		var projectId = $(this).closest('td').next().text();
		sessionStorage.setItem('projectId', $(this).closest('td').next().text());
		window.location.replace("ProyectoEspecifico.html");
	});

});