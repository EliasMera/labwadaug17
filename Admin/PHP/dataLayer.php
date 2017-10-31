<?php

function connectionToDataBase(){
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "entrepreneurship";

	$conn = new mysqli($servername, $username, $password, $dbname);
	
	
	if ($conn->connect_error){
		return null;
	}
	else{
		return $conn;
	}
}

function attemptPopulateTeachersGroups($dataArr) {

	$conn = connectionToDataBase();

	if ($conn != null){

		$i = 0;
		$error = false;
		
		// Por cada curso
		for ($iCourses = 0; $iCourses < count($dataArr); $iCourses++) {
			// Por cada grupo
			for ($iGroup = 0; $iGroup < count($dataArr[$iCourses][0]); $iGroup++) {
				$name = $dataArr[$iCourses][1][$iGroup];
				$nomina = $dataArr[$iCourses][0][$iGroup];
				$passwrd = $dataArr[$iCourses][2][$iGroup];
				$sql = "INSERT IGNORE INTO Teachers (teacherId, name, passwrd) VALUES ('$nomina', '$name', '$passwrd')";

				if (mysqli_query($conn, $sql) == false){
					$conn -> close();
					return array("status" => "BAD INSERT Teachers");
				}
				else {
					$sql = "SELECT id FROM Teachers WHERE teacherId = '$nomina'";
					$result = $conn->query($sql);
					if ($result->num_rows == 1) {
						$row = $result->fetch_assoc();
						$id = $row['id'];
						//7echo $id;
						//echo " ";
						$groupNumber = $dataArr[$iCourses][3][$iGroup];
						$courseKey = $dataArr[$iCourses]['course'];

						$sql = "INSERT INTO Groups (groupNumber, courseKey, teacher_id) VALUES ('$groupNumber', '$courseKey', '$id')";
						if (mysqli_query($conn, $sql) == false){
							$conn -> close();
							return array("status" => "BAD INSERT Groups");
						}
					}
					
				}
						
			}
		}
			
		$conn -> close();
		return array("status" => "SUCCESS");
	}
	else {
		$conn -> close();
		return array("status" => "CONNECTION WITH DB WENT WRONG");
	}
}

function attemptRegister($encPasswd) {
	$conn = connectionToDataBase();

	if ($conn != null) {
		$sql = "INSERT INTO Administrador (adminId, name, passwrd, email) VALUES ('admin', 'Edgar Williams Garcia Sosa', '$encPasswd', 'ewilliams@itesm.mx')";
		if (mysqli_query($conn, $sql)) {
			$conn -> close();
    		return array("status" => "SUCCESS");
		}
		else {
			$conn -> close();
			return array("status" => "BAD INSERT");
		}
	}
	else {
		$conn -> close();
		return array("status" => "CONNECTION WITH DB WENT WRONG");
	}

}

function attemptLogin($userId) {
	$conn = connectionToDataBase();

	if ($conn != null) {
		$sql = "SELECT * FROM Administrador WHERE adminId = '$userId'";
		$result = $conn->query($sql);
		if ($result->num_rows == 1) {
			$row = $result->fetch_assoc();
			session_start();
			session_destroy();
			session_start();
			$_SESSION["userId"] = $row["adminId"];
			$_SESSION["name"] = $row["name"];
			$conn -> close();
			return array("status" => "SUCCESS",	"passwrd" => $row["passwrd"]);
		}
		else {
			$conn -> close();
			return array("status" => "NOT FOUND");
		}
	}
	else {
		$conn -> close();
		return array("status" => "CONNECTION WITH DB WENT WRONG");
	}
}

function attemptGetAllProjects() {
	$conn = connectionToDataBase();

	if ($conn != null) {
		$sql = "SELECT DISTINCT p.*, g.courseKey, g.groupNumber, r.name AS 'profesor' FROM projects p, groups g, students a, teachers r WHERE p.active = 1 AND g.id = a.group_id AND p.id = a.project_id AND r.id = g.teacher_id ORDER BY 'profesor'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			$response = array("status" => "SUCCESS");
			$resp = array();
			while ($row = $result->fetch_assoc()) {
				$project = array('name' => utf8_encode($row['name']), 'company' => utf8_encode($row['company']), 'description' => utf8_encode($row['description']), 'id' => $row['id'], 
		    		'classification' => utf8_encode($row['classification']), 'business' => utf8_encode($row['business']), 'courseKey' => $row['courseKey'], 'groupNumber' => $row['groupNumber'], 'teacher' => utf8_encode($row['profesor']), 'recomended' => $row['recomended'], 'rank' => $row['rank']);
		    	array_push($resp, $project);
			}
			array_push($response, $resp);
			$conn -> close();
		    return $response;
		}
		else {
			$conn -> close();
			return array("status" => "NOT FOUND");
		}
	}
	else {
		$conn -> close();
		return array("status" => "CONNECTION WITH DB WENT WRONG");
	}
}

