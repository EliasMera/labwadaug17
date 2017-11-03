<!DOCTYPE html>
<html>
<head>
  <title>Muestra Empresarial</title>
  <meta charset="UTF-8">
   <link href="CSS/style.css" rel="stylesheet" type="text/css">
  <script type="text/javascript" src="JQ/jquery.js"></script>
  <script type="text/javascript" src="JQ/jqHome.js"></script>

</head>
<body>
<h1>Muestra Empresarial</h1>
<ul id="tabBar">
	<li><input id="homeBtn" type="submit" value="Inicio"> </li>
	<li><input id="historialBtn" type="submit" value="Historial de Proyectos"> </li>
	<li><input id="regisBtn" type="submit" value="Registrar Proyecto" style="display: none;"> </li>
	<li><input id="editProj" type="submit" value="Editar Proyecto" style="display: none;"> </li>
	<li><input id="changePassw" type="submit" value="Cambiar Contraseña"> </li>
	<li><input id="uploadFiles" type="submit" value="Subir Archivos"> </li>
	<li><input id="logoutBtn" type="submit" value="Cerrar Sesión"> </li>

</ul>
<div id="mainBody">
	<br>
	<form name="form1" method="post" action="" enctype="multipart/form-data"/>
	<span><input id="file" type="file" name="subearchivo"><font color="red"> *  </font></span>
	<br>
	<span>Nombre del archivo <input id="name" type="text" name="n"> <font color="red"> *  </font></span>
	<br>
	<font color="red"> * Campos obligatorios  </font>
	<br>
	<input id="uploadBtn" name="submitBtn" type="submit" value="Subir Archivo">
	</form>
</div>
</body>

<?php

$filename = $_POST['n'];
$conn = new mysqli('localhost','root','root','entrepreneurship');

if(isset($_POST["submitBtn"]))
{
	$fnm = $_FILES["subearchivo"]["name"];
	$dst = "Archivos/".$fnm;
	move_uploaded_file($_FILES["subearchivo"]["tmp_name"], $dst);

	if($conn != null)
	{

		session_start();
		$idproject = $_SESSION['projectId'];
		$sql = "INSERT INTO Files(filePath,project_id) values ('$dst','$idproject')";
		$conn -> query($sql);
	}

	else{
		echo "No hay conexion";
	}


}

?>

</html>
