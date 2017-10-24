$(document).ready(function(){

    $("#fileUp").change(handleFile);

    $('#projectsBtn').on("click", function() {
        window.location.replace("Proyectos.html");
    });

    $('#changePassw').on("click", function() {
        window.location.replace("CambiarContrasena.html");
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

});

function handleFile(e) {
     //Get the files from Upload control
     var files = e.target.files;
     // var to store data
     var jsonToLoadDB = new Array();
     
     //Loop through files
     var i, f;
     for (i = 0, f = files[i]; i != files.length; ++i) {
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function (e) {
            var data = e.target.result;

            
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
                    alert("success");
                },
                error : function(errorMessage){
                    alert(errorMessage.responseText);
                }
            });
           };
           reader.readAsArrayBuffer(f);
           // build json to send
       
       }

                       
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