$(document).ready(function() {

        // DESCRIPCION MAX LENGTH 600 CHARS
        $("#description").attr('maxlength','600');

        var jsonToSend2 = {
            "action" : "SHOWPROJECT"
        }

        $.ajax({
            url: "PHP/applicationLayer.php",
            type: "POST",
            data: jsonToSend2,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonResponse){

                var newHtml = "";
                    newHtml += "<table border='1' align='center' width='95%'>" + "<tr>" + "<th>" + "Nombre del proyecto" + "</th>"
                    + "<th>" + "Compañía" + "</th>" + "<th>" + "Descripción" + "</th>" + "<th>" + "Clasificación" + "</th>" 
                    + "<th>" + "Giro" + "</th>" + "<th>" + "Comentarios" + "</th>" + "</tr>";

                    for(i = 0; i < jsonResponse.length; i++){

                     newHtml += "<tr>" + "<td align='center'>" + jsonResponse[i].name + "</td>" + "<td align='center'>" + jsonResponse[i].company + "</td>" 
                     + "<td width='40%' align='justify'>" + jsonResponse[i].description + "</td>" + "<td align='center'>" + jsonResponse[i].classification + "</td>" 
                     + "<td width='30%' align='justify'>" + jsonResponse[i].business + "</td>" + "</tr>";
                    }

                    newHtml += "</table>";

                    $("#mainBody").append(newHtml);
            },
            error: function(errorMessage){
                alert("error");
            }
        });     
        
        //  PONER VISTA DE EDITAR
          $("#buttonEdit").on("click", function(){

                $("#change").removeClass("active");

          });

        //  QUITAR VISTA DE EDITAR
          $("#buttonCancel2").on("click", function(){

                $("#change").addClass("active");

          });

        //  EDITAR PROYECTO
          $("#buttonSave").on("click",function(){

            var $name = $("#userName");
            var $company = $("#userPassword");
            var $description = $("#description");
            var $classification = $("#classification");
            var $business = $("#business");

            var jsonToSend = {
            	"action" : "EDITPROJECT",
                "name" : $("#name").val(),
                "company" : $("#company").val(),
                "description" : $("#description").val(),
                "classification" : $("#classification").val(),
                "business" : $("#business").val()
            };

            $.ajax({
                url : "PHP/applicationLayer.php",
                type : "POST",
                data : jsonToSend,
                dataType : "json",
                contentType : "application/x-www-form-urlencoded",
                success: function(jsonResponse){
                    window.location.replace("EditarProyecto.html");
                },
                error : function(errorMessage){
                    window.location.replace("EditarProyecto.html");
                }
            });
        });
});