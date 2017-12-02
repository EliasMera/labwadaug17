$(document).ready(function() {

    getClassifications();

    $("#registerBtn").on("click",function(){
        var nombre = $("#nombreProyecto").val();
        var empresa = $("#nombreEmpresa").val();
        var descripcion = $("#descripcion").val();
        var clasificacion = $("#clasificacion").val();
        var giro = $("#giro").val();
        var integrantes = $("#numIntegrantes").val();
        var nombreIntegrante1 = $("#nombreIntegrante1").val();
        var matricula1 = $("#matricula1").val();
        var carrera1 = $("#carrera1").val();
        var semestre1 = $("#semestre1").val();
        var emailAcademico1 = $("#emailAcademico1").val();
        var emailPersonal1 = $("#emailPersonal1").val();
        var celular1 = $("#celular1").val();
        var nombreIntegrante2 = $("#nombreIntegrante2").val();
        var matricula2 = $("#matricula2").val();
        var carrera2 = $("#carrera2").val();
        var semestre2 = $("#semestre2").val();
        var emailAcademico2 = $("#emailAcademico2").val();
        var emailPersonal2 = $("#emailPersonal2").val();
        var celular2 = $("#celular2").val();
        var nombreIntegrante3 = $("#nombreIntegrante3").val();
        var matricula3 = $("#matricula3").val();
        var carrera3 = $("#carrera3").val();
        var semestre3 = $("#semestre3").val();
        var emailAcademico3 = $("#emailAcademico3").val();
        var emailPersonal3 = $("#emailPersonal3").val();
        var celular3 = $("#celular3").val();
        var nombreIntegrante4 = $("#nombreIntegrante4").val();
        var matricula4 = $("#matricula4").val();
        var carrera4 = $("#carrera4").val();
        var semestre4 = $("#semestre4").val();
        var emailAcademico4 = $("#emailAcademico4").val();
        var emailPersonal4 = $("#emailPersonal4").val();
        var celular4 = $("#celular4").val();
        var nombreIntegrante5 = $("#nombreIntegrante5").val();
        var matricula5 = $("#matricula5").val();
        var carrera5 = $("#carrera5").val();
        var semestre5 = $("#semestre5").val();
        var emailAcademico5 = $("#emailAcademico5").val();
        var emailPersonal5 = $("#emailPersonal5").val();
        var celular5 = $("#celular5").val();
        var nombreIntegrante6 = $("#nombreIntegrante6").val();
        var matricula6 = $("#matricula6").val();
        var carrera6 = $("#carrera6").val();
        var semestre6 = $("#semestre6").val();
        var emailAcademico6 = $("#emailAcademico6").val();
        var emailPersonal6 = $("#emailPersonal6").val();
        var celular6 = $("#celular6").val();
        var nombreIntegrante7 = $("#nombreIntegrante7").val();
        var matricula7 = $("#matricula7").val();
        var carrera7 = $("#carrera7").val();
        var semestre7 = $("#semestre7").val();
        var emailAcademico7 = $("#emailAcademico7").val();
        var emailPersonal7 = $("#emailPersonal7").val();
        var celular7 = $("#celular7").val();
        var cont = 0;
        if (nombre == "" || empresa == "" || clasificacion == "0" || integrantes == "" || descripcion == ""){
            alert("Debes llenar todos los campos.");
        }
        else{
            var nombreA = [];
            var matriculaA = [];
            var carreraA = [];
            var emailAcademicoA = [];
            var emailPersonalA = [];
            var celularA = [];
            if (nombreIntegrante1 != "" && matricula1 != "" && carrera1 != "" && semestre1 != "" 
                && emailAcademico1 != "" && emailPersonal1 != "" && celular1 != ""){
                cont += 1;
                nombreA.push(nombreIntegrante1);
                matriculaA.push(matricula1);
                carreraA.push(carrera1);
                emailAcademicoA.push(emailAcademico1);
                emailPersonalA.push(emailPersonal1);
                celularA.push(celular1);
            }
            if (nombreIntegrante2 != "" && matricula2 != "" && carrera2 != "" && semestre2 != "" 
                && emailAcademico2 != "" && emailPersonal2 != "" && celular2 != ""){
                cont += 1;
                nombreA.push(nombreIntegrante2);
                matriculaA.push(matricula2);
                carreraA.push(carrera2);
                emailAcademicoA.push(emailAcademico2);
                emailPersonalA.push(emailPersonal2);
                celularA.push(celular2);
            }
            if (nombreIntegrante3 != "" && matricula3 != "" && carrera3 != "" && semestre3 != "" 
                && emailAcademico3 != "" && emailPersonal3 != "" && celular3 != ""){
                cont += 1;
                nombreA.push(nombreIntegrante3);
                matriculaA.push(matricula3);
                carreraA.push(carrera3);
                emailAcademicoA.push(emailAcademico3);
                emailPersonalA.push(emailPersonal3);
                celularA.push(celular3);
            }
            if (nombreIntegrante4 != "" && matricula4 != "" && carrera4 != "" && semestre4 != "" 
                && emailAcademico4 != "" && emailPersonal4 != "" && celular4 != ""){
                cont += 1;
                nombreA.push(nombreIntegrante4);
                matriculaA.push(matricula4);
                carreraA.push(carrera4);
                emailAcademicoA.push(emailAcademico4);
                emailPersonalA.push(emailPersonal4);
                celularA.push(celular4);
            }
            if (nombreIntegrante5 != "" && matricula5 != "" && carrera5 != "" && semestre5 != "" 
                && emailAcademico5 != "" && emailPersonal5 != "" && celular5 != ""){
                cont += 1;
                nombreA.push(nombreIntegrante5);
                matriculaA.push(matricula5);
                carreraA.push(carrera5);
                emailAcademicoA.push(emailAcademico5);
                emailPersonalA.push(emailPersonal5);
                celularA.push(celular5);
            }
            if (nombreIntegrante6 != "" && matricula6 != "" && carrera6 != "" && semestre6 != "" 
                && emailAcademico6 != "" && emailPersonal6 != "" && celular6 != ""){
                cont += 1;
                nombreA.push(nombreIntegrante6);
                matriculaA.push(matricula6);
                carreraA.push(carrera6);
                emailAcademicoA.push(emailAcademico6);
                emailPersonalA.push(emailPersonal6);
                celularA.push(celular6);
            }
            if (nombreIntegrante7 != "" && matricula7 != "" && carrera7 != "" && semestre7 != "" 
                && emailAcademico7 != "" && emailPersonal7 != "" && celular7 != ""){
                cont += 1;
                nombreA.push(nombreIntegrante7);
                matriculaA.push(matricula7);
                carreraA.push(carrera7);
                emailAcademicoA.push(emailAcademico7);
                emailPersonalA.push(emailPersonal7);
                celularA.push(celular7);
            }
            if (cont != integrantes && integrantes > 0){
                alert("Registraste " + cont + " integrantes, pero debiste registrar " + integrantes);
            }
            else{
                var jsonToSend = {
                    "action" : "REGISTERPROJECT",
                    "nombre" : nombre,
                    "empresa" : empresa,
                    "descripcion" : descripcion,
                    "giro" : giro,
                    "clasificacion" : clasificacion,
                    "integrantes" : integrantes,
                    "nombreArr" : nombreA,
                    "matriculaArr" : matriculaA,
                    "carreraArr" : carreraA,
                    "emailAcademicoArr" : emailAcademicoA,
                    "emailPersonalArr" : emailPersonalA,
                    "celularArr" : celularA
                }
                $.ajax({
                    url : "PHP/applicationLayer.php",
                    type : "POST",
                    data : jsonToSend,
                    dataType : "json",
                    contentType : "application/x-www-form-urlencoded",
                    success : function(jsonResponse){
                        alert("registro con éxito");
                        window.location.replace("base.html");
                    },
                    error : function(errorMessage){
                        alert(errorMessage.responseText);
                    }
                });
            }
        }
    });
});

function getClassifications() {
    var jsonToSend = {
        "action" : "GETCLASSIFICATIONS"
    }
    $.ajax({
        url : "PHP/applicationLayer.php",
        type : "POST",
        data : jsonToSend,
        dataType : "json",
        contentType : "application/x-www-form-urlencoded",
        success : function(jsonResponse){
            for (var i = 0; i <= jsonResponse[0].length; i++) {
                $(jsonResponse[0][i]).each(function() {
                    var option = $("<option>");
                    option.attr("value", jsonResponse[0][i].name); 
                    option.text(jsonResponse[0][i].name);
                    $("#clasificacion").append(option); 
                });
            }
        },
        error : function(errorMessage){
            alert(errorMessage.responseText);
        }
    });
}