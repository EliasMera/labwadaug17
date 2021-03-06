$(document).ready(function() {

///////////////////////////////// Boton Log In - Login.html   
    $('#errorCamposDiferentesClose').on("click", function() {
        $('#errorCamposDiferentes').hide();
    });     
          $("#buttonLogin").on("click",function(){

            var $userName = $("#userName");
            var $userPassword = $("#userPassword");

            // Validating the username input  
            inputValidatorLog($userName, "Ingrese su matrícula", $("#errorLabelUserName")); 
    
            // Validating the password inputs
            inputValidatorLog($userPassword, "Ingrese su contraseña", $("#errorLabelPassword"));

          	checked = false;
          	if($("#rememberme").is(":checked")){
          		checked = true;
          	}

            var jsonToSend = {
            	  "action" : "LOGIN",
                "username" : $("#userName").val(),
                "userPassword" : $("#userPassword").val(),
                "save" : checked
            };

            $.ajax({

                url : "PHP/applicationLayer.php",
                type : "POST",
                data : jsonToSend,
                dataType : "json",
                contentType : "application/x-www-form-urlencoded",
                success: function(jsonResponse){
                    window.location.replace("base.html");
                },
                error : function(errorMessage){
                    $('#campoVacio').hide();
                    $('#errorCamposDiferentes').hide();
                    $('#successAlert').hide();
                    $("#errorCamposDiferentes").show();
                }

            });
    function inputValidatorLog($currentElement, displayMessage, $targetSpan){
      if ($currentElement.val() == ""){
        $targetSpan.text(displayMessage);
      }
        else{
        $targetSpan.text("");
        }
      }
        });


//////////////////////////////// Cookie

  var jsonCookie = {
    "action" : "GETCOOKIE"
  };

  $.ajax({
    url: "PHP/applicationLayer.php",
    type: "POST",
    data: jsonCookie,
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    success: function(jsonResponse){
      $("#userName").val(jsonResponse.username);
    },

    error: function(errorMessage){
      
    }
  });

});