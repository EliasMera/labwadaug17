$(document).ready(function() {

        // DESCRIPCION MAX LENGTH 600 CHARS
        $("#description").attr('maxlength','600');

        var jsonToSend2 = {
            "action" : "SHOWPROJECT"
        }

        //PROYECTO ACTIVO DEL ALUMNO EN TABLA
        $.ajax({
            url: "PHP/applicationLayer.php",
            type: "POST",
            data: jsonToSend2,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success : function(jsonResponse){

                    var newHtml = "";
                    newHtml += 
                    "<tr>" + "<th>" + "Nombre" + "</th>" + "<td>" + "<input id='editName' type='text' value='" + jsonResponse[0].name + "'>" + "</td>" + "</tr>" +
                    "<tr>" + "<th>" + "Compañia" + "</th>" + "<td>" + "<input id='editCompany' type='text' value='" + jsonResponse[0].company + "'>" + "</td>" + "</tr>" +
                    "<tr>" + "<th>" + "Descripción" + "</th>" + "<td>" + "<textarea id='editDescription' rows='10' cols='60'>" + jsonResponse[0].description + "</textarea>" + "</td>" + "</tr>" +
                    "<tr>" + "<th>" + "Clasificación" + "</th>" + "<td>" + "<select>";
                    for(i = 0; i < jsonResponse[0].classifications.length ; i++){

                        if(jsonResponse[0].classifications[i] != jsonResponse[0].classification){
                            newHtml += "<option value='" + jsonResponse[0].classifications[i] + "'>" + jsonResponse[0].classifications[i] + "</option>";
                        }
                        else{
                            newHtml += "<option selected='selected' value='" + jsonResponse[0].classifications[i] + "'>" + jsonResponse[0].classifications[i] + "</option>";
                        }
                    }
                    newHtml += "</select>";
                    newHtml += 
                    "<tr>" + "<th>" + "Giro" + "</th>" + "<td>" + "<input id='editBusiness' type='text' value='" + jsonResponse[0].business+ "'>" + "</td>" + "</tr>";

                    $("#editProjectTable").append(newHtml);

            },
            error : function(errorMessage){
                alert(errorMessage.responseText);
            }
        });

        //  COMENTARIO DEL PROYECTO
        var jsonToSend3 = {
            "action" : "SHOWCOMMENT"
        }

        $.ajax({
            url: "PHP/applicationLayer.php",
            type: "POST",
            data: jsonToSend3,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function (jsonResponse){

                var comentario = "";

                for(i = 0; i < jsonResponse.length; i++){
                    comentario += jsonResponse[i].comment;
                }

                $("#comentario").append(comentario);

            },
            error: function(errorMessage){
                
            }

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
                    window.location.replace("EdiarProyecto.html")
                },
                error : function(errorMessage){
                    
                }
            });
        });    
        
        //  PONER VISTA DE EDITAR
          $("#buttonEdit").on("click", function(){

                $("#change").removeClass("active");

          });

        //  QUITAR VISTA DE EDITAR
          $("#buttonCancel2").on("click", function(){

                $("#change").addClass("active");

          });

});