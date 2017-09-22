<?php

header('Content-type: application/json');
require_once __DIR__ . '/dataLayer.php';

$action = $_POST["action"];

switch($action){
	case "POPULATETEACHERSGROUPS" : populateTeachersGroups();
					break;
}

function populateTeachersGroups(){
	$data = $_POST["data"];
	if ($data == null){
		header('HTTP/1.1 500' . "Error en el archivo");
		die("Error en el archivo");
	}
	echo "1";
	$size = count($data[1]);
	$i = 0;

	echo $data[1][0]['Profesor'];

	$encPasswd = array();
	$arrNomina = array();
	$arrName = array();
	while ($i < $size) {
		array_push($encPasswd, encryptionPass($data[1][$i]['Nomina']));
		array_push($arrNomina, $data[1][$i]['Nomina']);
		array_push($arrName, $data[1][$i]['Profesor']);
		$i += 1;
	}

	$result = attemptPopulateTeachersGroups($data, $arrNomina, $arrName, $encPasswd);

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

?>