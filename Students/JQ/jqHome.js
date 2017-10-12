$(document).ready(function() {

/////////////////// CHECK SESSION
    var jsonSession = {
        "action" : "CHECKSESSION"
    }

    $.ajax({
            url: "PHP/applicationLayer.php",
            type: "POST",
            data: jsonSession,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonResponse){
                console.log("You are in logged in");
                sess = 1;
            },
            error: function(errorMessage){
                console.log("failed");
                //window.location.replace("Login.html")
                
                alert("Error session expired");
                window.location.replace("LoginAlumnos.html").delay(800);

            }

    });

    $("#homeBtn").on("click",function(){
        window.location.replace("base.html");
    });

    $("#historialBtn").on("click",function(){
        window.location.replace("HistorialProyectos.html");
    });

    $("#regisBtn").on("click",function(){
        window.location.replace("RegistroProyecto.html");
    });

    $("#editProj").on("click",function(){
        window.location.replace("EditarProyecto.html");
    });

    $("#changePassw").on("click",function(){
        window.location.replace("changePassw.html");
    });

////////////////// Change Password
    $("#changePasswBtn").on("click",function(){
    
    if($("#newPassw").val() != $("#newPasswConfirm").val()){
        alert("Las contraseñas nuevas no coinciden");
    }
    else{

    var jsonToSend = {
        "action" : "CHPASSWORD",
        "newPassword" : $("#newPassw").val()
    }

    $.ajax({
            url: "PHP/applicationLayer.php",
            type: "POST",
            data: jsonToSend,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonResponse){
                alert("Contraseña ha sido cambiada exitosamente");
                window.location.replace("base.html")

            },
            error: function(errorMessage){
                alert("No se pudo cambiar la contraseña");
            }

    });
}
    });

});