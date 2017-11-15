$(document).ready(function(){
    var curso = sessionStorage.getItem("curso");
    var grupo = sessionStorage.getItem("grupoId");
    var source = sessionStorage.getItem("source");
    var project = sessionStorage.getItem("projectId");

    $("#grupo").val(sessionStorage.getItem("curso")+ "." + sessionStorage.getItem("grupo"));

    $("#btnCancelar").on("click",function(){
        window.location.replace("ProyectoEspecifico.html");
    });


    var jsonToSend = {
        "action"    : "LOADALUMNI",
        "grupo"     : sessionStorage.getItem("grupoId")
    }

    $.ajax({
        url: "PHP/applicationLayer.php",
        type: "POST",
        data : jsonToSend,
        dataType: "json",
        async:false,
        contentType: "application/x-www-form-urlencoded",
        success: function(jsonResponse){
            var newHtml = "";
            newHtml += "<table id='alumno'><thead>" + "<tr>" + "<th>" + "Matricula" + "</th>"
            + "<th>" + "Nombre" + "</th>" + "<th>" + "Agregar" + "</th></tr></thead><tbody>";
            for(i = 0; i < jsonResponse.length; i++){
                var mat = jsonResponse[i].studentId;
                var name = jsonResponse[i].name;
                newHtml += "<tr name='"+mat+"'>" + "<td>" + mat + "</td>"
                + "<td>" + name + "</td>"
                + "<td>" 
                + "<input name ='" + mat + "' align='center' class='addBtn btn btn-primary' type='submit' value='Agrega' name/>"  
                + "</td>" + "</tr>";
            }
            newHtml += "</tbody></table>";

            $("#mainBody").append(newHtml);

        },
        error: function(errorMessage){
            $("#mainBody").append("No hay alumnos sin proyecto en este grupo");
        }
    });

    $("#grupo").on("click", function(){
        window.location.replace("Grupo.html");
    });

    $("#mainBody").on("click",".addBtn", function(){
        //debugger;
        var matricula = $(this).attr("name");
        var json2Send = {
            "action"    : "ADDALUMNI",
            "project"   : project,
            "mat"       : matricula
        }

        $.ajax({
            url: "PHP/applicationLayer.php",
            type: "POST",
            data : json2Send,
            dataType: "json",
            async:false,
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonResponse){
                window.location.replace("ProyectoEspecifico.html");
            },
            error: function(errorMessage){
                window.location.replace("ProyectoEspecifico.html");
            }
        });
    });
});