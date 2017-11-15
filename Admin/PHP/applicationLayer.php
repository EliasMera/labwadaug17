<?php
session_start();

header('Content-type: application/json');
require_once __DIR__ . '/dataLayer.php';

$action = $_POST["action"];

switch($action){
	case "POPULATETEACHERSGROUPS" : populateTeachersGroups();
			break;
	case 'register': registerAdmin();
			break;
	case "LOGIN" : loginAdmin();
			break;
	case "GETALLPROJECTS" : getAllProjects();
			break;
	case "PROJECTDETAILS" : viewProjectDetails();
			break;
	case "SELECTPROJECTS" : selectParticipantProjects();
			break;
	case "GETCLASSIFICATIONS" : getProjectClassifications();
			break;
	case "CHANGEPASSWORD" : changePassword();
			break;
	case "LOGOUT" : logout();
			break;
	case "GETPARTICIPANTPROJECTS" : getParticipantProjects();
			break;
	case "GETREQUIREDFILES" : getRequiredFiles();
			break;
	case "SAVEREQUIREDFILES" : saveRequiredFiles();
			break;
}

function populateTeachersGroups() {
	if (isset($_SESSION["userId"])) {
		$data = $_POST["data"];
		if ($data == null){
			header('HTTP/1.1 500' . "Error en el archivo");
			die("Error en el archivo");
		}
		
		// Arreglo de datos a enviar al data layer
		$dataArr = array();

		// Por cada curso
		for ($iCourses = 0; $iCourses < count($data[0]); $iCourses++) {

			// $data[$iCourses+1] contiene todos los grupos del curso actual del ciclo for
			$size = count($data[$iCourses+1]);
			$i = 0;

			//echo $data[1][0]['Profesor'];

			$encPasswd = array();
			$nominaArr = array();
			$nameArr = array();
			$groupNumberArr = array();
			while ($i < $size) {
				$pos = strpos($data[$iCourses+1][$i]['Nomina'], "/");
				// Si el grupo tiene un solo profesor
				if ($pos === false) {
					array_push($encPasswd, encryptionPass($data[$iCourses+1][$i]['Nomina']));
					array_push($nominaArr, $data[$iCourses+1][$i]['Nomina']);
					array_push($nameArr, utf8_decode($data[$iCourses+1][$i]['Profesor']));
					array_push($groupNumberArr, $data[$iCourses+1][$i]['Gpo']);
				}
				else { // si el grupo tiene 2 profesores
					$nomina1 = substr($data[$iCourses+1][$i]['Nomina'], 0, 9);
					$nomina2 = substr($data[$iCourses+1][$i]['Nomina'], 11, 9);

					$pos = strpos($data[$iCourses+1][$i]['Profesor'], "/");
					$profesor1 = substr(utf8_decode($data[$iCourses+1][$i]['Profesor']), 0, $pos);
					$profesor2 = substr(utf8_decode($data[$iCourses+1][$i]['Profesor']), $pos+1);

					// meter solamente al profesor 1

				}
				$i += 1;
			}
			// Agregar al arreglo de datos a enviar al data layer
			$groupArr = array('course' => $data[0][$iCourses]);
			array_push($groupArr, $nominaArr);
			array_push($groupArr, $nameArr);
			array_push($groupArr, $encPasswd);
			array_push($groupArr, $groupNumberArr);
			array_push($dataArr, $groupArr);
		}
		
		$result = attemptPopulateTeachersGroups($dataArr);

		if ($result["status"] == "SUCCESS"){
			echo json_encode($result);
		}
		else{
			header('HTTP/1.1 500' . $result["status"]);
			die($result["status"]);
		}
	}
	else {
		header('HTTP/1.1 500' . "NO SESSION");
		die("NO SESSION");
	}
}

function encryptionPass($userPassword){

	$key = pack('H*',"bcb04b7e103a05afe34763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
	$key_size = strlen($key);

	$plaintext = $userPassword;

	$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
	$iv = mcrypt_create_iv($iv_size,MCRYPT_RAND);

	$ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $plaintext, MCRYPT_MODE_CBC, $iv);
	$ciphertext = $iv . $ciphertext;

	$userPassword = base64_encode($ciphertext);

	return $userPassword;
}

function decryptionPass($userPassword){
	$key = pack('H*',"bcb04b7e103a05afe34763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");

	$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);

	$ciphertext_dec = base64_decode($userPassword);
	$iv_dec = substr($ciphertext_dec,0,$iv_size);
	$ciphertext_dec = substr($ciphertext_dec,$iv_size);

	$userPassword = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);

	$count = 0;
	$length = strlen($userPassword);

	for($i = $length - 1; $i >= 0; $i --){
		if(ord($userPassword{$i}) === 0){
			$count ++;
		}
	}

	$userPassword = substr($userPassword, 0, $length - $count);

	return $userPassword;
	
}

