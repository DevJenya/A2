<?php
include("connection.php");
session_start();


$query = "select * from user_accessible 
            where user_id = -1";
            
$result = mysqli_query($connection, $query);

if($result && mysqli_num_rows($result)){

    $result_arr = array();
    while($row = mysqli_fetch_array($result)) {
        $result_arr[] = $row;
    }

    $json_str = json_encode($result_arr);
    echo $json_str;
}   
?>
