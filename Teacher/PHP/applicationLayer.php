<?php

	header('Content-type: application/json');
	require_once __DIR__ . '/dataLayer.php';

	$action = $_POST["action"];
	switch($action){
		case "LOGIN" 			: teacherLoginFunc();
			break;
		case "LOGOUT"			: teacherLogOutFunc();
			break;
		case "TREGISTER"		: teacherRegisterFunc();
			break;
		case "GETCOOKIE"		: getcookieFunction();
			break;
		case "CHECKSESSION"		: checksessionFunction();
			break;
		case "GETGROUPS" 		: getgroupsFunction();
			break;	
		case "REGISTERA"		: alumniRegisterFunc();
			break;
		case "REGISTERB"		: alumniRegisterFuncB();
			break;
		case "LOADPROJECTS"		: loadprojectFunc();
			break;
		case "LOADESPPROJECT"	: loadespprojectFunc();
			break;
		case "LOADSTUDENTS"		: loadstudentsFunc();
			break;
		case "DELETESTUDENT"	: deleteStudentFunc();
			break;
		case "EDITALUMNI"		: editAlumniFunc();
			break;
		case "GETALUMNI"		: getAlumniFunc();
			break;
		case "UPDATERECOMMEND"	: updateRecommendFunc();
			break;
		case "UPDATEPRIORITY"	: updatePriorityFunc();
			break;
		case "CHANGEPASS" 		: changePassFunc();
			break;
		case "LOADFEEDBACK"		: loadFeedbackFunc();
			break;
		case "SAVEFEEDBACK"		: saveFeedbackFunc();
			break;
		case "LOADALUMNI"		: loadAlumniFunc();
			break;
		case "ADDALUMNI"		: addAlumniFunc();
			break;
		case "LOADANOUNCEMENTS" : loadAnouncements();
			break;
	}

	function debug_to_console( $data ) {
	    $output = $data;
	    if ( is_array( $output ) )
	        $output = implode( ',', $output);

	    echo "<script>console.log( 'Debug Objects: " . $output . "' );</script>";
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

	function changePassFunc(){
		session_start();
		$newEncrPassword = encryptPassword();
		$result = attemptchangePassword($newEncrPassword);

		if($result["status"] == "BADCRED"){
			echo json_encode(array("message" => "Wrong credentials provided!"));	
		}
	}

	function teacherLogOutFunc(){
		$result = attemptLogout();
    
	    if ($result["status"] == "SUCCESS"){
			echo json_encode(array("message" => "Logout succesfull"));
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

	function updatePriorityFunc(){
		$project = $_POST["projId"];
		$prio = $_POST["prio"];

		$result = updatePriority($project, $prio);

		if ($result["status"] == "BADCRED"){
			echo json_encode(array("message" => "Wrong credentials provided"));
		}
		else{
			if ($result["status"] == "SUCCESS"){
				echo json_encode(array("message" => "Update exitoso"));
			}
		}		
	}

	function updateRecommendFunc(){
		$recommend = $_POST["recommend"];
		$project = $_POST["projectId"];

		$result = updateRecommend($project, $recommend);

		if ($result["status"] == "BADCRED"){
			echo json_encode(array("message" => "Wrong credentials provided"));
		}
		else{
			if ($result["status"] == "SUCCESS"){
				echo json_encode(array("message" => "Update exitoso"));
			}
		}
	}

	function editAlumniFunc(){
		$nom = $_POST["nom"];
        $carr = $_POST["carr"];
        $acamail = $_POST["acamail"];
        $permail = $_POST["permail"];
        $cell = $_POST["cell"];
		$mat = $_POST["mat"];
		$grupo = $_POST["grupoId"];
		$project = $_POST["projectId"];

		$result = editAlumni($mat, $grupo, $project, $nom, $carr, $acamail, $permail, $cell);

		if ($result["status"] == "NAMEINUSE"){
			header('HTTP/1.1 409 Conflict, Username already in use');
			echo json_encode(array("message" => "Ese alumno ya existe"));
		}	
		else{
			if ($result["status"] == "BADCRED"){
				echo json_encode(array("message" => "Wrong credentials provided"));

			}
			else{
				if ($result["status"] == "SUCCESS"){
					echo json_encode(array("message" => "Registro exitoso"));
				}
			}
		}
	}

	function alumniRegisterFuncB(){
		$nom = $_POST["nom"];
        $carr = $_POST["carr"];
        $acamail = $_POST["acamail"];
        $permail = $_POST["permail"];
        $cell = $_POST["cell"];
		$mat = $_POST["mat"];
		$userPassword = encryptPassword();
		$grupo = $_POST["grupoId"];

		$result = registerAlumB($mat, $userPassword, $grupo, $nom, $carr, $acamail, $permail, $cell);

		if ($result["status"] == "NAMEINUSE"){
			header('HTTP/1.1 409 Conflict, Username already in use');
			echo json_encode(array("message" => "Ese alumno ya existe"));
		}	
		else{
			if ($result["status"] == "BADCRED"){
				echo json_encode(array("message" => "Wrong credentials provided"));

			}
			else{

				if ($result["status"] == "SUCCESS"){
					echo json_encode(array("message" => "Registro exitoso"));
				}

			}
		}
	}

	function alumniRegisterFunc(){
		$nom = $_POST["nom"];
        $carr = $_POST["carr"];
        $acamail = $_POST["acamail"];
        $permail = $_POST["permail"];
        $cell = $_POST["cell"];
		$mat = $_POST["mat"];
		$userPassword = encryptPassword();
		$grupo = $_POST["grupoId"];
		$project = $_POST["projectId"];

		$result = registerAlum($mat, $userPassword, $grupo, $project, $nom, $carr, $acamail, $permail, $cell);

		if ($result["status"] == "NAMEINUSE"){
			header('HTTP/1.1 409 Conflict, Username already in use');
			echo json_encode(array("message" => "Ese alumno ya existe"));
		}	
		else{
			if ($result["status"] == "BADCRED"){
				echo json_encode(array("message" => "Wrong credentials provided"));

			}
			else{

				if ($result["status"] == "SUCCESS"){
					echo json_encode(array("message" => "Registro exitoso"));
				}

			}
		}
	}

	function loadprojectFunc(){
		$grupo = $_POST["grupo"];
		$result = loadProjects($grupo);
		if ($result["status"] == "BADCRED"){
			echo json_encode(array("message" => "Wrong credentials provided"));
		}
	}

	function getAlumniFunc(){
		$matricula = $_POST["matricula"];
		$result = getAlumni($matricula);
		if ($result["status"] == "BADCRED"){
			echo json_encode(array("message" => "Wrong credentials provided"));
		}
	}

	function loadAlumniFunc(){
		$grupo = $_POST["grupo"];
		$result = loadAlumni($grupo);
		if ($result["status"] == "BADCRED"){
			echo json_encode(array("message" => "Wrong credentials provided"));
		}
	}

	function addAlumniFunc(){
		$mat = $_POST["mat"];
		$project = $_POST["project"];
		$result = addAlumni($mat, $project);
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

	function deleteStudentFunc(){
		$matricula = $_POST["matricula"];
		$result = deleteStudent($matricula);
		if ($result["status"] == "BADCRED"){
			echo json_encode(array("message" => "Wrong credentials provided"));
		}
	}

	function loadFeedbackFunc(){
		$projectId = $_POST["projectId"];
		$result = loadFeedback($projectId);
		if ($result["status"] == "BADCRED"){
			echo json_encode(array("message" => "Wrong credentials provided"));
		}
	}

	function saveFeedbackFunc(){
		$comment = $_POST["comment"];
		$projectId = $_POST["projectId"];
		$result = saveFeedback($projectId, $comment);
		if ($result["status"] == "SUCCESS"){
			echo json_encode(array("message" => "Registro exitoso"));
		}
		else{
			echo json_encode(array("message" => "Wrong credentials provided"));
		}
	}

	function loadAnouncements() {
		$result = attemptLoadAnouncements();
		if ($result["status"] == "SUCCESS"){
			echo json_encode($result);
		}
		else{
			header('HTTP/1.1 500' . $result["status"]);
			die($result["status"]);
		}
	}

?>