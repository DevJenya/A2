<?php
include("connection.php");
session_start();

$course_id = $_GET['course_id'];


$query = "select content from course_content 
             where course_id='$course_id'";
             //where course_id=$course_id, unit = $unit, lesson_number = $lesson_number";
$result = mysqli_query($connection, $query);
if($result && mysqli_num_rows($result)){
    $str = mysqli_fetch_assoc($result);
    
    $xml=simplexml_load_string($str) or die("Error: Cannot create object");
    $json_str = json_encode($xml);
    echo $json_str;
}   
?>
