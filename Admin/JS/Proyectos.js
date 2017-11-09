$(document).ready(function(){
	loadAllProjects();

	$('#configureBtn').on("click", function() {
		window.location.replace("RegistrarGruposMaestros.html");
	});

    $('#changePassw').on("click", function() {
        window.location.replace("CambiarContrasena.html");
    });

    $('#participantsBtn').on("click", function() {
        window.location.replace("Participantes.html");
    });

    $('#logoutBtn').on("click", function() {
        var jsonToSend = {
            "action" : "LOGOUT"
        }
        $.ajax({
            url : "../PHP/applicationLayer.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonResponse){
                window.location.replace("LoginAdmin.html");
            },
            error : function(errorMessage){
                alert(errorMessage.responseText);
            }
        });
    });

    

	$('body').delegate('.cellButton', 'click', function(){
		var id = $(this).parent().find('td:eq(0)').text();
		var jsonToSend = {
			"action" : "PROJECTDETAILS",
			"id" : id
		}
		$.ajax({
            url : "../PHP/applicationLayer.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonResponse){
        		var row = $("<tr>");
        		row.append( $("<th>").text("Nombre"));
                row.append( $('<td>').text(jsonResponse[0][0].name));
                $("#project").append(row);
                row = $("<tr>");
                row.append( $("<th>").text("Empresa"));
                row.append( $('<td>').text(jsonResponse[0][0].company));
                $("#project").append(row);
                row = $("<tr>");
                row.append( $("<th>").text("Clasificación Sectorial"));
                row.append( $('<td>').text(jsonResponse[0][0].classification));
                $("#project").append(row);
                row = $("<tr>");
                row.append( $("<th>").text("Giro del negocio"));
                row.append( $('<td>').text(jsonResponse[0][0].business));
                $("#project").append(row);
                row = $("<tr>");
                row.append( $("<th>").text("Descripción"));
                row.append( $('<td>').text(jsonResponse[0][0].description));
                $("#project").append(row);
                // hide Project List
                $("#index").hide();
                // show Project details
                $("#viewDetails").show();

                // Populate team-members list
                for (var i = 0; i <= jsonResponse[0][1].length; i++) {
                	$(jsonResponse[0][1][i]).each(function() {
                		var row = $("<tr>");
                		row.append( $('<td>').text(jsonResponse[0][1][i].studentId));
                		row.append( $('<td>').text(jsonResponse[0][1][i].name));
                		$("#teamList").append(row);
                	});
                } 
            },
            error : function(errorMessage){
                alert(errorMessage.responseText);
            }
        });
	});

    $("#selection").on("click", function() {
        var jsonToSend = {
            "action" : "SELECTPROJECTS"
        }
        $.ajax({
            url : "../PHP/applicationLayer.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonResponse){
                window.location.replace("Participantes.html");
            },
            error : function(errorMessage){
                alert(errorMessage.responseText);
            }
        });
    });

});

function loadAllProjects() {
	var jsonToSend = {
		"action" : "GETALLPROJECTS"
	}
	$.ajax({
        url : "../PHP/applicationLayer.php",
        type : "POST",
        data : jsonToSend,
        dataType : "json",
        contentType : "application/x-www-form-urlencoded",
        success : function(jsonResponse){
            var body = $("<tbody>");
            for (var i = 0; i <= jsonResponse[0].length; i++) {
            	$(jsonResponse[0][i]).each(function() {
                    
            		var row = $("<tr>");
            		row.append( $('<td style="display: none;">').text(jsonResponse[0][i].id)); 
                    row.append( $('<td>').text(jsonResponse[0][i].teacher));
                    row.append( $('<td>').text(jsonResponse[0][i].courseKey + '.' + jsonResponse[0][i].groupNumber));
                    row.append( $('<td class="cellButton">').text(jsonResponse[0][i].name));
                    row.append( $('<td class="cellButton">').text(jsonResponse[0][i].company));
                    row.append( $('<td class="cellButton">').text(jsonResponse[0][i].classification));
                    row.append( $('<td class="cellButton">').text(jsonResponse[0][i].business));
                    row.append( $('<td>').text(jsonResponse[0][i].recomended));
                    row.append( $('<td>').text(jsonResponse[0][i].rank));

                    body.append(row);
            	});
            }
            $("#projectsList").append(body);
            //$('#projectsList').DataTable();
        },
        error : function(errorMessage){
            alert(errorMessage.responseText);
        }
    });
}