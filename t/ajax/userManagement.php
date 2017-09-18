<?php
if($_SERVER['REQUEST_METHOD']!="POST"){
	header('Location: /');
	exit();
}

require_once('core/init.php');
$USER = new User();
$action = (isset($_POST['action'])) ? $_POST['action']:0;
if($action){
	switch($action){
		case 'login':
			$email = (isset($_POST['email'])) ? $_POST['email']:0;
			$password = (isset($_POST['password'])) ? $_POST['password']:0;
			if($USER->validate_login($email, $password)){
					echo json_encode(array("action"=>"Login", "result"=>"Success"));
			}else{
					echo json_encode(array("action"=>"Login", "result"=>"Failure"));
			}
			break;

			//Basic info about user
			case 'registerBasic':

			break;

			default:
				header('Location: /');
			break;
	}	
}else{
	header('Location: /');
}