$(document).ready(function() {


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
                    "<tr>" + "<th>" + "Nombre" + "</th>" + "<td>" + "<input id='editName' size='50' type='text' value='" + jsonResponse[0].name + "'>" + "</td>" + "</tr>" +
                    "<tr>" + "<th>" + "Compañia" + "</th>" + "<td>" + "<input id='editCompany' size='50' type='text' value='" + jsonResponse[0].company + "'>" + "</td>" + "</tr>" +
                    "<tr>" + "<th>" + "Descripción" + "</th>" + "<td>" + "<textarea id='editDescription' rows='10' cols='60'>" + jsonResponse[0].description + "</textarea>" + "</td>" + "</tr>" +
                    "<tr>" + "<th>" + "Clasificación" + "</th>" + "<td>" + "<select id='editClassification'>";
                    for(i = 0; i < jsonResponse[0].classifications.length ; i++){

                        if(jsonResponse[0].classifications[i] != jsonResponse[0].classification){
                            newHtml += "<option value='" + jsonResponse[0].classifications[i] + "'>" + jsonResponse[0].classifications[i] + "</option>";
                        }
                        else{
                            newHtml += "<option selected = 'selected' value='" + jsonResponse[0].classifications[i] + "'>" + jsonResponse[0].classifications[i] + "</option>";
                        }
                    }
                    newHtml += "</select>";
                    newHtml += "<tr>" + "<th>" + "Giro" + "</th>" + "<td>" + "<textarea id='editBusiness' rows='3' cols='60'>" + jsonResponse[0].business + "</textarea>" + "</td>" + "</tr>";

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
          $("#btnEdit").on("click",function(){

            var jsonToSend = {
                "action" : "EDITPROJECT",
                "name" : $("#editName").val(),
                "company" : $("#editCompany").val(),
                "description" : $("#editDescription").val(),
                "classification" : $("#editClassification").val(),
                "business" : $("#editBusiness").val()
            };

            $.ajax({
                url : "PHP/applicationLayer.php",
                type : "POST",
                data : jsonToSend,
                dataType : "json",
                contentType : "application/x-www-form-urlencoded",
                success: function(jsonResponse){
                    window.location.replace("EditarProyecto.html")
                },
                error : function(errorMessage){
                    
                }
            });
        });    

});