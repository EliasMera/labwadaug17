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


/////////////////// CHECA SI TIENE PROYECTO
    var jsonSession = {
        "action" : "CHECKHASPROYECT"
    }

    $.ajax({
            url: "PHP/applicationLayer.php",
            type: "POST",
            data: jsonSession,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonResponse){
                $("#editProj").show()
                $("#regisBtn").hide()
            },
            error: function(errorMessage){
                $("#editProj").hide()
                $("#regisBtn").show()
            }

    });

    $("#logoutBtn").on("click", function() {
        var jsonToSend = {
            "action" : "LOGOUT"
        }
        $.ajax({
            url : "PHP/applicationLayer.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonResponse){
                window.location.replace("LoginAlumnos.html");
            },
            error : function(errorMessage){
                alert(errorMessage.responseText);
            }
        });
    });

    // Cargar Anuncios
    var jsonAnouncements = {
        "action" : "LOADANOUNCEMENTS"
    }
    $.ajax({
        url : "PHP/applicationLayer.php",
        type : "POST",
        data : jsonAnouncements,
        dataType : "json",
        contentType : "application/x-www-form-urlencoded",
        success : function(jsonResponse){
          for (var i = 0; i <= jsonResponse[0].length; i++) {
              $(jsonResponse[0][i]).each(function() {
                  var row = $("<tr>");
                  row.append( $('<td style="display: none;">').text(jsonResponse[0][i].id)); 
                  row.append( $('<td>').text(jsonResponse[0][i].date_time));
                  row.append( $('<td>').text(jsonResponse[0][i].val));
                  $("#anounceTable").append(row); 
              });
          }
        },
        error : function(errorMessage){
            alert(errorMessage.responseText);
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

    $("#uploadFiles").on("click",function(){
        window.location.replace("subeArchivos.php");
    });

    $("#myInfo").on("click",function(){
        window.location.replace("EditarCuenta.html");
    });

////////////////// Change Password
    $('#campoVacioClose').on("click", function() {
        $('#campoVacio').hide();
    });

    $('#errorCamposDiferentesClose').on("click", function() {
        $('#errorCamposDiferentes').hide();
    });

    $('#successAlertClose').on("click", function() {
        $('#successAlert').hide();
    });


    $("#changePasswBtn").on("click",function(){

    if($("#newPassw").val() == "" || $("#newPasswConfirm").val() == ""){
        $('#campoVacio').hide();
        $('#errorCamposDiferentes').hide();
        $('#successAlert').hide();
        $("#campoVacio").show();
    }
    else if($("#newPassw").val() != $("#newPasswConfirm").val()){
        $('#campoVacio').hide();
        $('#errorCamposDiferentes').hide();
        $('#successAlert').hide();
        $("#errorCamposDiferentes").show();
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
                $('#campoVacio').hide();
                $('#errorCamposDiferentes').hide();
                $('#successAlert').hide();
                $("#successAlert").show();
                //window.location.replace("base.html")

            },
            error: function(errorMessage){
                alert("No se pudo cambiar la contraseña");
            }

    });
}
    });

});