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

function registerTeacher($teacherId, $userPassword, $name){
	$conn = connectionToDataBase();
	$sql = "SELECT teacherId FROM Teachers WHERE teacherId = '$teacherId'";
	$result = $conn->query($sql);

	if($result->num_rows > 0){
		$conn -> close();
		return array("status" => "NAMEINUSE");
	}
	else{
		$sql = "INSERT INTO Teachers (teacherId, name, passwrd) VALUES ('$teacherId', '$name', '$userPassword')";

		if (mysqli_query($conn, $sql)) {
			$conn -> close();
			session_start();
			session_destroy();
			session_start();
			$row = $result->fetch_assoc();

			$_SESSION["teacherId"] = $teacherId;
			$_SESSION["name"] = $name;
			return array("status" => "SUCCESS");
		} 
		else {
			$conn -> close();
			return array("status" => "BADCONN");
		}

	}

}

function registerAlumB($mat, $userPassword, $grupo, $nom, $carr, $acamail, $permail, $cell){
	$conn = connectionToDataBase();
	$sql = "SELECT studentId FROM Students WHERE studentId = '$mat'";
	$result = $conn->query($sql);

	if($result->num_rows > 0){
		$conn -> close();
		return array("status" => "NAMEINUSE");
	}
	else{
		$sql = "INSERT INTO Students (studentId, group_id, passwrd, name, bachelor, academicEmail, personalEmail, cellphone) VALUES ('$mat', '$grupo', '$userPassword', '$nom', '$carr', '$acamail', '$permail', '$cell')";
		if(mysqli_query($conn, $sql)){
			return array("status" => "SUCCESS");
		}
	}
}

function registerAlum($mat, $userPassword, $grupo, $project, $nom, $carr, $acamail, $permail, $cell){
	$conn = connectionToDataBase();
	$sql = "SELECT studentId FROM Students WHERE studentId = '$mat'";
	$result = $conn->query($sql);

	if($result->num_rows > 0){
		$conn -> close();
		return array("status" => "NAMEINUSE");
	}
	else{
		$sql = "INSERT INTO Students (studentId, group_id, passwrd, project_id, name, bachelor, academicEmail, personalEmail, cellphone) VALUES ('$mat', '$grupo', '$userPassword', '$project', '$nom', '$carr', '$acamail', '$permail', '$cell')";
		if(mysqli_query($conn, $sql)){
			return array("status" => "SUCCESS");
		}
	}
}

function updatePriority($project, $prio){
	$conn = connectionToDataBase();
	if ($conn != null){
		$sql = "UPDATE Projects SET rank = '$prio' WHERE id = '$project'";

		if ($conn->query($sql) === TRUE) {
			return array("status" => "SUCCESS");
		    echo "Record updated successfully";
		} else {
		    echo "Error updating record: " . $conn->error;
		}
	}else{
		$conn -> close();
		return array("status" => "Conexion fallida con base de datos");
	}
}

function updateRecommend($project, $recommend){
	$conn = connectionToDataBase();
	if ($conn != null){
		$sql = "UPDATE Projects SET recomended = '$recommend' WHERE id = '$project'";

		if ($conn->query($sql) === TRUE) {
			return array("status" => "SUCCESS");
		    echo "Record updated successfully";
		} else {
		    echo "Error updating record: " . $conn->error;
		}
	}else{
		$conn -> close();
		return array("status" => "Conexion fallida con base de datos");
	}
}

function editAlumni($mat, $grupo, $project, $nom, $carr, $acamail, $permail, $cell){
	$conn = connectionToDataBase();
	if ($conn != null){
		$sql = "UPDATE Students SET name = '$nom', bachelor = '$carr', academicEmail = '$acamail', personalEmail = '$permail', cellphone = '$cell' WHERE studentId = '$mat'";

		if ($conn->query($sql) === TRUE) {
			return array("status" => "SUCCESS");
		    echo "Record updated successfully";
		} else {
		    echo "Error updating record: " . $conn->error;
		}
	}else{
		$conn -> close();
		return array("status" => "Conexion fallida con base de datos");
	}
}


