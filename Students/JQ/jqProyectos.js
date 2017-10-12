$(document).ready(function(){
		var jsonToSend = {
			"action"	: "LOADPROJECTS"
		}
			
			$.ajax({
				url: "PHP/applicationLayer.php",
				type: "POST",
				data : jsonToSend,
				dataType: "json",
				contentType: "application/x-www-form-urlencoded",
				success: function(jsonResponse){

					var newHtml = "";
					newHtml += "<table>" + "<tr>" + "<th>" + "Nombre" + "</th>"
					+ "<th>" + "Prioridad" + "</th>" + "<th>" + "Apto" + "</th>" + "</tr>";
					
					for(i = 0; i < jsonResponse.length; i++){

					 newHtml += "<tr>" + "<td>" + jsonResponse[i].name + "</td>" + "<td>" + jsonResponse[i].rank + "</td>" + "<td>"
					 + "<select id = 'apto'>" + "<option value='0'>" + "Apto" + "</option>" + "<option value='1'>"
					 + "SI" + "</option>" + "<option value='2'>" + "NO" + "</option>" + "</select>" + "</td>"
					 + "<td>" + "<input align='center' class='viewPButton' type='submit' name='View' "  + "</td>" 
					 + "<td class='hidden'>" + jsonResponse[i].id + "</td>" + "</tr>";
					}
					newHtml += "</table>";

					$("#mainBody").append(newHtml);
					

				},
				error: function(errorMessage){
					alert(errorMessage);
				}

		});
});