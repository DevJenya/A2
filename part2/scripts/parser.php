<?php
include("connection.php");
session_start();


$query = "select * from course_content 
            where entry_id = 1 limit 1";
            
$result = mysqli_query($connection, $query);

if($result && mysqli_num_rows($result)){

    $str = mysqli_fetch_assoc($result)["content"];
    $xml=simplexml_load_string($str) or die("Error: Cannot create object");

    $json_str = json_encode($xml);
    echo $json_str;
    //echo $xml;
}   
$test = $xml->course_id[0];
?>
