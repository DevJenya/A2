<?php
include("connection.php");
session_start();

$course_id = $_GET['course_id'];


$query = "select * from quiz_data 
             where course_id='$course_id'";
            
$result = mysqli_query($connection, $query);
$myArray = array();

while($row = mysqli_fetch_assoc($result)) {
    $myArray[] = $row;
}

echo json_encode($myArray);
die();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../shared/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <title>Document</title>
</head>
<body>

    <div id="main">

        <form id="signout" action="scripts/logout.php" method="get">
            <input type="submit" value="Signout" class="top_btn">
        </form>

        <h1>HOME PAGE</h1>
        
        <div class="content" id="user_content"></div>

        <div class="content" id="user_quizes"></div>
    
    </div>

<script src="scripts/script_p2.js"></script>
</body>
</html>