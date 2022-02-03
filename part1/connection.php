<?php

$dbhost = "us-cdbr-east-05.cleardb.net";
$dbuser = "b6a146ef9c2204";
$dbpass = "1ec6ad6a";
$dbname = "heroku_9cb8c4cb996d465";



if(!$connection = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname))
{
	die("Unable to connect to the database");
}

?>