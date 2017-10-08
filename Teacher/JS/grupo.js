$(document).ready(function(){
	$("#groupBtn").val(sessionStorage.getItem("curso")+ "." + sessionStorage.getItem("grupo"));

	$("#registerStu").on("click", function(){
		window.location.replace("RegistroAlumnos.html")
		

		

	});



})