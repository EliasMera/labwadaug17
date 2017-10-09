$(document).ready(function(){
	

		var jsonToSend = {
			"action"	: "LOADPROJECTS"
		}
			debugger;
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
					+ "<th>" + "Prioridad" + "</th>" + "<th>" + "Apto" + "</th>";
					for(i = 0; i < jsonResponse.length; i++){

					 newHtml += "<tr>" + "<td>" + jsonResponse[i].name + "</td>" + "<td>" + jsonResponse[i].rank + "</td>" + "<td>"
					 + "<select id = 'apto'>" + "<option value='0'>" + "Apto" + "</option>" + "<option value='1'>"
					 + "SI" + "</option>" + "<option value='2'>" + "NO" + "</option>" + "</select>" + "</td>" + "</tr>";
					}
					newHtml += "</table>";

					$("#mainBody").append(newHtml);
					

				},
				error: function(errorMessage){
					alert(errorMessage);
				}


		

		});

	$("#groupBtn").val(sessionStorage.getItem("curso")+ "." + sessionStorage.getItem("grupo"));


	$("#registerStu").on("click", function(){
		window.location.replace("RegistroAlumnos.html")


	});

});