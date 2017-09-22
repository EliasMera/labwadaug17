<?php

	function connectionToDataBase(){
		$servername = "localhost";
		$username = "root";
		$password = "root";
		$dbname = "emprendimiento";

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
                $_SESSION['groupId'] =  $groupId;
                $_SESSION['projectId'] = $projectId;	

                $conn -> close();
				return array("status" => "COMPLETE" , "password" => $psswrd);
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

?>