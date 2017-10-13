$(document).ready(function(){
    var curso = sessionStorage.getItem("curso");
    var grupo = sessionStorage.getItem("grupoId");
    var project = sessionStorage.getItem("projectId");
    var matricula = sessionStorage.getItem("matricula");
    $("#matricula").val(matricula);

    var jsonAlumn = {
        "action" : "GETALUMNI",
        "matricula" : matricula
    };

    $.ajax({
        url: "PHP/applicationLayer.php",
        type: "POST",
        data : jsonAlumn,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function(jsonResponse){
            var matricula = jsonResponse[0].studentId;
            var nombre = jsonResponse[0].name;
            var carrera = jsonResponse[0].bachelor;
            var acamail = jsonResponse[0].academicEmail;
            var permail = jsonResponse[0].personalEmail;
            var cell = jsonResponse[0].cellphone;
            $("#nombre").val(nombre);
            $("#carrera").val(carrera);
            $("#correoTec").val(acamail);
            $("#correoX").val(permail);
            $("#celular").val(cell);
        },
        error: function(errorMessage) {
        }
    });

    $("#btnCancelar").on("click",function(){
        window.location.replace("ProyectoEspecifico.html");
    });

    $("#btnEditAlumno").on("click",function(){
        var mat = $("#matricula").val();
        var nom = $("#nombre").val();
        var carr = $("#carrera").val();
        var acamail = $("#correoTec").val();
        var permail = $("#correoX").val();
        var cell = $("#celular").val();

        var jsonToSend = {
            "action"    : "EDITALUMNI",
            "mat"       : mat,
            "nom"       : nom,
            "carr"      : carr,
            "acamail"   : acamail,
            "permail"   : permail,
            "cell"      : cell,
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
                alert("Alumno Actualizado");
                window.location.replace("ProyectoEspecifico.html");
            },
            error : function(errorMessage){
                alert(errorMessage.responseText);
            }

        });
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