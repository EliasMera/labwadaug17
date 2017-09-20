<?php

header('Content-type: application/json');
require_once __DIR__ . '/dataLayer.php';

$action = $_POST["action"];

switch($action){
	case "LOGIN" : loginFunction();
					break;
	case "REGISTER" : registerFunction();
					break;
	case "GETCOOKIE" : getcookieFunction();
					break;
	case "CHECKSESSION" : checksessionFunction();
					break;

}

function loginFunction(){

	$userName = $_POST["username"];
    $save = $_POST["save"];
    
    $result = attemptLogin($userName, $save);
    if ($result['status'] == 'COMPLETE'){
            
			$decryptedPassword = decryptionPass($result['password']);
			$password = $_POST['userPassword'];

		   	if ($decryptedPassword === $password)
		   	{	
		    	$response = array("status" => "COMPLETE");   

			    echo json_encode($response);
			}
			else
			{
				header('HTTP/1.1 306 Wrong credentials');
				die("Wrong credentials");
			}
		}

}

function decryptionPass($password){
	$key = pack('H*',"bcb04b7e103a05afe34763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");

	$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);

	$ciphertext_dec = base64_decode($password);
	$iv_dec = substr($ciphertext_dec,0,$iv_size);
	$ciphertext_dec = substr($ciphertext_dec,$iv_size);

	$password = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);

	$count = 0;
	$length = strlen($password);

	for($i = $length - 1; $i >= 0; $i --){
		if(ord($password{$i}) === 0){
			$count ++;
		}
	}

	$password = substr($password, 0, $length - $count);

	return $password;
	
}

function encryptionPass(){

	$userPassword = $_POST['userPassword'];

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

function logoutFunction(){
	$result = attemptLogout();

	if($result["status"] == "SUCCESS"){
		echo json_encode(array("message" => "Logout Succesfully"));
	}
	else{
		header('HTTP/1.1 500' . $result["status"]);
		die($result["status"]);
	}
}

function getcookieFunction(){
	$result = attemptGetCookie();

	if($result["status"] == "SUCCCOOKIE"){
		echo json_encode(array("username" => $_COOKIE["username"]));
	}
}

function checkSessionFunction(){

	$result = attemptCheckSession();

	if($result["status"] == "SUCCESS"){
		echo json_encode(array("message" => "Session established!"));
	}
	else{
		header('HTTP/1.1 500' . $result["status"]);
		die($result["status"]);
	}
}

?>