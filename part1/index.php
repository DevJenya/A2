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
            //build query 
            $query = "select * from users 
            where user_name = '$user_name' limit 1";
            $result = mysqli_query($connection, $query);

            if($result && mysqli_num_rows($result)){
            
                $user_data = mysqli_fetch_assoc($result);

                if($user_data['password'] === $password){
                    $_SESSION['id'] = $user_data['id'];
                    header("Location: home.php");
                    die;
                } 
            }
        } 
    } 

    $query = "select bookmark_name, bookmark_link from bookmarks group by bookmark_link order by count(bookmark_link) desc LIMIT 10;";

		$result = mysqli_query($connection, $query);


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

    
    <button id="btn_login">Login</button>
    <div id="container"> 
    <h3>TOP 10 bookmarked links:</h3>

    <table id="table">
    <tr>
    <th>Name</th>
    <th>Link</th>
  </tr>
    <?php 
        while($row = mysqli_fetch_assoc($result)){
            echo "<tr><td>$row[bookmark_name]</td>";
            echo "<td><a href='http://$row[bookmark_link]\'>
            $row[bookmark_link]</a></td></tr>";
            }
        ?>
    </table>
    </div>
    <div class='auth_window' id="login_window">
        <div class="auth_window_header">
            <span id="box_label">Login</span>
            <button id="btn_close">&#10006</button>
        </div>
        <form method="POST">
            <input type="text" name="user_name">
            <input type="password" name="password">
            <button class="btn_submit"  type="submit" name="form1">Login</button>

            <a href="signup.php">Sign up here</a>
        </form>
    </div>
    </div>

    <script src="../shared/script.js"></script>
</body>
</html>