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
    getRequiredFiles();

    // Guardar checkboxes de archivos requisito
    $("#saveRequirements").on("click", function() {
        var arrChecked = []; // arreglo con ids de requisitos 'checked'
        $("#requiredFiles tr").each(function(item) {
            if ($(this).find('input[type="checkbox"]').is(':checked')) {
                arrChecked.push($(this).find('td:eq(0)').text());
            }
        });
        // ajax call para guardar info
        var jsonToSend = {
            "action" : "SAVEREQUIREDFILES",
            "data" : arrChecked
        }
        $.ajax({
            url : "../PHP/applicationLayer.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonResponse){
                $("#successAlert2").show();
            },
            error : function(errorMessage){
                alert(errorMessage.responseText);
            }
        });
    });

    // Guardar nueva clasificacion sectorial
    $("#save").on("click", function() {
        var name = $("#newClassification").val().toUpperCase();
        
        var jsonToSend = {
            "action" : "NEWCLASSIFICATION",
            "data" : name
        }
        $.ajax({
            url : "../PHP/applicationLayer.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonResponse){
                window.location.reload();
            },
            error : function(errorMessage){
                alert(errorMessage.responseText);
            }
        });
    });

    // borrar clasificación sectorial
    $('body').delegate("#deleteClassification", "click", function() {
        var id = $(this).parent().parent().find('td:eq(0)').text();
        var text = $(this).parent().parent().find('td:eq(1)').text();
        $("#myModal .modal-body p strong").text(text);
        $("#myModal .modal-body p sub").text(id);
        $("#myModal .modal-body p sub").hide();
    });
    $("#confirmDelete").on("click", function() {
        var id = $("#myModal .modal-body p sub").text();
        var jsonToSend = {
            "action" : "DELETECLASSIFICATION",
            "id" : id
        }
        $.ajax({
            url : "../PHP/applicationLayer.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonResponse){
                window.location.reload();
            },
            error : function(errorMessage){
                alert(errorMessage.responseText);
            }
        });
    });

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

    $('#successAlertClose2').on("click", function() {
        $('#successAlert2').hide();
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
                    row.append( $('<td>').append($('<a id="deleteClassification" class="btn btn-danger" data-toggle="modal" data-target="#myModal"><i class="fa fa-trash-o fa-lg"></i></a>')));
                    $("#classifications").append(row); 
                });
            }
        },
        error : function(errorMessage){
            alert(errorMessage.responseText);
        }
    });
}

function getRequiredFiles() {
    var jsonToSend = {
        "action" : "GETREQUIREDFILES"
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
                    var check = $('<input type="checkbox">');
                    if (jsonResponse[0][i].active == 1)
                        check.attr("checked", true); 
                    row.append( $('<td>').append(check));
                    $("#requiredFiles").append(row); 
                });
            }
        },
        error : function(errorMessage){
            alert(errorMessage.responseText);
        }
    });
}