<?php 

 include("connection.php");

function logout(){

    if(isset($_SESSION['id']))
    {
        unset($_SESSION['id']);
    }

    header("Location: index.php");
    die;
}

function get_user_data($connection){

    if(isset($_SESSION['id']))
	{
        $id = $_SESSION['id'];
        $query = "select * from users where id = '$id' limit 1";

        $result = mysqli_query($connection,$query);
 
		if($result && mysqli_num_rows($result) > 0)
		{
			$user_data = mysqli_fetch_assoc($result);
            return $user_data;
        } 
    } 
}



?>

