$(document).ready(function(){

    //$("#fileUp").change(handleFile);

    $('#sendFile').on("click", function() {
        if ($("#fileUp").get(0).files.length === 0){
            $('#noFileAlert').show();
        }
        else {
            //type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            handleFile($("#fileUp").get(0).files);
        }
    });

    $('#projectsBtn').on("click", function() {
        window.location.replace("Proyectos.html");
    });

    $('#changePassw').on("click", function() {
        window.location.replace("CambiarContrasena.html");
    });

    $('#participantsBtn').on("click", function() {
        window.location.replace("Participantes.html");
    });

    $('#logoutBtn').on("click", function() {
        var jsonToSend = {
            "action" : "LOGOUT"
        }
        $.ajax({
            url : "../PHP/applicationLayer.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonResponse){
                window.location.replace("LoginAdmin.html");
            },
            error : function(errorMessage){
                alert(errorMessage.responseText);
            }
        });
    });

    getClassifications();

    // ---- Cerrar alertas ----

    $('#fileErrorAlertClose').on("click", function() {
        $('#fileErrorAlert').hide();
    });

    $('#noFileAlertClose').on("click", function() {
        $('#noFileAlert').hide();
    });

    $('#successAlertClose').on("click", function() {
        $('#successAlert').hide();
    });

});

function handleFile(files) {
     //Get the files from Upload control
     //var files = e.target.files;
     // var to store data
     var jsonToLoadDB = new Array();
     
     //Loop through files
     var i, f;
     i = 0;
    f = files[i];
        var reader = new FileReader();
        var name = f.name;
        
        // leer el archivo
        reader.readAsArrayBuffer(f);

        reader.onload = function (e) {
            var data = e.target.result;

            try {
            
            var workbook = XLSX.read(data, { type: 'binary' });

            var sheet_name_list = workbook.SheetNames;
            jsonToLoadDB.push(sheet_name_list);
            sheet_name_list.forEach(function (y) { /* iterate through sheets */
                    
                    //Convert the cell value to Json
                    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                    if (roa.length > 0) {
                        jsonToLoadDB.push(roa);
                    }
                });
            // build json to send
            var jsonToSend = {
                "action" : "POPULATETEACHERSGROUPS",
                "data" : jsonToLoadDB
           };

           // ajax call
           $.ajax({
                url : "../PHP/applicationLayer.php",
                type : "POST",
                data : jsonToSend,
                dataType : "json",
                contentType : "application/x-www-form-urlencoded",
                success : function(jsonResponse){
                    $("#successAlert").show();
                },
                error : function(errorMessage){
                    alert(errorMessage.responseText);
                }
            });
        }
        catch(error)
        {
            $("#fileErrorAlert").show();
        }

        };
           
       

                       
   }

function getClassifications() {
    var jsonToSend = {
        "action" : "GETCLASSIFICATIONS"
    }
    $.ajax({
        url : "../PHP/applicationLayer.php",
        type : "POST",
        data : jsonToSend,
        dataType : "json",
        contentType : "application/x-www-form-urlencoded",
        success : function(jsonResponse){
            for (var i = 0; i <= jsonResponse[0].length; i++) {
                $(jsonResponse[0][i]).each(function() {
                    var row = $("<tr>");
                    row.append( $('<td style="display: none;">').text(jsonResponse[0][i].id)); 
                    row.append( $('<td>').text(jsonResponse[0][i].name));
                    row.append( $('<td>').append($('<input id="deleteClassification" type="button" data-toggle="modal" data-target="#myModal" value="Eliminar"/>')));
                    $("#classifications").append(row); 
                });
            }
        },
        error : function(errorMessage){
            alert(errorMessage.responseText);
        }
    });
}