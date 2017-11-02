<?php

header('Content-type: application/json');
require_once __DIR__ . '/dataLayer.php';

$action = $_POST["action"];

switch($action){
	case "LOGIN" : loginFunction();
					break;
	case "LOGOUT" : logoutFunction();
					break;
	case "REGISTER" : registerFunction();
					break;
	case "CHPASSWORD" : chpasswordFunction();
					break;
	case "GETCOOKIE" : getcookieFunction();
					break;
	case "CHECKSESSION" : checksessionFunction();
					break;
	case "CHECKHASPROYECT" : checkproyectFunction();
					break;
	case "REGISTERPROJECT" : registerProject();
					break;
	case "LOADPROJECTS"	: loadprojectFunc();
					break;
	case "FINDPROJECTS"	: findprojectFunc();
					break;
	case "EDITPROJECT" : editProject();
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

function registerFunction(){

	$studentId = $_POST['studentId'];
	$name = $_POST['name'];
	$bachelor = $_POST['bachelor'];
	$passwrd = $_POST['passwrd'];
	$academicEmail = $_POST['academicEmail'];
	$personalEmail = $_POST['personalEmail'];
	$cellphone = $_POST['cellphone'];
	$groupId = $_POST['groupId'];
	$projectId = $_POST['projectId'];


	$userPassword = encryptionPass($_POST['passwrd']);

	$result = attemptRegistration($studentId, $name, $bachelor, $userPassword, $academicEmail, $personalEmail, $cellphone, $groupId, $projectId);

	if ($result["status"] == "NAMEINUSE"){
		//echo json_encode(array("message" => "Login Successful"));
		header('HTTP/1.1 409 Conflict, Username already in use');
		echo json_encode(array("message" => "Ese numero de nomina ya existe"));
			
	}	
	else
		if ($result["status"] == "BADCONN"){

		header('HTTP/1.1 500 Bad connection, something went wrong while saving your data, please try again later');
		echo json_encode(array("message" => "Error, de conexion"));
	}
	else
		if ($result["status"] == "SUCCESS"){
			echo json_encode(array("message" => "Registro exitoso"));
		}
}

function chpasswordFunction(){
	session_start();
	
	$newPassword = $_POST['newPassword'];
	$newEncrPassword = encryptionPass($newPassword);
	$result = attemptchPassword($newEncrPassword);

	if($result["status"] == "BADCRED"){
		echo json_encode(array("message" => "Wrong credentials provided!"));
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

function getcookieFunction(){
	$result = attemptGetCookie();

	if($result["status"] == "SUCCCOOKIE"){
		echo json_encode(array("username" => $_COOKIE["username"]));
	}
}

function registerProject(){

	$newName = $_POST["name"];
	$newCompany = $_POST["company"];
	$newDescription = $_POST["description"];
	$newClassification = $_POST["classification"];
    $newBusiness = $_POST["business"];
    $newSemester = $_POST["semester"];

    $result = attemptRegister($name, $company, $description, $classification, $business, $semester);

    if($result["status"] == "SUCCESS"){
		echo json_encode(array("message" => "Register Succesfully!"));
	}
	else{
		header('HTTP/1.1 500' . $result["status"]);
		die($result["status"]);
	}
}

function editProject(){

	$name = $_POST["name"];
	$company = $_POST["company"];
	$description = $_POST["description"];
	$classification = $_POST["classification"];
    $business = $_POST["business"];
    
	$result = attemptEditProject($name, $company, $description, $classification, $business);

    if($result["status"] == "SUCCESS"){
		echo json_encode(array("message" => "Edit Succesfully!"));
	}
	else{
		header('HTTP/1.1 500' . $result["status"]);
		die($result["status"]);
	}
}

	function loadprojectFunc(){

		$result = loadProjects();

		if($result["status"] == "SUCCESS"){
			echo json_encode(array("message" => "Projects"));
		}
		else
			if ($result["status"] == "BADCONN"){
				header('HTTP/1.1 500 Bad connection, something went wrong while saving your data, please try again later');
				echo json_encode(array("message" => "Error, something went wrong"));
		}	

	}

	function findprojectFunc(){
		$result = findProjects();
		
		if($result["status"] == "SUCCESS"){
			echo json_encode(array("message" => "Projects"));
		}
		else
			if ($result["status"] == "BADCONN"){
				header('HTTP/1.1 500 Bad connection, something went wrong while saving your data, please try again later');
				echo json_encode(array("message" => "Error, something went wrong"));
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

	function checkproyectFunction(){
		session_start();
		if($_SESSION["projectId"] != null){
			echo json_encode(array("status" => "SUCCESS"));
		}

	}

	function logoutFunction(){
		session_unset();
		session_destroy();
		if (isset($_SESSION["studentId"])){
			header('HTTP/1.1 500' . "Logut error");
			die("Logut error");
		}
		else {
			echo json_encode(array("status" => "SUCCESS"));
		}
	}

?>