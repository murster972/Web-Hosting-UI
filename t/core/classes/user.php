<?php

class User extends Base{

	private $userData;


	public function __construct(){
		parent::__construct();
		if(isset($_SESSION['uid'])){
			$this->userData = $this->simpleQuery("SELECT * FROM `user` WHERE `UID`={$_SESSION['uid']} LIMIT 1", NULL, 1)[0][0];
			if(!$this->userData){
				Log::error("Failed to get user data in constructor", array("UID"=>$_SESSION['uid'],"DB"=>$this->DB->errorinfo()));
			}
		}
	}

	public function validate_login($email, $password){
		unset($_SESSION['login_error']);
		$_SESSION['login_error']['email'] = $email;
		$loginQuery = $this->simpleQuery("SELECT `uid`, `password` FROM `user` WHERE `email`=:email LIMIT 1", array("email"=>$email), True)[0];
		if($loginQuery){
			if($this->verify_password($password, $loginQuery[0]['password'])){
				unset($_SESSION['login_error']);
				Log::info("Login Succesful", NULL, array("email"=>$email));
				$_SESSION['uid'] = $loginQuery[0]['uid'];
				$this->simpleQuery("UPDATE `user` SET `last_login`=UNIX_TIMESTAMP() WHERE `uid`={$loginQuery[0]['uid']} LIMIT 1", array());
				return 1;
			}else{
				Log::info("Wrong Password for user", NULL, array("Email"=>$email));
				return 0;
			}
		}else{
			Log::info("Failed to find email address suplied for user",NULL, array($email));
			return 0;
		}
	}

	/** TODO 
		Validate Login

		Register(3 stages)
	**/

	public function get_userData($field){
		if(array_key_exists($field, $this->userData)){
			return $this->userData[$field];
		}else
			Log::error("get_userData failed. Failed Field is key test", array($field), $this->userData);
			return 0;
	}

	public function set_userData($field, $value){
		if(array_key_exists($field, $this->userData)){
			$updateDB = $this->simpleQuery("UPDATE `user` SET `{$field}`=:value WHERE `uid`=:uid LIMIT 1", array(":value"=>$value, ":uid"=>$this->userData['UID']));
			if($updateDB->rowCount()==1){
				Log::info("Updated User Data", array("Field"=>$field, "Value"=>$value), $this->userData);
				$this->userData[$field]==$value;
				return 1;
			}else{
				Log::error("Failed to update user data in database", array("Field"=>$field, "Value"=>$value, "DB"=>$this->DB->errorinfo()), $this->userData);
			}
		}else
			Log::error("set_userData failed. Failed Field is key test", array($field), $this->userData);
			return 0;
	}

	public function hash_password($password){
        return password_hash($password, CRYPT_BLOWFISH, ['cost'=>10]);
    }

    private function verify_password($password, $hash){
        return password_verify($password, $hash);
    }

    public function logged_in(){
    	return ($this->userData['uid']==0)? 0:1;
    }

    public function logout(){
    	Log::info("User logged out", Null, $this->userData);
    	unset($this->userData);
    	unset($_SESSION['uid']);
    }

}