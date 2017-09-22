$(document).ready(function(){
	$("#btnCancelar").on("click",function(){
		window.location.replace("base.html");
	});

	$("#btnRegAlumno").on("click",function(){
        var mat = $("#matricula").val();
        var nom = $("#nombre").val();
        var carrera = $("#carrera").val();
        var passwrd = $("#passwrd").val();
        var passwrd2 = $("#passwrdC").val();
        var correoTec = $("#correoTec").val();
        var correoX = $("#correoX").val();
        var celular = $("#celular").val();

        if(mat == "" || nom == "" || carrera == "" || passwrd == "" || correoX == "" || correoTec == ""){
            if(passwrd != passwrd2){
                alert("Error, no coinciden las contraseñas");
            }
            else{
                alert("Error, llenar todos los campos");
            }
        }
        else{
            var jsonToSend = {
                "action"    : "REGISTERA",
                "mat"       : mat,
                "nom"       : nom,
                "carrera"   : carrera,
                "passwrd"   : passwrd,
                "correoTec" : correoTec,
                "correoX"   : correoX,
                "celular"   : celular
            };

            $.ajax({
                url : "PHP/applicationLayer.php",
                type : "POST",
                data : jsonToSend,
                dataType : "json",
                contentType : "application/x-www-form-urlencoded",
                success: function(jsonResponse){
                    alert("Alumno Registrado");
                    window.location.replace("base.html");
                },
                error : function(errorMessage){
                    alert(errorMessage.responseText);
                }

            });
        }
	});

	var jsonCookie = {
    	"action" : "GETCOOKIE"
	};

	$.ajax({
    	url: "PHP/applicationLayer.php",
    	type: "POST",
    	data : jsonCookie,
    	dataType: "json",
    	contentType: "application/x-www-form-urlencoded",
    	success: function(jsonResponse){
        	$("#teacherId").val(jsonResponse.teacherId);
    	},
    	error: function(errorMessage) {
    	}
	});
});