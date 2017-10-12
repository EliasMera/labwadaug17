$(document).ready(function(){

  $("#fileUp").change(handleFile);

    $('#projectsBtn').on("click", function() {
        window.location.replace("Proyectos.html");
    });

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