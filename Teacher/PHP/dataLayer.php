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
		else
		{
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

	function registerAlum($mat, $userPassword, $grupo){

		$conn = connectionToDataBase();
		$sql = "SELECT studentId FROM Students WHERE studentId = '$mat'";
		$result = $conn->query($sql);
		
		if($result->num_rows > 0){
			$conn -> close();
			return array("status" => "NAMEINUSE");
		}

		else{

			$sql = "INSERT INTO Students (studentId, group_id, passwrd) VALUES ('$mat', '$grupo', '$userPassword')";

			if(mysqli_query($conn, $sql)){

				return array("status" => "SUCCESS");
			}

			

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

				$_SESSION["id"] = $row['id'];
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

	function attemptGetCookie(){
		if (isset($_COOKIE["id"])){
	    	return array("status" => "SUCCCOOKIE");
		}
	}

	function getGroups($teacherId){
		$results = array();
		$conn = connectionToDataBase();

		if ($conn != null){

			$sql = "SELECT groupNumber, courseKey FROM Groups WHERE teacher_Id = '$teacherId'";
			
			$result = $conn->query($sql);

			if ($result->num_rows > 0){

				while($row = $result -> fetch_assoc()){

					$response = array('groupNumber' => $row['groupNumber'], 'courseKey' => $row['courseKey']);

					array_push($results,$response);


				}
				echo json_encode($results);

			}
			else
			{
				$conn -> close();
				return array("status" => "BADCRED");
		    	//header('HTTP/1.1 406 User not found');
		        //die("Wrong credentials provided!");
			}
			

		return array("status" => "SESSIONEXP");


		}

	}

	function getGroupId($curso, $grupo){
		$conn = connectionToDataBase();
		$results = array();

		if ($conn != null){

			$sql = "SELECT id FROM Groups WHERE courseKey = '$curso' and groupNumber = '$grupo'";
			
			$result = $conn->query($sql);

			if ($result->num_rows > 0){

				while($row = $result -> fetch_assoc()){

					$response = array('id' => $row['id']);

					array_push($results,$response);


				}
				echo json_encode($results);

			}
			else
			{
				$conn -> close();
				return array("status" => "BADCRED");
		    	//header('HTTP/1.1 406 User not found');
		        //die("Wrong credentials provided!");
			}
			

		return array("status" => "SESSIONEXP");


		}

	}

	function loadProjects(){
		$results = array();
		$conn = connectionToDataBase();

		 
		if ($conn != null){


			$sql = "SELECT name, rank FROM Projects";

			$result = $conn->query($sql);

			if ($result->num_rows > 0){
				 
				while($row = $result -> fetch_assoc()){
					 //echo $row['name'];

					$response = array('name' => $row['name'], 'rank' => $row['rank']);

					array_push($results,$response);


				}
				
				echo json_encode($results);



			}
			else
			{
				$conn -> close();
				return array("status" => "BADCRED");
		    	//header('HTTP/1.1 406 User not found');
		        //die("Wrong credentials provided!");
			}
			

		return array("status" => "SESSIONEXP");



		}

	}

?>