function loginTeacher($teacherId, $save){

	$conn = connectionToDataBase();

	if ($conn != null){
		
		$sql = "SELECT * FROM Teachers WHERE teacherId = '$teacherId'";

		$result = $conn->query($sql);

		if ($result->num_rows > 0)
		{
			setcookie("save", $save, time()+86400*30, "/","", 0);


			session_start();
			session_destroy();
			session_start();

			$row = $result->fetch_assoc();

			if($save == "true"){
				setcookie("id", $row['id'], time()+86400*30, "/","", 0);
			}

			$_SESSION["teacherId"] = $row['teacherId'];
			$_SESSION["name"] = $row['name'];
			$passwrd = $row['passwrd'];
			$conn -> close();
			return array("status" => "SUCCESS" , "password" => $passwrd);
		}
		else{
			$conn -> close();
			return array("status" => "Ese usuario no existe");
		}
	}else{
		$conn -> close();
		return array("status" => "Conexion fallida con base de datos");
	}
}

function attemptLogout(){

	session_start();
 	//unset session variables
 	unset($_SESSION['id']);
 	unset($_SESSION['name']);
 	session_destroy();

    return array("status" => "SUCCESS");

	
}

	function attemptchangePassword($newEncrPassword){

		$conn = connectionToDataBase();

		$currentUser = $_SESSION['teacherId'];
		$sql = "UPDATE Teachers set passwrd = '$newEncrPassword' WHERE teacherId = '$currentUser'";
		$result = $conn->query($sql);

		if($result->num_rows > 0){

			while($row = $result->fetch_assoc()){
				$response = array('username' => $row['username'], 'fName' => $row['fName'], 'lName' => $row['lName'], 'email' => $row['email'], 'gender' => $row['gender'], 'country' => $row['country']);
			}

			echo json_encode($response);
		}
		else{

			$conn -> close();
			return array("status" => "BADCRED");
		}

		return array("status" => "SESSIONEXP");
	}

function attemptGetCookie(){
	if (isset($_COOKIE["id"])){
		return array("status" => "SUCCCOOKIE");
	}
}

function getGroups($teacherId){
	$results = array();
	$conn = connectionToDataBase();

	if ($conn != null){

		$sql = "SELECT groupNumber, courseKey, id FROM Groups WHERE teacher_Id = '$teacherId'";

		$result = $conn->query($sql);

		if ($result->num_rows > 0){
			while($row = $result -> fetch_assoc()){
				$response = array('groupNumber' => $row['groupNumber'], 'courseKey' => $row['courseKey'], 'id' => $row['id']);
				array_push($results,$response);
			}
			echo json_encode($results);
		}
		else{
			$conn -> close();
			return array("status" => "BADCRED");
		}
		return array("status" => "SESSIONEXP");
	}
}

function loadProjects($grupo){
	$results = array();
	$conn = connectionToDataBase();

	if ($conn != null){

		$sql = "SELECT name, rank, id, recomended FROM Projects WHERE id IN (SELECT DISTINCT project_id FROM Students WHERE group_id = '$grupo')";
		$result = $conn->query($sql);

		if ($result->num_rows > 0){

			while($row = $result -> fetch_assoc()){
				$response = array('name' => $row['name'], 'rank' => $row['rank'], 'id' => $row['id'], 'recomended' => $row['recomended']);
				array_push($results,$response);
			}

			echo json_encode($results);
			return array("status" => "OK");
		}
		else{
			$conn -> close();
			return array("status" => "BADCRED");
		}
		return array("status" => "SESSIONEXP");
	}
}

function getAlumni($matricula){
	$results = array();
	$conn = connectionToDataBase();
	if ($conn != null){
		$sql = "SELECT * FROM Students WHERE studentId = '$matricula'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0){
			while($row = $result -> fetch_assoc()){
				$response = array('studentId' => $row['studentId'],
					'name' => $row['name'], 'bachelor' => $row['bachelor'],'academicEmail' => $row['academicEmail'], 'personalEmail' => $row['personalEmail'], 'cellphone' => $row['cellphone']);

				array_push($results, $response);
			}
			echo json_encode($results);
		}
		else{
			$conn -> close();
			return array("status" => "BADCRED");
		}
		return array("status" => "SESSIONEXP");
	}
}

