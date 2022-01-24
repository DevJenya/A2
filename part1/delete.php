<?php

include("connection.php");

$id = $_GET['id']; 
echo $id;

if($_SERVER['REQUEST_METHOD'] == "GET" && isset($_GET["id"])){
    $query = mysqli_query($connection,"delete from bookmarks where bookmark_id = '$id'");
    echo "HERE";
}

header("Location: home.php");
die;
?>