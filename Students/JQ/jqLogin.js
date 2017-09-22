$(document).ready(function() {

///////////////////////////////// Boton Log In - Login.html        
          $("#buttonLogin").on("click",function(){

            var $userName = $("#userName");
            var $userPassword = $("#userPassword");

            // Validating the username input  
            inputValidatorLog($userName, "Please provide the username.", $("#errorLabelUserName")); 
    
            // Validating the password inputs
            inputValidatorLog($userPassword, "Please provide the password", $("#errorLabelPassword"));

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
                  alert("Succeed");
                    window.location.replace("base.html");
                },
                error : function(errorMessage){
                  alert("Fail");
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