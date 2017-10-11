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

?>