$(document).ready(function(){
	loadAllProjects();

	$('#configureBtn').on("click", function() {
		window.location.replace("RegistrarGruposMaestros.html");
	});

    $('#changePassw').on("click", function() {
        window.location.replace("CambiarContrasena.html");
    });

    $('#projectsBtn').on("click", function() {
        window.location.replace("Proyectos.html");
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

});

function loadAllProjects() {
	var jsonToSend = {
		"action" : "GETPARTICIPANTPROJECTS"
	}
	$.ajax({
        url : "../PHP/applicationLayer.php",
        type : "POST",
        data : jsonToSend,
        dataType : "json",
        contentType : "application/x-www-form-urlencoded",
        success : function(jsonResponse){
            for (var i = 0; i <= jsonResponse[0].length; i++) {
            	$(jsonResponse[0][i]).each(function() {
            		var row = $("<tr>");
                    row.append( $('<td>').text(jsonResponse[0][i].teacher));
                    row.append( $('<td>').text(jsonResponse[0][i].name));
                    row.append( $('<td>').text(jsonResponse[0][i].description));
                    
                    var j = 0;
                    var r = 1;
                    if (jsonResponse[0][i][0].length > 0){

                        while (r <= 4){
                            if (jsonResponse[0][i][0][j]['requirement'] == r) {
                                var descarga = $("<a download></a>");
                                descarga.attr("href", "../../Students/" + jsonResponse[0][i][0][j]['filePath']);
                                descarga.attr('target',"_blank");
                                descarga.text("Descargar");
                                row.append( $('<td>').append(descarga));
                                r++;
                                if (j+1 < jsonResponse[0][i][0].length)
                                    j++;
                            }
                            else {
                                r++;
                                row.append( $('<td >').text('N/A'));
                            }
                        }
                        // 
                    }    
                        
                    
                    else {
                        row.append( $('<td >').text('N/A'));
                        row.append( $('<td >').text('N/A'));
                        row.append( $('<td >').text('N/A'));
                        row.append( $('<td >').text('N/A'));
                    }
                    $("#projectsList").append(row); 
            	});
            }          
        },
        error : function(errorMessage){
            alert(errorMessage.responseText);
        }
    });
}