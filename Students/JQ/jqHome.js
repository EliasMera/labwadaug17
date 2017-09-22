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
});