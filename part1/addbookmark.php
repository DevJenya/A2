<?php 

    session_start();

    include("connection.php");
    include("functions.php");

    if (!isset($_SESSION["id"]))
   {
      header("location: index.php");
   }

    $user_data = get_user_data($connection);
    $id = $user_data['id'];

        
        //store posted information into variables 
        $bookmark_name = $_POST['bookmark_name'];
        $bookmark_address = $_POST['bookmark_address'];

        if(!empty($bookmark_name) && !empty($bookmark_address))
        {
            //save to database
			$query = "insert into bookmarks (user_id,bookmark_name,bookmark_link) 
            values ('$id','$bookmark_name','$bookmark_address')";

			mysqli_query($connection, $query);

            unset($_POST['bookmark_add']);
           
        }

        header("Location: home.php");
    ?>