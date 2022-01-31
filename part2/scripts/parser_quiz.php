<?php
include("connection.php");
session_start();

$course_id = $_GET['course_id'];
$unit = $_GET['unit'];

$query = "select * from quiz_data 
             where course_id='$course_id' and unit = $unit";
             
$result = mysqli_query($connection, $query);
if($result && mysqli_num_rows($result)){
    $str = mysqli_fetch_assoc($result)["content"];

    $xml=simplexml_load_string($str) or die("Error: Cannot create object");
    $json_str = json_encode($xml);
    $lesson_materials = json_decode($json_str);
    //echo $lesson_materials;
}   
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../shared/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <title>Document</title>
</head>
<body>

    <form id="signout" action="logout_lesson.php" method="get">
        <input type="submit" value="Signout" class="top_btn">
    </form>


    <a href="../home.html" class="nav_btn top_btn">Main page</a>

    <div id="main">

        <div class="content" id="content">
            <h3>Course id: <?php echo $course_id ?></h3>
            <h3>Unit: <?php echo $unit ?></h3>

            <!-- print lesson body -->
            <?php for ($i = 0; $i < sizeof($lesson_materials->lesson_content->content_entry); $i++) {
                    //for each section print section title

                        echo "<h3>Q".($i+1).".  ".$lesson_materials->lesson_content->content_entry[$i]->question."</h3>";
                                
                                    echo "<ul>";
                                    for ($j = 0; $j < sizeof($lesson_materials->lesson_content->content_entry[$i]->answer)
                                    ; $j++) {
                                        echo "<li>".$lesson_materials->lesson_content->content_entry[$i]->answer[$j]."</li>";
                                    }
                                    echo "</ul>";          
                            }
                ?>

        </div>



    </div>
    

<script src="script_p2.js"></script>

<script>

    window.onload = function(){
        //createGUI(<?php echo $json_str ?>);
    }
</script>
</body>
</html>