function registerAdmin() {
	$data = $_POST["text"];
	$encPasswd = encryptionPass($data);
	$result = attemptRegister($encPasswd);

	if ($result["status"] == "SUCCESS"){
		echo json_encode($result);
	}
	else{
		header('HTTP/1.1 500' . $result["status"]);
		die($result["status"]);
	}
}

function loginAdmin() {
	$userId = $_POST["userId"];
	$userPassword = $_POST["userPassword"];

	$result = attemptLogin($userId);
	if ($result["status"] == "SUCCESS") {
		$decryptedPassword = $result["passwrd"];
		if ($userPassword === $decryptedPassword) {
			if (isset($_SESSION["userId"])) {
				$response = array("status" => "SUCCESS");
				echo json_encode($response);
			}
			else {
				$response = array("status" => "Error creating sesssion");
				echo json_encode($response);
			}
		}
		else {
			$response = array("status" => "WRONG");
			echo json_encode($response);	
		}
	}
	else {
		header('HTTP/1.1 500' . $result["status"]);
		die($result["status"]);
	}
}

function getAllProjects() {
	//session_start();
	if (isset($_SESSION["userId"])) {
		$result = attemptGetAllProjects();
		if ($result["status"] == "SUCCESS"){
			echo json_encode($result);
		}
		else{
			header('HTTP/1.1 500' . $result["status"]);
			die($result["status"]);
		}
	}
	else {
		header('HTTP/1.1 500' . "NO SESSION");
		die("NO SESSION");
	}
}

function viewProjectDetails() {
	if (isset($_SESSION["userId"])) {
		$id = $_POST["id"];
		$result = attemptViewProjectDetails($id);
		if ($result["status"] == "SUCCESS"){
			echo json_encode($result);
		}
		else{
			header('HTTP/1.1 500' . $result["status"]);
			die($result["status"]);
		}
	}
	else {
		header('HTTP/1.1 500' . "NO SESSION");
		die("NO SESSION");
	}
}

function selectParticipantProjects() {
	if (isset($_SESSION["userId"])) {
		$result = attemptSelectParticipantProjects();
		if ($result["status"] == "SUCCESS"){
			echo json_encode($result);
		}
		else{
			header('HTTP/1.1 500' . $result["status"]);
			die($result["status"]);
		}
	}
	else {
		header('HTTP/1.1 500' . "NO SESSION");
		die("NO SESSION");
	}
}

function getProjectClassifications() {
	if (isset($_SESSION["userId"])) {
		$result = attemptGetProjectClassifications();
		if ($result["status"] == "SUCCESS"){
			echo json_encode($result);
		}
		else{
			header('HTTP/1.1 500' . $result["status"]);
			die($result["status"]);
		}
	}
	else {
		header('HTTP/1.1 500' . "NO SESSION");
		die("NO SESSION");
	}
}

function changePassword() {
	if (isset($_SESSION["userId"])) {

		$data = $_POST["newPassword"];
		$encPasswd = encryptionPass($data);

		$result = attemptChangePassword($encPasswd);
		if ($result["status"] == "SUCCESS"){
			echo json_encode($result);
		}
		else{
			header('HTTP/1.1 500' . $result["status"]);
			die($result["status"]);
		}
	}
	else {
		header('HTTP/1.1 500' . "NO SESSION");
		die("NO SESSION");
	}
}

function logout() {
	session_unset();
	session_destroy();
	if (isset($_SESSION["userId"])){
		header('HTTP/1.1 500' . "Logut error");
		die("Logut error");
	}
	else {
		echo json_encode(array("status" => "SUCCESS"));
	}
}

function getParticipantProjects() {
	if (isset($_SESSION["userId"])) {
		$result = attemptGetParticipantProjects();
		if ($result["status"] == "SUCCESS"){
			echo json_encode($result);
		}
		else{
			header('HTTP/1.1 500' . $result["status"]);
			die($result["status"]);
		}
	}
	else {
		header('HTTP/1.1 500' . "NO SESSION");
		die("NO SESSION");
	}
}

function getRequiredFiles() {
	if (isset($_SESSION["userId"])) {
		$result = attemptGetRequiredFiles();
		if ($result["status"] == "SUCCESS"){
			echo json_encode($result);
		}
		else{
			header('HTTP/1.1 500' . $result["status"]);
			die($result["status"]);
		}
	}
	else {
		header('HTTP/1.1 500' . "NO SESSION");
		die("NO SESSION");
	}
}

function saveRequiredFiles() {
	if (isset($_SESSION["userId"])) {
		$data = $_POST["data"];
		$result = attemptSaveRequiredFiles($data);
		if ($result["status"] == "SUCCESS"){
			echo json_encode($result);
		}
		else{
			header('HTTP/1.1 500' . $result["status"]);
			die($result["status"]);
		}
	}
	else {
		header('HTTP/1.1 500' . "NO SESSION");
		die("NO SESSION");
	}
}

?>