function loadAlumni($grupo){
	$results = array();
	$conn = connectionToDataBase();
	if ($conn != null){
		$sql = "SELECT * FROM Students WHERE project_id IS NULL";
		$result = $conn->query($sql);
		if ($result->num_rows > 0){
			while($row = $result -> fetch_assoc()){
				$response = array('studentId' => $row['studentId'],
					'name' => $row['name'], 'bachelor' => $row['bachelor'],'academicEmail' => $row['academicEmail'], 'personalEmail' => $row['personalEmail'], 'cellphone' => $row['cellphone']);

				array_push($results, $response);
			}
			echo json_encode($results);
		}
		else{
			$conn -> close();
			return array("status" => "BADCRED");
		}
		return array("status" => "SESSIONEXP");
	}
}

function loadespProject($projectId){
	$results = array();
	$conn = connectionToDataBase();

	if ($conn != null){
		$sql = "SELECT * FROM Projects WHERE id = '$projectId' ";
		$result = $conn->query($sql);
		if ($result->num_rows > 0){
			while($row = $result -> fetch_assoc()){
				$response = array('name' => $row['name'], 'company' => $row['company'], 
					'classification' => $row['classification'], 'business' => $row['business']);

				array_push($results,$response);
			}
			echo json_encode($results);
		}
		else{
			$conn -> close();
			return array("status" => "BADCRED");
		}
		return array("status" => "SESSIONEXP");
	}
}

function addAlumni($mat, $project){
	$conn = connectionToDataBase();

	if ($conn != null){
		$sql = "UPDATE Students SET project_id = '$project' WHERE studentId = '$mat'";

		$result = $conn->query($sql);

		if ($result === TRUE){
			echo "Record updated successfully";
			return array("status" => "SUCCESS");
		}
		else{
			$conn -> close();
			return array("status" => "BADCRED");
		}

		return array("status" => "SESSIONEXP");
	}
}

function deleteStudent($matricula){
	$conn = connectionToDataBase();

	if ($conn != null){
		$sql = "UPDATE Students SET project_id = NULL WHERE studentId = '$matricula'";

		$result = $conn->query($sql);

		if ($result === TRUE){
			return array("status" => "SUCCESS");
		}
		else{
			$conn -> close();
			return array("status" => "BADCRED");
		}

		return array("status" => "SESSIONEXP");
	}
}

function loadFeedback($projectId){
	$conn = connectionToDataBase();
	$results = array();

	if($conn != null){
		$sql = "SELECT comment FROM Project_Feedback WHERE project_id = '$projectId'";
		$result = $conn->query($sql);

		if($result->num_rows > 0){
			while($row = $result -> fetch_assoc()){
				$response = array('comment' => $row['comment']);
				array_push($results, $response);
			}
			echo json_encode($results);
		}
		else{
			$conn -> close();
			return array("status" => "BADCRED");
		}
	}
}

function saveFeedback($projectId, $comment){
	$conn = connectionToDataBase();

	if($conn != null){
		$sql = "INSERT INTO Project_Feedback (project_id, comment) VALUES('$projectId', '$comment') ON DUPLICATE KEY UPDATE project_id = '$projectId', comment = '$comment'";
		if(mysqli_query($conn, $sql)){
			return array("status" => "SUCCESS");
		}
		else{
			return array("status" => "ERROR");
		}
	}
}

function loadStudents($projectId, $grupoId){
	$results = array();
	$conn = connectionToDataBase();

	if ($conn != null){


		$sql = "SELECT * FROM Students WHERE project_id = '$projectId' AND group_id = '$grupoId' ";

		$result = $conn->query($sql);

		if ($result->num_rows > 0){

			while($row = $result -> fetch_assoc()){
				$response = array('studentId' => $row['studentId'],
					'name' => $row['name'], 'bachelor' => $row['bachelor'],'academicEmail' => $row['academicEmail'], 'personalEmail' => $row['personalEmail'], 'cellphone' => $row['cellphone']);

				array_push($results,$response);
			}
			echo json_encode($results);
		}
		else{
			$conn -> close();
			return array("status" => "BADCRED");
		}

		return array("status" => "SESSIONEXP");
	}
}

?>