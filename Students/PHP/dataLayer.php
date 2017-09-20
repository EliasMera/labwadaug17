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

	function attemptLogout(){

		session_start();
		unset($_SESSION['studentId']);
		session_destroy();

		return array("status" => "SUCCESS");
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