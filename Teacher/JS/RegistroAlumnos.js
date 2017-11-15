$(document).ready(function(){



    $('#errorCamposVaciosClose').on("click", function() {
        $('#errorCamposVacios').hide();
    });

    $('#successAlertClose').on("click", function() {
        $('#successAlert').hide();
    });

    var curso = sessionStorage.getItem("curso");
    var grupo = sessionStorage.getItem("grupoId");
    var project = sessionStorage.getItem("projectId");
    var source = sessionStorage.getItem("source");


    $("#btnCancelar").on("click",function(){
        if(source === "GRUPO"){
            window.location.replace("Grupo.html");
        }
        else{
            window.location.replace("ProyectoEspecifico.html");
        }

    });

    $("#btnRegAlumno").on("click",function(){
        var mat = $("#matricula").val();
        var nom = $("#nombre").val();
        var carr = $("#carrera").val();
        var acamail = $("#correoTec").val();
        var permail = $("#correoX").val();
        var cell = $("#celular").val();

        // if( passwrd == "" ){
        //     if(passwrd != passwrd2){
        //         alert("Error, no coinciden las contraseñas");
        //     }
        //     else{
        //         alert("Error, llenar los campos de matricula y contraseña usando la matricula del alumno");
        //     }
        // }

        if(mat == "" || nom == "" || acamail == "" ){

            //alert("Error, porfavor llenar los campos de Matricula, Nombre y Correo Institucional");
            $("#errorCamposVacios").show();
        }
        else {

        var jsonToSend = {
            "action"    : (source === "GRUPO")? "REGISTERB" : "REGISTERA",
            "mat"       : mat,
            "nom"       : nom,
            "carr"      : carr,
            "acamail"   : acamail,
            "permail"   : permail,
            "cell"      : cell,
            "passwrd"   : mat,
            "grupoId"   : grupo,
            "projectId" : project
        }
        $.ajax({
            url : "PHP/applicationLayer.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            async: false,
            contentType : "application/x-www-form-urlencoded",
            success: function(jsonResponse){
                //alert("Alumno Registrado");
                $('#successAlert').show();
                if(source === "GRUPO"){
                    window.location.replace("Grupo.html");
                }
                else{
                    window.location.replace("ProyectoEspecifico.html");
                }
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