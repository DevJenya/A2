<?php

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "tma2p2";



if(!$connection = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname))
{
	die("Unable to connect to the database");
}

?>