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

function attemptPopulateTeachersGroups($data, $arrNomina, $arrName, $encPasswd){

	$conn = connectionToDataBase();

	if ($conn != null){

		$i = 0;
		$error = false;
		$size = count($data[1]);
		echo $size;
		echo $data[0][0];

		
		while ($i < $size) {

			$sql = "INSERT IGNORE INTO Teachers (teacherId, name, passwrd) VALUES ('$arrNomina[$i]', '$arrName[$i]', '$encPasswd[$i]')";

			if (mysqli_query($conn, $sql) == false){
				$error = true;
				$conn -> close();
				return array("status" => "BAD INSERT Teachers");
			}
			/*else {
				$id = mysqli_insert_id($conn);
				$sql = "INSERT INTO Groups (groupNumber, courseKey, teacher_id) VALUES ($data[1][$i]['Gpo'], $data[0][0], $id)";
				if (mysqli_query($conn, $sql) == false){
					$error = true;
					$conn -> close();
					return array("status" => "BAD INSERT Groups");
				}
			}*/
			$i += 1;
		
		}	
		$conn -> close();
		return array("status" => "SUCCESS");
	}
	else{
		$conn -> close();
		return array("status" => "CONNECTION WITH DB WENT WRONG");
	}
}

?>