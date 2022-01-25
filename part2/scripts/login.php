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



?>