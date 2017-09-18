<?php
require_once("core/init.php");
$USER = new User();
if($USER->logged_in()){
    echo "User is logged in with ID".$USER->get_userData("uid");
    echo "<br /><a href='logout.php'>logout</a>";
}else{
    echo "<a href='login.php'>login</a>";
}