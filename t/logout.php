<?php
require_once("core/init.php");
$USER = new User();
$USER->logout();
Log::info("User logged out", NuLL, Null);
header('Location: /');