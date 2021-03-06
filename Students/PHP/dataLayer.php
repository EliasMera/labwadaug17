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

	function attemptLogin($userName, $save){
	
		$conn = connectionToDataBase();
        
        if ($conn != null){
        	$sql = "SELECT * FROM Students WHERE studentId = '$userName'";
            
			$result = $conn->query($sql);
			
			# The current user exists
			if ($result->num_rows > 0)
			{
				while($row = $result->fetch_assoc()) 
		    	{
                    $name = $row["name"];
                    $studentId = $row["studentId"];
                    $groupId = $row["group_id"];
                    $projectId = $row['project_id'];
                    $password = $row['passwrd'];
				}
                
                setcookie("save", $save, time()+2000, "/","", 0);
            
                if($save == "true"){
                    setcookie("studentId", $studentId, time()+2000, "/","", 0);
                }
                
                session_start();
                session_destroy();
                session_start();

                $_SESSION['name'] = $name;
                $_SESSION['studentId'] = $studentId;
                $_SESSION['password'] = $password;
                $_SESSION['groupId'] =  $groupId;
                $_SESSION['projectId'] = $projectId;	

                $conn -> close();
				return array("status" => "COMPLETE" , "password" => $password);
			}
			else
			{
				$conn->close();
				return array("status" => "ERROR");
			}
        }
        else
        {
        	$conn->close();
        	return array("status" => "ERROR");
        }
	}

		function attemptRegistration($studentId, $name, $bachelor, $userPassword, $academicEmail, $personalEmail, $cellphone, $groupId, $projectId){

		$conn = connectionToDataBase();

		//$userName = $_POST['username'];

		$sql = "SELECT studentId FROM Students WHERE studentId = '$studentId'";
		$result = $conn->query($sql);
		
		if($result->num_rows > 0)
		{
			//header('HTTP/1.1 409 Conflict, Username already in use');
			$conn -> close();
			return array("status" => "NAMEINUSE");
			//die('Username already in use');
		}
		else
		{
			
			$sql = "INSERT INTO Students (studentId, name, bachelor, passwrd, academicEmail, personalEmail, cellphone, group_id, project_id) VALUES ('$studentId', '$name', '$bachelor', '$userPassword', '$academicEmail', '$personalEmail', '$cellphone', 1, 1)";
	    	
	    	if (mysqli_query($conn, $sql)) 
	    	{

			    $conn -> close();
			    session_start();
                session_destroy();
                session_start();
                $row = $result->fetch_assoc();

                /*$_SESSION["studentId"] = $studentId;
                $_SESSION["name"] = $name;
			    return array("status" => "SUCCESS"); */
			} 
			else 
			{
				$conn -> close();
				return array("status" => "BADCONN");
			}
			
		}

	}

		function attemptchPassword($newEncrPassword){

		$conn = connectionToDataBase();

		$currentUser = $_SESSION['studentId'];
		$sql = "UPDATE Students set passwrd = '$newEncrPassword' WHERE studentId = '$currentUser'";
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
		if(isset($_COOKIE["studentId"])){
			return array("status" => "SUCCCOOKIE");

		}
	}

	function attemptCheckSession(){

		session_start();

		if(isset($_SESSION["studentId"])){
			return array("status" => "SUCCESS");
		}
	}

	function attemptRegisterProject($grupo, $nombre, $empresa, $descripcion, $clasificacion, $giro, $integrantes, $nombreA, $matriculaA, $carreraA, $emailAcademicoA,
	$emailPersonalA, $celularA, $encPasswd)
	{
		$conn = connectionToDataBase();

		if ($conn != null){
			$i = 0;
			$error = false;
			while ($i <= $integrantes - 1 && !$error) {
				$sql = "INSERT IGNORE INTO Students (studentId, name, bachelor, passwrd, academicEmail, personalEmail, cellphone, group_id) VALUES 
				('$matriculaA[$i]', '$nombreA[$i]', '$carreraA[$i]', '$encPasswd[$i]', '$emailAcademicoA[$i]', '$emailPersonalA[$i]', '$celularA[$i]', '$grupo')";

				if (mysqli_query($conn, $sql) == false){
					$error = true;
				}
				$i += 1; 
			}
			if ($error){
				$conn -> close();
				return array("status" => "BADCONN INSERT Alumnos");
			}
			else{
				$sql ="INSERT INTO Projects (name, company, description, classification, business, semester, active)
				VALUES ('$nombre', '$empresa', '$descripcion', '$clasificacion', '$giro', 'AD-17', 1)";
				if (mysqli_query($conn, $sql)){
					$id = mysqli_insert_id($conn);
					$i = 0;
					$error = false;
					while ($i <= $integrantes - 1 && !$error) {
						$sql = "UPDATE Students SET project_id = '$id' WHERE studentId = '$matriculaA[$i]'";
						if (mysqli_query($conn, $sql) == false){
							$error = true;
						}
						$i += 1; 
					}
					if (!$error){
						$conn -> close();
						session_start();
						$_SESSION['projectId'] = $id;
			    		return array("status" => "SUCCESS");
					}
					else{
						$conn -> close();
						return array("status" => "BADCONN UPDATE");
					}
				}
				else{
					$conn -> close();
					return array("status" => "BADCONN INSERT");
				}
			}
		}
		else{
			$conn -> close();
			return array("status" => "CONNECTION WITH DB WENT WRONG");
		}
	}

	function showProjects(){

		$conn = connectionToDataBase();

		session_start();
		$idProject = $_SESSION['projectId'];

		$results = array();
		$results2 = array();

		$sql = "SELECT name, company, description, classification, business FROM Projects WHERE id = '$idProject'";
		$sql2 = "SELECT val FROM Project_Classifications";

		$result = $conn->query($sql);
		$result2 = $conn->query($sql2);

			if ($result->num_rows > 0){

				while($rowC = $result2 -> fetch_assoc()){
					$arrClassif = utf8_encode($rowC['val']);
					array_push($results2,$arrClassif);
				}
				 
				while($row = $result -> fetch_assoc()){
					$response = array('name' => utf8_encode($row['name']), 'company' => utf8_encode($row['company']), 'description' => utf8_encode($row['description']), 'classification' => utf8_encode($row['classification']), 'business' => utf8_encode($row['business']), 'classifications' => $results2);
					array_push($results,$response);
				}
				
					echo json_encode($results);
			}
			else
			{
				$conn -> close();
				return array("status" => "DISCONNECTION");
			}
	}

	function showComments(){

		$conn = connectionToDataBase();

		session_start();
		$idProject = $_SESSION['projectId'];

		$results = array();

		$sql = "SELECT comment FROM Project_Feedback WHERE project_id = '$idProject'";

		$result = $conn->query($sql);

			if ($result->num_rows > 0){
				 
				while($row = $result -> fetch_assoc()){
					$response = array('comment' => utf8_encode($row['comment']));
					array_push($results,$response);
				}
				
					echo json_encode($results);
			}
			else
			{
				$conn -> close();
				return array("status" => "DISCONNECTION");
			}
	}

	function attemptEditProject($name, $company, $description, $classification, $business){

		$conn = connectionToDataBase();
		session_start();
		$idProject = $_SESSION['projectId'];

		if ($conn != null)
		{
			$sql = "UPDATE Projects set name = '$name', company = '$company', description = '$description', classification ='$classification', business = '$business' WHERE id = '$idProject'";
			$result = $conn-> query($sql);
			return array("status" => "SUCCESS");
		}

	}

	function loadProjects(){

		$conn = connectionToDataBase();
		$results = array();

		$sql = "SELECT name, company, description, classification, business, semester FROM Projects WHERE active = 0";

		$result = $conn->query($sql);

			if ($result->num_rows > 0){
				 
				while($row = $result -> fetch_assoc()){
					/*$response = array('name' => utf8_encode($row['name']), 'company' => utf8_encode($row['company']), 'description' => utf8_encode($row['description']), 'classification' => utf8_encode($row['classification']), 'business' => utf8_encode($row['business']), 'semester' => utf8_encode($row['semester']));
					array_push($results,$response);*/

					$response["data"][] = array_map("utf8_encode", $row);
				}
				
					echo json_encode($response);
			}
			else
			{
				$conn -> close();
				return array("status" => "DISCONNECTION");
			}

	}

	function findProjects(){

		$keyword = $_POST['keyword'];

		$conn = connectionToDataBase();
		$results = array();

		$sql = "SELECT name, company, description, classification, business, semester FROM Projects WHERE name LIKE '%$keyword%' OR company LIKE '%$keyword%' OR description LIKE '%$keyword%' OR classification LIKE '%$keyword%' OR business LIKE '%$keyword%' OR semester LIKE '%$keyword%'";

		$result = $conn->query($sql);

			if ($result->num_rows > 0){
				 
				while($row = $result -> fetch_assoc()){
					$response = array('name' => utf8_encode($row['name']), 'company' => utf8_encode($row['company']), 'description' => utf8_encode($row['description']), 'classification' => utf8_encode($row['classification']), 'business' => utf8_encode($row['business']), 'semester' => utf8_encode($row['semester']));
					array_push($results,$response);


				}
				
					echo json_encode($results);
			}
			else
			{
				$conn -> close();
				return array("status" => "DISCONNECTION");
			}
	}


	function attemptshowAccount(){

		$conn = connectionToDataBase();
		$results = array();
        
        session_start();
        $studentId = $_SESSION['studentId'];
		$sql = "SELECT name, bachelor, academicEmail, personalEmail, cellphone FROM Students WHERE studentId = '$studentId'";

		$result = $conn->query($sql);

			if ($result->num_rows > 0){
				 
				while($row = $result -> fetch_assoc()){
					$response = array('name' => utf8_encode($row['name']), 'bachelor' => utf8_encode($row['bachelor']), 'academicEmail' => utf8_encode($row['academicEmail']), 'personalEmail' => utf8_encode($row['personalEmail']), 'cellphone' => utf8_encode($row['cellphone']));
					array_push($results,$response);


				}
				
				echo json_encode($results);
			}
			else
			{
				$conn -> close();
				return array("status" => "DISCONNECTION");
			}
	}

	function attemptEditAccount($name, $bachelor, $acEmail, $persEmail, $phone){

		$conn = connectionToDataBase();
		session_start();
		$studentId = $_SESSION['studentId'];

		if ($conn != null)
		{
			$sql = "UPDATE Students set name = '$name', bachelor = '$bachelor', academicEmail = '$acEmail', personalEmail ='$persEmail', cellphone = '$phone' WHERE studentId = '$studentId'";
			$result = $conn-> query($sql);
			return array("status" => "SUCCESS");
		}		
	}


	function showArchs(){

		$conn = connectionToDataBase();
		$results = array();

		$sql = "SELECT id, val FROM Required_Files WHERE active = 1";

		$result = $conn->query($sql);

			if ($result->num_rows > 0){
				 
				while($row = $result -> fetch_assoc()){
					$response = array('id' => utf8_encode($row['id']), 'val' => utf8_encode($row['val']));
					array_push($results,$response);
				}
				
					echo json_encode($results);
			}
			else
			{
				$conn -> close();
				return array("status" => "DISCONNECTION");
			}


	}


	function attemptLoadAnouncements() {
		$conn = connectionToDataBase();

		if ($conn != null) {
			$sql = "SELECT * FROM Anouncements";
			$result = $conn->query($sql);
			if ($result->num_rows > 0) {

				$response = array("status" => "SUCCESS");
				$resp = array();
				while ($row = $result->fetch_assoc()) {
					$aux = array('id' => $row['id'], 'val' => utf8_encode($row['val']), 'date_time' => $row['date_time']);
			    	array_push($resp, $aux);
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


?>