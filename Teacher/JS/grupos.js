$(document).ready(function(){
	var jsonCookie = {
		"action" : "GETCOOKIE"
	};

	var id;

	$.ajax({
		url: "PHP/applicationLayer.php",
		type: "POST",
		data : jsonCookie,
		dataType: "json",
		async: false,
		contentType: "application/x-www-form-urlencoded",
		success: function(jsonResponse){
			id = jsonResponse.id;
			console.log("cookie bien");
		},
		error: function(errorMessage) {
			console.log(errorMessage);
		}
	});
	
	var jsonGroups = {
		"action" : "GETGROUPS",
		"teacherId" : id
	};

	$.ajax({
		url: "PHP/applicationLayer.php",
		type: "POST",
		data : jsonGroups,
		dataType: "json",
		async: false,
		contentType: "application/x-www-form-urlencoded",
		success: function(jsonResponse){
			var newHtml = "";
			newHtml += "<table>" + "<thead><tr>" + "<th>" + "Course Key" + "</th>" +
			"<th>" + "group Number" + "</th>" + "</tr></thead><tbody>";
			for(i = 0; i < jsonResponse.length; i++){
				var key = jsonResponse[i].courseKey;
				newHtml +=  "<tr>" + "<td>" + "<input align='center' id='cursoBtn' class='grupoBtn' type='submit' value='" +
				key + "' name = '" + key + "'>" + "</a>" + "</td>" +
				"<td>"+ jsonResponse[i].groupNumber +
				"</td>" + "<td class='hidden'>" + jsonResponse[i].id + "</td>" + "</tr>";
			}


			newHtml += "</tbody></table>";

			$("#resDiv").append(newHtml);
		}
		,
		error: function(errorMessage){
			console.log(errorMessage)
		}

	});

	$("#resDiv").on("click",".grupoBtn", function(){
		
		//sacar nombre de curso
		var curso = $(this).attr("name");
		//saco numero de grupo
		var grupo = $(this).closest('td').next().text();

		var grupoId = $(this).closest('td').next().next().text();

		sessionStorage.setItem('curso', $(this).attr("name"));
		sessionStorage.setItem('grupo', $(this).closest('td').next().text());
		sessionStorage.setItem('grupoId', $(this).closest('td').next().next().text());
		window.location.replace("Grupo.html");
	});
});