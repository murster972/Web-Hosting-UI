<?php

class Log{

	public function info($description, $applicationInfo = NULL, $userInfo = NULL){
		if($applicationInfo){
			$applicationInfo = json_encode($applicationInfo);
		}
		if($userInfo){
			$userInfo = json_encode($userInfo);
		}
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logs/info.log", date('Y-m-d h:m:s').":".$description." \nAPP:".$applicationInfo."\nUser:".$userInfo."\n\n", FILE_APPEND);
	
	}

	public function error($errorDescription, $applicationInfo = NULL, $userInfo = NULL){
		if($applicationInfo){
			$applicationInfo = json_encode($applicationInfo);
		}
		if($userInfo){
			$userInfo = json_encode($userInfo);
		}
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logs/errors.log", date('Y-m-d h:m:s').":".$errorDescription." \nAPP:".$applicationInfo."\nUser:".$userInfo."\n\n", FILE_APPEND);
	}

	public function query($sql, $parameters, $errorInfo, $return = 0, $returnType = "PDO::FETCH_ASSOC", $returnedData = NULL){
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logs/query.log", date('Y-m-d h:m:s').":".$sql."\nParameters:".json_encode($parameters)."\nReturn(T/F):".$return."\nreturnType:".$returnType."\nReturned Data:".json_encode($returnedData)."\nPDO Error Info:".json_encode($errorInfo)."\n\n", FILE_APPEND);
	}

}