<?php

header('Content-type: application/json');
require_once __DIR__ . '/dataLayer.php';

$action = $_POST["action"];

switch($action){
	case "POPULATETEACHERSGROUPS" : populateTeachersGroups();
			break;
	case 'register': registerAdmin();
			break;
}

function populateTeachersGroups(){
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
				array_push($nameArr, $data[$iCourses+1][$i]['Profesor']);
				array_push($groupNumberArr, $data[$iCourses+1][$i]['Gpo']);
			}
			else {
				$nomina1 = substr($data[$iCourses+1][$i]['Nomina'], 0, 9);
				$nomina2 = substr($data[$iCourses+1][$i]['Nomina'], 11, 9);

				$pos = strpos($data[$iCourses+1][$i]['Profesor'], "/");
				$profesor1 = substr($data[$iCourses+1][$i]['Profesor'], 0, $pos);
				$profesor2 = substr($data[$iCourses+1][$i]['Profesor'], $pos+1);
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
	//$puta = $dataArr[0][1][0];
	//echo json_encode($puta);
	$result = attemptPopulateTeachersGroups($dataArr);

	if ($result["status"] == "SUCCESS"){
		echo json_encode($result);
	}
	else{
		header('HTTP/1.1 500' . $result["status"]);
		die($result["status"]);
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

?>