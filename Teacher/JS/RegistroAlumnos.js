$(document).ready(function(){
    var curso = sessionStorage.getItem("curso");
    var grupo = sessionStorage.getItem("grupoId");
    var project = sessionStorage.getItem("projectId");

    $("#btnCancelar").on("click",function(){
      window.location.replace("base.html");
  });

    $("#btnRegAlumno").on("click",function(){
        var mat = $("#matricula").val();
        var passwrd = $("#passwrd").val();
        var passwrd2 = $("#passwrdC").val();

        if( passwrd == "" ){
            if(passwrd != passwrd2){
                alert("Error, no coinciden las contraseñas");
            }
            else{
                alert("Error, llenar los campos de matricula y contraseña usando la matricula del alumno");
            }
        }
        var jsonToSend = {
            "action"    : "REGISTERA",
            "mat"       : mat,
            "passwrd"   : passwrd,
            "grupoId"     : grupo,
            "projectId" : project
        }
        debugger;
        $.ajax({
            url : "PHP/applicationLayer.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            async: false,
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