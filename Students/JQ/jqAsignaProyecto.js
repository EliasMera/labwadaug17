$(document).ready(function() {

          $("#buttonRegister").on("click",function(){
            var $name = $("#userName");
            var $company = $("#userPassword");
            var $description = $("#description");
            var $classification = $("#classification");
            var $business = $("#business");
            var $semester = $("#semester");

            var jsonToSend = {
            	"action" : "ASSIGNPROJECT",
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
                    window.location.replace("base.html");
                },
                error : function(errorMessage){
                    alert("No se asignó");
                    window.location.replace("base.html"); // Corregir el que se vaya por el success, mientras si jala entrando por aqui, lo lleva a la pagina principal.
                }
            });
        });
});