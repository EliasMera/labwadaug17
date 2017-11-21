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
					newHtml += "<table border='1' align='center' width='95%'>";

					for(i = 0; i < jsonResp.length; i++){

					 newHtml += "<tr><th align='center'>" + jsonResp[i].val + "</th>";
					 newHtml += "<td align='center'> <br>" +  "<input id='file' type='file' name='subearchivo" + (jsonResp[i].id).toString() + "''>" + "<br><br>" + 
					 "<input id='uploadBtn' name='submitBtn" + (jsonResp[i].id).toString() + "' type='submit' value='Subir Archivo' class='btn btn-primary'>" + "</td>" + "</tr>";
					}

					newHtml += "</table>";

					$("#mainBody2").append(newHtml);
					

				},
				error: function(errorMsg){
					alert(errorMsg);
				}

		});

});