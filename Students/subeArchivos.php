<!DOCTYPE html>
<html>
<head>
  <title>Muestra Empresarial</title>
  <meta charset="UTF-8">
  <link href="../Resources/css/style.css" rel="stylesheet" type="text/css">
  <script type="text/javascript" src="JQ/jquery.js"></script>
  <script type="text/javascript" src="JQ/jqHome.js"></script>
  <script type="text/javascript" src="JQ/jqUpload.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>

</head>
<body>

<nav class="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
  <div class="container">
    <a class="navbar-brand" href="#">Muestra Empresarial</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="base.html">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="HistorialProyectos.html">Historial Proyectos</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="RegistrarProyecto.html" style="display:none;" id="regisBtn">Registrar Proyecto</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="EditarProyecto.html" style="display:none;" id="editProj">Ver Proyecto</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#">Subir Archivos </a>
        </li>
        <li class="nav-item dropdown my-2 my-sm-0">
          <a class="nav-link dropdown-toggle" href="" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Mi Cuenta</a>
          <div class="dropdown-menu" aria-labelledby="dropdown01">
          	<a class="dropdown-item" href="EditarCuenta.html">Mi información</a>
            <a class="dropdown-item" href="changePassw.html">Cambiar contraseña</a>
            <a id="logoutBtn" class="dropdown-item" href="#">Cerrar sesión</a>
          </div>
        </li>
      </ul> 
    </div>
  </div> 
</nav>

<main role="main" class="container">


<div id="mainBody">
	<form name="form1" method="post" action="" enctype="multipart/form-data"/>
	<br>
		<div id="mainBody2">


		</div>
	</form>
</div>

</main>

    <footer>
      <p>
        
      </p>
    </footer>


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
