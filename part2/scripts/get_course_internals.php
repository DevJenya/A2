<?php
include("connection.php");
session_start();

$course_id = $_GET['course_id'];


$query = "select * from course_structure 
             where course_id='$course_id'";
            
$result = mysqli_query($connection, $query);
$myArray = array();

while($row = mysqli_fetch_assoc($result)) {
    $myArray[] = $row;
}

echo json_encode($myArray);
return json_encode($myArray);
die();
  
?>

