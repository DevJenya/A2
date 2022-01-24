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

     //check if the form has been posted
     if($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST["bookmark_add"])){
        
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
    } 
  
    $query_user_links = "select bookmark_id, bookmark_name,bookmark_link 
        from bookmarks where user_id = '$id'";
    $result = mysqli_query($connection, $query_user_links);

    ?>

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../shared/style.css">
        <title>Document</title>
    </head>
    <body>

<form id="signout" action="logout.php" method="get">
    <input type="submit" value="Signout">
</form>

    <div id='bookmark_add'>
        <form method="post">
            <span id="box_label">Create Bookmark</span>

            <input type="text" name="bookmark_name">
            <input type="text" name="bookmark_address">

            <button type="submit" name="bookmark_add">Add</button>
        </form>
    </div>

    <table id="table">
    <tr>
    <th>Name</th>
    <th>Link</th>
  </tr>
    <?php 
        while($row = mysqli_fetch_assoc($result)){
            
            echo "<td>$row[bookmark_name]</td>";
            echo "<td><a href='http://$row[bookmark_link]'>
            $row[bookmark_link]</a></td>";
            echo '<form method="post" action="delete.php">';
            echo "<td><input type='submit' name='bookmark_add'>remove</input></td>";
            echo '</form>';
            echo "<td><a href=\"delete.php?id=".$row['bookmark_id']."\">Delete</a></td></tr>";
        }
        ?>
    </table>
    

   


    <!-- <script src="../shared/script.js"></script>  -->
    </body>
    </html>