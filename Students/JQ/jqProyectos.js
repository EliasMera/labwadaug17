$(document).ready(function() {
		/*var jsonToSend = {
			"action": "LOADPROJECTS"
		}
			
			$.ajax({
				type: "POST",
				url: "PHP/applicationLayer.php",
				data : jsonToSend,
				dataType: "json",
				contentType: "application/x-www-form-urlencoded",
				success: function(jsonResp){

					var newHtml = "";
					newHtml += "<table border='1' align='center' width='95%'>" + "<tr>" + "<th>" + "Nombre del proyecto" + "</th>"
					+ "<th>" + "Compañía" + "</th>" + "<th>" + "Descripción" + "</th>" + "<th>" + "Clasificación" + "</th>" 
					+ "<th>" + "Giro" + "</th>" + "<th>" + "Semestre" + "</th>" + "</tr>";

					for(i = 0; i < jsonResp.length; i++){

					 newHtml += "<tr>" + "<td align='center'>" + jsonResp[i].name + "</td>" + "<td align='center'>" + jsonResp[i].company + "</td>" 
					 + "<td width='40%' align='justify'>" + jsonResp[i].description + "</td>" + "<td align='center'>" + jsonResp[i].classification + "</td>" 
					 + "<td width='30%' align='justify'>" + jsonResp[i].business + "</td>" + "<td align='center'>" + jsonResp[i].semester + "</td>"
					 + "</tr>";
					}

					newHtml += "</table>";

					$("#mainBody").append(newHtml);
					

				},
				error: function(errorMsg){
					alert(errorMsg);
				}

		});*/
		$("#dt_projectsHist").DataTable({
		"ajax":{
			"method":"POST",
			"url":"PHP/applicationLayer.php",
			"data": {action: 'LOADPROJECTS'}
		},
		"columns":[
			{"data":"name"},
			{"data":"company"},
			{"data":"description"},
			{"data":"classification"},
			{"data":"business"},
			{"data":"semester"}
		]

	});


	$("#btnFind").on("click",function(){ 
			var jsonToSend = {
				"action": "FINDPROJECTS",
				"keyword": $("#finder").val()
			}
				
				$.ajax({
					type: "POST",
					url: "PHP/applicationLayer.php",
					data : jsonToSend,
					dataType: "json",
					contentType: "application/x-www-form-urlencoded",
					success: function(jsonResp){

						$("#mainBody").text("");
						var newHtml = "";
						newHtml += "<table border='1' align='center' width='95%'>" + "<tr>" + "<th>" + "Nombre del proyecto" + "</th>"
						+ "<th>" + "Compañía" + "</th>" + "<th>" + "Descripción" + "</th>" + "<th>" + "Clasificación" + "</th>" 
						+ "<th>" + "Giro" + "</th>" + "<th>" + "Semestre" + "</th>" + "</tr>";

						for(i = 0; i < jsonResp.length; i++){

						 newHtml += "<tr>" + "<td align='center'>" + jsonResp[i].name + "</td>" + "<td align='center'>" + jsonResp[i].company + "</td>" 
						 + "<td width='40%' align='justify'>" + jsonResp[i].description + "</td>" + "<td align='center'>" + jsonResp[i].classification + "</td>" 
						 + "<td width='30%' align='justify'>" + jsonResp[i].business + "</td>" + "<td align='center'>" + jsonResp[i].semester + "</td>"
						 + "</tr>";
						}

						newHtml += "</table>";

						$("#mainBody").append(newHtml);
						

					},
					error: function(){
						alert("No se encontró \"" + $("#finder").val() + "\" en la base de datos");
					}

			});
		});

});