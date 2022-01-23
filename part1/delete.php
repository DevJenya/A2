<?php

include("connection.php");

$id = $_GET['id']; 

$query = mysqli_query($connection,"delete from bookmarks where bookmark_id = '$id'");

?>