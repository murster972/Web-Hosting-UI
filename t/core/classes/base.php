<?php

class Base{

	protected $DB;

	public function __construct(){
		try {
			$username = "hostinguser";
			$password = "yoS7d5q56OSE";
			$this->DB = new PDO("mysql:host=localhost;dbname=hosting", $username, $password);
		} catch(PDOException $e) {
			echo "Failed to connect to database";
			Log::error("Failed to connect to database", array($e), array($username, $password));
			exit();
		}
	}

	protected function simpleQuery($sql, $parameters, $return = 0, $returnType = PDO::FETCH_ASSOC){
		$query = $this->DB->prepare($sql);
		$query->execute($parameters);
		if($return){
			$data = $query->fetchAll($returnType);
			Log::Query($sql, $parameters, $query->errorinfo(), $return, $returnType, $data);
			return array($data, $query);
		}else{
			Log::Query($sql, $parameters, $query->errorinfo());
			return $query;
		}
	}

}