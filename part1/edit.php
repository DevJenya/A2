<?php
session_start();
include("connection.php");

$id = $_GET['id']; 

//GET the link being edited info
$query_user_links = "select bookmark_id, bookmark_name,bookmark_link 
        from bookmarks where bookmark_id = '$id'";
$result = mysqli_query($connection, $query_user_links);


if($result && mysqli_num_rows($result) > 0){
    $row = mysqli_fetch_assoc($result);
    $name = $row['bookmark_name'];
    $link = $row['bookmark_link'];
}


if($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST["bookmark_update"])){
    $query = mysqli_query($connection,"UPDATE bookmarks 
    SET bookmark_name = '".$_POST['bookmark_name']."' ,
    bookmark_link  = '".$_POST['bookmark_address']."'
    where bookmark_id = '$id'");

    header("Location: home.php");
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../shared/style1.css">
    <title>Document</title>
</head>
<body>
<h1 id="logo">Bmarker</h1>
<form id="signout" action="logout.php" method="get">
    <input type="submit" value="Signout">
</form>
<div id="main">
<div id="container">
    <form method="post" id="form_edit">
    <table id="table_edit">
        <tr>
            <th></th>
            <th>Name</th>
            <th>Link</th>
        </tr>
        <tr>
            <td>Current</td>
            <td><?php echo $name ?></td>
            <td><?php echo $link ?></td>
        </tr>
        <tr>
            <td>Save as</td>
            <td><input type="text" name="bookmark_name" value="<?php echo $name ?>"></td>
            <td><input type="text" name="bookmark_address" value="<?php echo $link ?>"></td>
        </tr>
    </table>
    <button id='btn_edit_save' type="submit" name="bookmark_update">Save</button>
    </form>

    <form id='btn_edit_cancel' action="home.php" method="get">
        <input  type="submit" value="Cancel">
    </form>
    </div>
</div>  
</body>
</html>
