<?php 

    session_start();

    include("connection.php");

    //check if the form has been posted
    if($_SERVER['REQUEST_METHOD'] == "POST"){
        
        //store posted information into variables 
        $user_name = $_POST['user_name'];
        $password = $_POST['password'];

        if(!empty($user_name) && !empty($password))
        {
            //save to database
			$query = "insert into users (user_name,password) values ('$user_name','$password')";

			mysqli_query($connection, $query);

			header("Location: index.php");
			die;
        }
    } 

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../shared/style.css">
    <title>Assignment 2 part 1</title>
</head>
<body>
<h1 id="logo">Bmarker</h1>
    <div id="main">
    <div class='auth_window'>
        <form method="post">
            <span id="box_label">Create Account</span>

            <input type="text" name="user_name" placeholder="username">
            <input type="password" name="password" placeholder="password">
            <br>
            <button type="submit" >Sign up</button>
            <br>
            <a href="index.php">Login here</a>
        </form>
    </div>
    </div>
</body>
</html>