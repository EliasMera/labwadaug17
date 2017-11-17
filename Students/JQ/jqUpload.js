$(document).ready(function() {
		var jsonToSend = {
			"action": "ARCHREQ"
		}
			
			$.ajax({
				type: "POST",
				url: "PHP/applicationLayer.php",
				data : jsonToSend,
				dataType: "json",
				contentType: "application/x-www-form-urlencoded",
				success: function(jsonResp){

					var newHtml = "";
					newHtml += "<table border='1' align='center' width='95%'>" + "<tr>";

					for(i = 0; i < jsonResp.length; i++){

					 newHtml += "<th align='center'>" + jsonResp[i].val + "</th>";
					}

					newHtml += " </tr>" + "<tr>";

					for(i = 0; i < jsonResp.length; i++){

					 newHtml += "<td align='center'>" +  "<input id='file' type='file' name='subearchivo" + (jsonResp[i].id).toString() + "''>" + "<br>" +  

					 "<input id='uploadBtn' name='submitBtn" + (jsonResp[i].id).toString() + "' type='submit' value='Subir Archivo' class='btn btn-primary'>" + "</td>";
					
					}

					newHtml += " </tr> </table>";

					$("#mainBody2").append(newHtml);
					

				},
				error: function(errorMsg){
					alert(errorMsg);
				}

		});

});