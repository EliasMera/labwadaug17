<?php

	header('Content-type: application/json');
	require_once __DIR__ . '/dataLayer.php';

	$action = $_POST["action"];

	switch($action){
		case "LOGIN" 		: teacherLoginFunc();
			break;
		case "TREGISTER"	: teacherRegisterFunc();
			break;
		case "GETCOOKIE"	: getcookieFunction();
			break;
		case "CHECKSESSION"	: checksessionFunction();
			break;
		case "GETGROUPS" 	: getgroupsFunction();
			break;	
		case "REGISTERA"	: alumniRegisterFunc();
			break;
		case "LOADPROJECTS"	: loadprojectFunc();
			break;
		case "LOADESPPROJECT": loadespprojectFunc();
			break;
		case "LOADSTUDENTS"	: loadstudentsFunc();
			break;
	}

	function teacherRegisterFunc(){

		$teacherId = $_POST['teacherId'];
		$name = $_POST['name'];
		$userPassword = encryptPassword();
		$result = registerTeacher($teacherId, $userPassword, $name);

		if ($result["status"] == "NAMEINUSE"){
			header('HTTP/1.1 409 Conflict, Username already in use');
			echo json_encode(array("message" => "Ese numero de nomina ya existe"));
		}	
		else{
			if ($result["status"] == "BADCONN"){
				header('HTTP/1.1 500 Bad connection, something went wrong while saving your data, please try again later');
				echo json_encode(array("message" => "Error, de conexion"));
			}
			else{
				if ($result["status"] == "SUCCESS"){
					echo json_encode(array("message" => "Registro exitoso"));
				}
			}
		}
	}

	function teacherLoginFunc(){
		$teacherId = $_POST["teacherId"];
		$save = $_POST["save"];
		$result = loginTeacher($teacherId, $save);

		if ($result["status"] == "SUCCESS"){
			$decryptedPassword = decryptPassword($result['password']);
			$password = $_POST['teacherPasswrd'];
			if ($decryptedPassword == $password){	
				$response = array("status" => "COMPLETE");
				echo json_encode(array("message" => "Login Successful"));
			}	
		}	
		else{
			header('HTTP/1.1 500' . $result["status"]);
			die($result["status"]);
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
			echo json_encode(array("id" =>  $_COOKIE["id"]));
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

		for ($i = $length - 1; $i >= 0; $i --){
			if (ord($password{$i}) === 0){
				$count ++;
			}
		}
		$password = substr($password, 0,  $length - $count); 
		return $password;
	}

	function getgroupsFunction(){

		$teacherId = $_POST["teacherId"];
		$result = getGroups($teacherId);

		if ($result["status"] == "BADCRED"){
			echo json_encode(array("message" => "Wrong credentials provided"));

		}
	}

	function alumniRegisterFunc(){
		$mat = $_POST["mat"];
		$userPassword = encryptPassword();
		$grupo = $_POST["grupoId"];
		$project = $_POST["projectId"];

		$result = registerAlum($mat, $userPassword, $grupo, $project);

		if ($result["status"] == "NAMEINUSE"){
			header('HTTP/1.1 409 Conflict, Username already in use');
			echo json_encode(array("message" => "Ese alumno ya existe"));
		}	
		else
			if ($result["status"] == "BADCRED"){
				echo json_encode(array("message" => "Wrong credentials provided"));

			}
			else{

				if ($result["status"] == "SUCCESS"){
					echo json_encode(array("message" => "Registro exitoso"));
				}

			}
		}

	function loadprojectFunc(){

		$result = loadProjects();

		if ($result["status"] == "BADCRED"){
			echo json_encode(array("message" => "Wrong credentials provided"));
		}
	}

	function loadespprojectFunc(){

		$projectId = $_POST["projectId"];

		$result = loadespProject($projectId);

		if ($result["status"] == "BADCRED"){
			echo json_encode(array("message" => "Wrong credentials provided"));
		}
	}

	function loadstudentsFunc(){

		$projectId = $_POST["projectId"];
		$grupoId = $_POST["grupoId"];

		$result = loadStudents($projectId,$grupoId);
		
		if ($result["status"] == "BADCRED"){
			echo json_encode(array("message" => "Wrong credentials provided"));

		}

	}


?>