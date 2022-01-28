<?php
include("connection.php");
session_start();

$course_id = "COMP 466";
$unit = "1";
$lesson_number = "1";




$query = "select * from course_content 
             where course_id='COMP 466', unit = 1, lesson_number = 1;";
             //where course_id=$course_id, unit = $unit, lesson_number = $lesson_number";

echo $query;
             $result = mysqli_query($connection, $query);

if($result && mysqli_num_rows($result)){
    $str = mysqli_fetch_assoc($result)["content"];
    
    $xml=simplexml_load_string($str) or die("Error: Cannot create object");
    echo $xml;
    $json_str = json_encode($xml);
    //echo $json_str;
}   
?>
