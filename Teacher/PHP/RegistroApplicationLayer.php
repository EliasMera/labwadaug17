<?php
header('Content-type: application/json');
require_once __DIR__ . '/RegistroDataLayer.php';

$action = $_POST["action"];

switch($action){
	case "REGISTER" : registerFunction();
					break;
	case "GETCOOKIE" : getCookieFunction();
	break;

}

function registerFunction(){

	$teacherId = $_POST['teacherId'];
	$name = $_POST['name'];


	

	$userPassword = encryptPassword();

	$result = attemptRegistration($teacherId, $userPassword, $name);

	if ($result["status"] == "NAMEINUSE"){
		//echo json_encode(array("message" => "Login Successful"));
		header('HTTP/1.1 409 Conflict, Username already in use');
		echo json_encode(array("message" => "Ese numero de nomina ya existe"));
			
			//echo("Username already in use");
	}	
	else
		if ($result["status"] == "BADCONN"){
		//header('HTTP/1.1 500' . $result["status"]);
		//die($result["status"]);
		header('HTTP/1.1 500 Bad connection, something went wrong while saving your data, please try again later');
		echo json_encode(array("message" => "Error, de conexion"));
	}
	else
		if ($result["status"] == "SUCCESS"){
			echo json_encode(array("message" => "Registro exitoso"));
		}
}


function encryptPassword(){
		$userPassword = $_POST['passwrd'];

	    $key = pack('H*', "bcb04b7e103a05afe34763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
	    $key_size =  strlen($key);
	    
	    $plaintext = $userPassword;

	    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
	    $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
	    
	    $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $plaintext, MCRYPT_MODE_CBC, $iv);
	    $ciphertext = $iv . $ciphertext;
	    
	    $userPassword = base64_encode($ciphertext);

	    return $userPassword;
}


function getCookieFunction(){

	$result = attemptGetCookie();

	if($result["status"] == "SUCCCOOKIE"){
		echo json_encode(array("teacherId" =>  $_COOKIE["teacherId"]));
	}


}







?>