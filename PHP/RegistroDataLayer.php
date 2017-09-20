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


	function attemptRegistration($teacherId, $userPassword, $name){

		$conn = connectionToDataBase();

		//$userName = $_POST['username'];

		$sql = "SELECT teacherId FROM Teachers WHERE teacherId = '$teacherId'";
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
			
			$sql = "INSERT INTO Teachers (teacherId, name, passwrd) VALUES ('$teacherId', '$name', '$userPassword')";
	    	
	    	if (mysqli_query($conn, $sql)) 
	    	{

	    		//setcookie("save", $save, time()+86400*30, "/","", 0);
            
                //if($save == "true"){
                    //setcookie("username", $userName, time()+86400*30, "/","", 0);
                //}

			    //echo json_encode("New record created successfully");
			    $conn -> close();
			    session_start();
                session_destroy();
                session_start();
                $row = $result->fetch_assoc();

                $_SESSION["teacherId"] = $teacherId;
                $_SESSION["name"] = $name;
			    return array("status" => "SUCCESS");
			} 
			else 
			{
				$conn -> close();
				return array("status" => "BADCONN");
				//header('HTTP/1.1 500 Bad connection, something went wrong while saving your data, please try again later');
			    //die("Error: " . $sql . "\n" . mysqli_error($conn));
			}
			
		}

	}

function attemptGetCookie(){

	if (isset($_COOKIE["teacherId"])){

    return array("status" => "SUCCCOOKIE");

	}

}





?>