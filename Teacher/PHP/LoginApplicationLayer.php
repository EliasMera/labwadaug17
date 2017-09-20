<?php

header('Content-type: application/json');
require_once __DIR__ . '/LoginDataLayer.php';

$action = $_POST["action"];

switch($action){
	case "LOGIN" : loginFunction();
	break;
	case "GETCOOKIE" : getCookieFunction();
	break;


}


function loginFunction(){
	$teacherId = $_POST["teacherId"];
	$save = $_POST["save"];

	$result = attemptLogin($teacherId, $save);

	if ($result["status"] == "SUCCESS"){

		$decryptedPassword = decryptPassword($result['password']);
		$password = $_POST['teacherPasswrd'];

		if ($decryptedPassword == $password)
		{	
			$response = array("status" => "COMPLETE");   


			echo json_encode(array("message" => "Login Successful"));
		}


		
	}	
	else{
		header('HTTP/1.1 500' . $result["status"]);
		die($result["status"]);
	}	
}



function decryptPassword($password){
	$key = pack('H*', "bcb04b7e103a05afe34763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");

	$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);

	$ciphertext_dec = base64_decode($password);
	$iv_dec = substr($ciphertext_dec, 0, $iv_size);
	$ciphertext_dec = substr($ciphertext_dec, $iv_size);

	$password = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);


	$count = 0;
	$length = strlen($password);

	for ($i = $length - 1; $i >= 0; $i --)
	{
		if (ord($password{$i}) === 0)
		{
			$count ++;
		}
	}

	$password = substr($password, 0,  $length - $count); 

	return $password;
}


function getCookieFunction(){

	$result = attemptGetCookie();

	if($result["status"] == "SUCCCOOKIE"){
		echo json_encode(array("teacherId" =>  $_COOKIE["teacherId"]));
	}


}






?>