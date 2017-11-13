<!DOCTYPE html>
<html>
<head>
  <title>Muestra Empresarial</title>
  <meta charset="UTF-8">
   <link href="CSS/style.css" rel="stylesheet" type="text/css">
  <script type="text/javascript" src="JQ/jquery.js"></script>
  <script type="text/javascript" src="JQ/jqHome.js"></script>
  <script type="text/javascript" src="JQ/jqUpload.js"></script>

</head>
<body>
<h1>Muestra Empresarial</h1>
<ul id="tabBar">
	<li><input id="homeBtn" type="submit" value="Inicio"> </li>
	<li><input id="historialBtn" type="submit" value="Historial de Proyectos"> </li>
	<li><input id="regisBtn" type="submit" value="Registrar Proyecto" style="display: none;"> </li>
	<li><input id="editProj" type="submit" value="Editar Proyecto" style="display: none;"> </li>
	<li><input id="changePassw" type="submit" value="Cambiar Contraseña"> </li>
	<li><input id="uploadFiles" type="submit" value="Subir Archivos"></li>
	<li><input id="myInfo" type="submit" value="Mi información"></li>
	<li><input id="logoutBtn" type="submit" value="Cerrar Sesión"> </li>

</ul>
<div id="mainBody">
	<form name="form1" method="post" action="" enctype="multipart/form-data"/>
	<br>
		<div id="mainBody2">


		</div>
	</form>
</div>
</body>

<?php

$conn = new mysqli('localhost','root','root','entrepreneurship');

if(isset($_POST["submitBtn1"]))
{
	$fnm = $_FILES["subearchivo1"]["name"];
	$dst = "Archivos/".$fnm;
	move_uploaded_file($_FILES["subearchivo1"]["tmp_name"], $dst);

	if($conn != null)
	{

		session_start();
		$idproject = $_SESSION['projectId'];
		$sql = "INSERT INTO Files(filePath,project_id,requirement) values ('$dst','$idproject',1)";
		$conn -> query($sql);
	}

	else{
		echo "No hay conexion";
	}
}
elseif(isset($_POST["submitBtn2"])){
		
	$fnm = $_FILES["subearchivo2"]["name"];
	$dst = "Archivos/".$fnm;
	move_uploaded_file($_FILES["subearchivo2"]["tmp_name"], $dst);

	if($conn != null)
	{

		session_start();
		$idproject = $_SESSION['projectId'];
		$sql = "INSERT INTO Files(filePath,project_id,requirement) values ('$dst','$idproject',2)";
		$conn -> query($sql);
	}

	else{
		echo "No hay conexion";
	}

}
elseif(isset($_POST["submitBtn3"])){
		
	$fnm = $_FILES["subearchivo3"]["name"];
	$dst = "Archivos/".$fnm;
	move_uploaded_file($_FILES["subearchivo3"]["tmp_name"], $dst);

	if($conn != null)
	{

		session_start();
		$idproject = $_SESSION['projectId'];
		$sql = "INSERT INTO Files(filePath,project_id,requirement) values ('$dst','$idproject',3)";
		$conn -> query($sql);
	}

	else{
		echo "No hay conexion";
	}

}
elseif(isset($_POST["submitBtn4"])){
		
	$fnm = $_FILES["subearchivo4"]["name"];
	$dst = "Archivos/".$fnm;
	move_uploaded_file($_FILES["subearchivo4"]["tmp_name"], $dst);

	if($conn != null)
	{

		session_start();
		$idproject = $_SESSION['projectId'];
		$sql = "INSERT INTO Files(filePath,project_id,requirement) values ('$dst','$idproject',4)";
		$conn -> query($sql);
	}

	else{
		echo "No hay conexion";
	}

}


?>

</html>
