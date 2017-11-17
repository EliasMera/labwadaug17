$(document).ready(function(){
	var jsonToSend = {
        "action" : "SHOWACCOUNT"
    };
    $.ajax({
        url : "PHP/applicationLayer.php",
        type : "POST",
        data : jsonToSend,
        dataType : "json",
        contentType : "application/x-www-form-urlencoded",
        success : function(jsonResponse){

                var row = $('<tr style="display: none;">'); // crear renglon en la tabla
                $("#editAccountTable").append(row); // agregar renglon a la tabla
                row = $("<tr>"); //  crear nuevo renglon
                row.append($("<th>").text("Nombre"));
                row.append( $("<td>").append($('<input id="editName" type="text">').val(jsonResponse[0].name)));
                $("#editAccountTable").append(row); // agregar renglon a la tabla
                row = $("<tr>"); //  crear nuevo renglon
                row.append( $("<th>").text("Carrera"));
                row.append( $('<td>').append($('<input id="editBachelor" type="text">').val(jsonResponse[0].bachelor)));
                $("#editAccountTable").append(row); // agregar renglon a la tabla
                row = $("<tr>"); //  crear nuevo renglon
                row.append( $("<th>").text("Correo Académico"));
                row.append( $('<td>').append($('<input id="editAcEmail" type="text">').val(jsonResponse[0].academicEmail)));
                $("#editAccountTable").append(row); // agregar renglon a la tabla
                row = $("<tr>"); //  crear nuevo renglon
                row.append( $("<th>").text("Correo Personal"));
                row.append( $('<td>').append($('<input id="editPerEmail" type="text">').val(jsonResponse[0].personalEmail)));
	        	$("#editAccountTable").append(row); // agregar renglon a la tabla
                row = $("<tr>"); //  crear nuevo renglon
                row.append( $("<th>").text("Teléfono"));
                row.append( $('<td>').append($('<input id="editPhone" type="text">').val(jsonResponse[0].cellphone)));
                $("#editAccountTable").append(row); // agregar renglon a la tabla
                $("#btnsave").append('<input type="submit" id="buttonLogin" value="Guardar Cambios" class="btn btn-primary">');

        },
        error : function(errorMessage){
            alert(errorMessage.responseText);
        }
    });

    $("#btnsave").on("click",function(){

        if($("#editName").val() != "" && $("#editBachelor").val() != "" && ($("#editAcEmail").val() != "" || $("#editPerEmail").val() != "" ) ){
        var jsonToSend = {
            "action" : "EDITACCOUNT",
            "name" : $("#editName").val(),
            "bachelor" : $("#editBachelor").val(),
            "academicEmail" : $("#editAcEmail").val(),
            "personalEmail" : $("#editPerEmail").val(),
            "phone" : $("#editPhone").val()
        };

        $.ajax({
            url : "PHP/applicationLayer.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonResponse){
                window.location.replace("EditarCuenta.html");
            },
            error : function(errorMessage){
                alert(errorMessage.responseText);
            }
        });

        }
        else{
            alert("Nombre, carrera y al menos un correo no pueden estar vacíos");
        }

    });
});  