function attemptViewProjectDetails($id) {
	$conn = connectionToDataBase();

	if ($conn != null) {
		$sql = "SELECT p.*, s.studentId, s.name as 'studentname' FROM projects p JOIN students s ON p.id = s.project_id WHERE p.id = '$id'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			$response = array("status" => "SUCCESS");
			$resp = array();
			$studentArr = array();
			$firstFlag = 0;
			while ($row = $result->fetch_assoc()) {
				if ($firstFlag == 0) {
					$project = array('name' => utf8_encode($row['name']), 'company' => utf8_encode($row['company']), 'description' => utf8_encode($row['description']), 'id' => $row['id'], 
		    		'classification' => utf8_encode($row['classification']), 'business' => utf8_encode($row['business']), 'courseKey' => $row['courseKey'], 'groupNumber' => $row['groupNumber'], 'recomended' => $row['recomended'], 'rank' => $row['rank']);
		    		array_push($resp, $project);
		    		$firstFlag = 1;
				}
				
		    	$student = array('studentId' => $row['studentId'], 'name' => utf8_encode($row['studentname']));
		    	array_push($studentArr, $student);
			}
			array_push($resp, $studentArr);
			array_push($response, $resp);
			$conn -> close();
		    return $response;
		}
	}
	else {
		$conn -> close();
		return array("status" => "CONNECTION WITH DB WENT WRONG");
	}
}

function attemptSelectParticipantProjects() {
	$conn = connectionToDataBase();

	if ($conn != null) {
		$sql = "SELECT DISTINCT p.id, p.recomended, t.id AS teacher, p.rank FROM Projects p, Groups g, Students s, Teachers t 
		WHERE g.id = s.group_id AND p.id = s.project_id AND t.id = g.teacher_id ORDER BY teacher, rank";

		$result = $conn->query($sql);

		if ($result->num_rows > 0)
		{
			$resp = array();
			$response = array("status" => "SUCCESS");
			// output data of each row
		    while($row = $result->fetch_assoc()) 
		    {
		    	$aux = array('project' => $row['id'], 'recomended' => $row['recomended'], 'rank' => $row['rank'],
		    	'teacher' => $row['teacher']);

		    	array_push($resp, $aux);     
			}
			// en resp estan todos los proyectos

			$cantProyectosXMaestro = array();
			$cantidad = 1;

			for ($i = 1; $i < count($resp); $i++) {
				if ($resp[$i]['teacher'] != $resp[$i-1]['teacher']) {
					array_push($cantProyectosXMaestro, $cantidad);
					$cantidad = 1;
				}
				else {
					$cantidad++;
				}
			}
			array_push($cantProyectosXMaestro, $cantidad); // llenar último maestro

			$k = 0; // iterador global de proyectos en resp
			$seleccionados = array();

			// por cada maestro
			for ($i = 0; $i < count($cantProyectosXMaestro); $i++) {

				// limite de proyectos que puede seleccionar el maestro actual
				$lim = round(($cantProyectosXMaestro[$i] / 2), 0, PHP_ROUND_HALF_UP);

				$cantidad = 0; // cantidad de proyectos seleccionados del maestro actual

				// por cada proyecto del maestro actual
				for ($j = $k; $j < $cantProyectosXMaestro[$i] + $k; $j++) {
					// si no se ha seleccionado la cantidad limite Y el proyecto fue recomendado
					if ($cantidad < $lim && $resp[$j]['recomended'] == 1) {
						// meter proyecto a arreglo de seleccionados
						array_push($seleccionados, $resp[$j]['project']);
						$cantidad++;
					}
				}
				$k = $cantProyectosXMaestro[$i];
			}
			// en este punto $seleccionados tiene los ids de los proyectos seleccionados

			if (count($seleccionados) > 0) {
				// hacer update a la DB
				$sql = "UPDATE Projects SET participant = 1 WHERE id IN(".implode(',',$seleccionados).")";

				if (mysqli_query($conn, $sql)) {
					$conn -> close();
			    	return array("status" => "SUCCESS");
				}
				else {
					$conn -> close();
					return array("status" => "CANNOT UPDATE");
				}
				// array_push($response, $seleccionados);
				// $conn -> close();
			 	//    return $response;
			}
			else {
				$conn -> close();
				return array("status" => "NO HAY PROYECTOS RECOMENDADOS");
			}
			
		}
		else
		{
	    	$conn -> close();
			return array("status" => "NO MATCHES FOUND");
		}
	}
	else{
		$conn -> close();
		return array("status" => "CONNECTION WITH DB WENT WRONG");
	}
}

function attemptGetProjectClassifications() {
	$conn = connectionToDataBase();

	if ($conn != null) {
		$sql = "SELECT * FROM project_classifications";
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			// response json
			$response = array("status" => "SUCCESS");
			// query items
			$resp = array();
			while ($row = $result->fetch_assoc()) {
				$project = array('id' => $row['id'], 'name' => utf8_encode($row['val']));
		    	array_push($resp, $project);
			}
			array_push($response, $resp);
			$conn -> close();
		    return $response;
		}
		else {
			$conn -> close();
			return array("status" => "NOT FOUND");
		}
	}
	else {
		$conn -> close();
		return array("status" => "CONNECTION WITH DB WENT WRONG");
	}
}

function attemptChangePassword($encPasswd) {
	$conn = connectionToDataBase();

	if ($conn != null) {
		$user = $_SESSION["userId"];
		$sql = "UPDATE Administrador SET passwrd = '$encPasswd' WHERE adminId = '$user'";

		if (mysqli_query($conn, $sql)) 
    	{
		    $conn -> close();
		    return array("status" => "SUCCESS");
		} 
		else 
		{
			$conn -> close();
			return array("status" => "CANNOT UPDATE");
		}
	}
	else {
		$conn -> close();
		return array("status" => "CONNECTION WITH DB WENT WRONG");
	}
}

?>