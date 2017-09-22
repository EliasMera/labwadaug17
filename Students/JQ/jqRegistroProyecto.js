$(document).ready(function() {

          $("#buttonRegister").on("click",function(){
            var $name = $("#userName");
            var $company = $("#userPassword");
            var $description = $("#description");
            var $classification = $("#classification");
            var $business = $("#business");
            var $semester = $("#semester");

            var jsonToSend = {
            	"action" : "REGISTERPROJECT",
                "name" : $("#name").val(),
                "company" : $("#company").val(),
                "description" : $("#description").val(),
                "classification" : $("#classification").val(),
                "business" : $("#business").val(),
                "semester" : $("#semester").val()
            };

            $.ajax({
                url : "PHP/applicationLayer.php",
                type : "POST",
                data : jsonToSend,
                dataType : "json",
                contentType : "application/x-www-form-urlencoded",
                success: function(jsonResponse){
                	alert("Se registró correctamente");
                },
                error : function(errorMessage){
                    alert("Error en registro");
                }
            });
        });
});