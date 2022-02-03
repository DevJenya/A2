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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <title>Document</title>
</head>
<body>
<h1 id="logo">Bmarker</h1>
<form id="signout" action="logout.php" method="get">
    <input type="submit" value="Signout">
</form>
<div id="main">
<div id="container">
    <form method="post" id="form_edit" action="addbookmark.php">
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
            <td><input type="text" name="bookmark_name" value="<?php echo $name ?>" id="edit_name"></td>
            <td><input type="text" name="bookmark_address" value="<?php echo $link ?>" id="edit_url"></td>
        </tr>
    </table>
    <button id='btn_edit_save' type="submit" name="bookmark_update">Save</button>
    </form>

    <form id='btn_edit_cancel' action="home.php" method="get">
        <input  type="submit" value="Cancel">
    </form>
    </div>
</div>  

<script>
$("#btn_edit_save").click(function(e){
    e.preventDefault();

    if($("#edit_name").val() == "" || $("#edit_url").val() == ""){
        alert("Enter both name and url data before saving");
        return;
    }

    let user_entered_url = $("#edit_url").val();
    console.log(user_entered_url);
  
    $.ajax({
        url:      "checkurl.php",
        data: {url: user_entered_url},
        type:     'POST',
    }).done(function(data) {
        //1 - url active, 0 - not active
        if(data == 1){
               $("#form_edit").unbind('submit').submit()
        } else {
            alert("URL entered is not active");
        }
    }); 
});
    
</script>
</body>
</html>
