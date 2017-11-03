$(document).ready(function(){
	$("#groupBtn").on("click", function(){
		window.location.replace("PaginaGrupos.html");

	});

        $("#logoutBtn").click(function(){

        	var jsonLogout = {
            	    "action" : "LOGOUT"
        	};

            $.ajax({
                url: "PHP/applicationLayer.php",
                type: "POST",
                data : jsonLogout,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",
                success: function(jsonResponse){
                    //alert(jsonResponse.message);
                    window.location.replace("LoginMaestros.html");
                },
                error: function(errorMessage) {
                }
            });
        });

        $("#changePass").click(function(){
        	window.location.replace("ChangePass.html");
        });

////////////////// Change Password
    $("#changePasswBtn").on("click",function(){
    
    if($("#newPassw").val() != $("#newPasswConfirm").val()){
        alert("Las contraseñas nuevas no coinciden");
    }
    else{

    var jsonToSend = {
        "action" : "CHANGEPASS",
        "passwrd" : $("#newPassw").val()
    }

    $.ajax({
            url: "PHP/applicationLayer.php",
            type: "POST",
            data: jsonToSend,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonResponse){
                alert("Contraseña ha sido cambiada exitosamente");
                window.location.replace("home.html")

            },
            error: function(errorMessage){
                alert("No se pudo cambiar la contraseña");
            }

    });
}
    });


	// function groupButton(){
	// 	alert("melapelantodosda");
	// }

	// var jsonCookie = {
	// "action" : "GETCOOKIE"
	// };

	// $.ajax({
	// 	url: "PHP/applicationLayer.php",
	// 	type: "POST",
	// 	data : jsonCookie,
	// 	dataType: "json",
	// 	contentType: "application/x-www-form-urlencoded",
	// 	success: function(jsonResponse){
	//     	$("#teacherId").val(jsonResponse.teacherId);
	    
	// 	},
	// 	error: function(errorMessage) {
	// 	}
	// });
	
});