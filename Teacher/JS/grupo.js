$(document).ready(function(){

	function updatePriority(prio, projId){
		//console.log("updating " + projId + " with " + prio);

		var jsonUpdate = {
			"action" : "UPDATEPRIORITY",
			"projId" : projId,
			"prio"	 : prio
		}

		$.ajax({
			url: "PHP/applicationLayer.php",
			type: "POST",
			data : jsonUpdate,
			dataType: "json",
			async : false,
			contentType: "application/x-www-form-urlencoded",
			success: function(jsonResponse){
				//console.log("updated");
			},
			error: function(errorMessage){
			}
		});
	}

	function sortTable(){
	    var tbl = document.getElementById("caltbl").tBodies[0];
	    var store = [];
	    for(var i=0, len=tbl.rows.length; i<len; i++){
	        var row = tbl.rows[i];
	        var sortnr = parseFloat(row.cells[0].textContent || row.cells[0].innerText);
	        if(!isNaN(sortnr)) store.push([sortnr, row]);
	    }
	    store.sort(function(x,y){
	        return x[0] - y[0];
	    });
	    for(var i=0, len=store.length; i<len; i++){
	        tbl.appendChild(store[i][1]);
	    }
	    store = null;
	}
	
	var jsonToSend = {
		"action"	: "LOADPROJECTS",
		"grupo"		: sessionStorage.getItem("grupoId")
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
			var nums = [];
			newHtml += "<table id='caltbl' class='table table-hover'><thead>" + "<tr>" + "<th>" + "Nombre" + "</th>"
			+ "<th>" + "Prioridad" + "</th>" + "<th>" + "Apto" + "</th></tr></thead><tbody>";
			for(i = 0; i < jsonResponse.length; i++){
				var recommended = jsonResponse[i].recomended == 1;
				var opcion1 = (recommended ? "SI" : "NO");
				var opcion2 = (recommended ? "NO" : "SI");
				var projId = jsonResponse[i].id;
				var prioridad = jsonResponse[i].rank;
				if(prioridad == null){
					// busca la primer prioridad disponible
					var contador = 1;
					while(jQuery.inArray(contador, nums) != -1){
						contador++;
					}
					nums.push(contador);
					prioridad = contador;
				}else{
					nums.push(prioridad);
				}
				updatePriority(prioridad, projId);
				newHtml += "<tr name='"+projId+"'>" + "<td class='cellButton'>" + jsonResponse[i].name + "</td>" + "<td class='cellButton'>" + prioridad  + "</td>" + "<td>"
				+ "<select name='" + projId + "' id='apto'>" + "<option value='" + opcion1 + "'>" + opcion1 + "</option>" + "<option value='" + opcion2 + "'>"
				+ opcion2 + "</option>" + "</select>" + "</td>"
				
				+ "<td class='hidden'>" + projId + "</td>" + "</tr>";
			}
			newHtml += "</tbody></table>";

			$("#mainBody").append(newHtml);


			sortTable();
			$("tbody").sortable({
			    update: function( event, ui ) {
			    	// recalcula prioridades
			    	var tbl = document.getElementById("caltbl").tBodies[0];
				    for(var i=0, len=tbl.rows.length; i<len; i++){
				        var row = tbl.rows[i];
				        row.cells[1].innerHTML = (i + 1);
				        var projId = row.getAttribute('name');
				        updatePriority(i + 1, projId);
				    }
			    }
			});

		},
		error: function(errorMessage){
			$("#mainBody").append("There are no projects registered");
		}
	});

	$("select").change(function() {
		var projectId = $('tr:last td:last').text();
		var recommended = $(this).val() === "SI"? 1 : 0;

		var jsonToSend = {
			"action"	: "UPDATERECOMMEND",
			"recommend"	: recommended,
			"projectId"	: projectId
		}
	  	
	  	$.ajax({
			url: "PHP/applicationLayer.php",
			type: "POST",
			data : jsonToSend,
			dataType: "json",
			async : false,
			contentType: "application/x-www-form-urlencoded",
			success: function(jsonResponse){
				console.log("recommended");
			},
			error: function(errorMessage){
			}
		});
	});

	$("#grupoEsp").text(sessionStorage.getItem("curso"));


	$("#mainBody").on("click",'tr', function(){
		//debugger;
		var td = this.cells[3];  // the first <td>
		sessionStorage.setItem('projectId', $(td).text() );
		window.location.replace("ProyectoEspecifico.html");
	});

	$("#agregaAlumno").on("click", function(){
		sessionStorage.setItem('source', "GRUPO");
		window.location.replace("RegistroAlumnos.html");
    });

});