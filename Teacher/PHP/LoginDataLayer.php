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


function attemptLogin($teacherId, $save){

	$conn = connectionToDataBase();

	if ($conn != null){
		$sql = "SELECT * FROM Teachers WHERE teacherId = '$teacherId'";
		
		$result = $conn->query($sql);

		if ($result->num_rows > 0)
		{
			setcookie("save", $save, time()+86400*30, "/","", 0);

			if($save == "true"){
				setcookie("teacherId", $teacherId, time()+86400*30, "/","", 0);
			}

			session_start();
			session_destroy();
			session_start();

			$row = $result->fetch_assoc();

			$_SESSION["teacherId"] = $teacherId;
			$_SESSION["name"] = $row['name'];
;

			$passwrd = $row['passwrd'];

                //echo "welcome". $_SESSION["username"] . "<br>";

                /*if (isset($_COOKIE["username"])){
                	 echo "welcome". $_COOKIE["username"] . "<br>";
                	}*/

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

	if (isset($_COOKIE["teacherId"])){

    return array("status" => "SUCCCOOKIE");

	}

}





        ?>