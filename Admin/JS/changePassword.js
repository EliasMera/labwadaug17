$(document).ready(function(){

	$('#changePasswBtn').on("click", function(){
		if($("#newPassw").val() != $("#newPasswConfirm").val()){
	        alert("Las contraseñas nuevas no coinciden");
	    }
	    else{

	    var jsonToSend = {
	        "action" : "CHANGEPASSWORD",
	        "newPassword" : $("#newPassw").val()
	    }

	    $.ajax({
            url: "../PHP/applicationLayer.php",
            type: "POST",
            data: jsonToSend,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonResponse){
                alert("Contraseña ha sido cambiada exitosamente");
                window.location.replace("Proyectos.html")

            },
            error: function(errorMessage){
                alert("No se pudo cambiar la contraseña");
            }

		    });
		}
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

    $('#participantsBtn').on("click", function() {
        window.location.replace("Participantes.html");
    });

    $('#configureBtn').on("click", function() {
        window.location.replace("RegistrarGruposMaestros.html");
    });


});