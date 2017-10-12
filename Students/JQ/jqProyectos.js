$(document).ready(function() {
		var jsonToSend = {
			"action"	: "LOADPROJECTS"
		}
			
			$.ajax({
				type: "POST",
				url: "PHP/applicationLayer.php",
				data : jsonToSend,
				dataType: "json",
				contentType: "application/x-www-form-urlencoded",
				success: function(jsonResp){

					var newHtml = "";
					newHtml += "<table>" + "<tr>" + "<th>" + "Nombre" + "</th>"
					+ "<th>" + "Prioridad" + "</th>" + "<th>" + "Apto" + "</th>" + "</tr>";

					for(i = 0; i < jsonResp.length; i++){

					 newHtml += "<tr>" + "<td>" + jsonResp[i].name + "</td>" + "<td>" + jsonResp[i].rank + "</td>" + "<td>"
					 + "<select id = 'apto'>" + "<option value='0'>" + "Apto" + "</option>" + "<option value='1'>"
					 + "SI" + "</option>" + "<option value='2'>" + "NO" + "</option>" + "</select>" + "</td>"
					 + "<td>" + "<input align='center' class='viewPButton' type='submit' name='View' "  + "</td>" 
					 + "<td class='hidden'>" + jsonResp[i].id + "</td>" + "</tr>";
					}

					newHtml += "</table>";

					$("#mainBody").append(newHtml);
					

				},
				error: function(errorMsg){
					alert(errorMsg);
				}

		});
});