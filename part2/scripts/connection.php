<?php

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "tma2p1";



if(!$connection = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname))
{
	die("Unable to connect to the database");
}

?>