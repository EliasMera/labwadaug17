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

        if( passwrd == "" ){
            if(passwrd != passwrd2){
                alert("Error, no coinciden las contraseñas");
            }
            else{
                alert("Error, llenar los campos de matricula y contraseña usando la matricula del alumno");
            }
        }
        else{


            var curso = sessionStorage.getItem("curso");
            var grupo = sessionStorage.getItem("grupo");

            var jsonGetGroupId = {
                "action"    : "GETGROUPID",
                "curso"     : curso,
                "grupo"     : grupo
            }
            var jsonToSend = {}

            $.ajax({
                url : "PHP/applicationLayer.php",
                type : "POST",
                data : jsonGetGroupId,
                dataType : "json",
                contentType : "application/x-www-form-urlencoded",
                success: function(jsonResponse){
                        jsonToSend = {
                        "action"    : "REGISTERA",
                        "mat"       : mat,
                        "passwrd"   : passwrd,
                        "grupo"   : jsonResponse[0].id
                    }
                    debugger;
                        $.ajax({
                            url : "PHP/applicationLayer.php",
                            type : "POST",
                            data : jsonToSend,
                            dataType : "json",
                            contentType : "application/x-www-form-urlencoded",
                            success: function(jsonResponse){
                                alert("Alumno Registrado");
                                debugger
                            },
                            error : function(errorMessage){
                                debugger;
                                alert(errorMessage.responseText);
                            }

                        });

                        
                },
                error : function(errorMessage){
                    debugger;
                    alert(errorMessage.responseText);
                }

            });

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