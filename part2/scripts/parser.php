<?php
include("connection.php");
session_start();

$course_id = $_GET['course_id'];
$unit = $_GET['unit'];
$lesson_number = $_GET['lesson_number'];




$query = "select * from course_content 
             where course_id='$course_id' and unit = $unit and lesson_number = $lesson_number";
             
$result = mysqli_query($connection, $query);
if($result && mysqli_num_rows($result)){
    $str = mysqli_fetch_assoc($result)["content"];
    
    $xml=simplexml_load_string($str) or die("Error: Cannot create object");
    $json_str = json_encode($xml);
    $lesson_materials = json_decode($json_str);
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
<h1 id="logo">Best University</h1>
    <form id="signout" action="logout_lesson.php" method="get">
        <input type="submit" value="Signout" class="top_btn">
    </form>


    <a href="../home.html" class="nav_btn top_btn">Main page</a>

    <div id="main">

        <div class="content" id="content">
            <h4>Course id: <?php echo $course_id ?></h4>
            <h3>Unit: <?php echo $unit ?></h3>
            <h3>Lesson: <?php echo $lesson_materials->lesson_title ?></h3>
            

            <!-- print lesson body -->
            <?php for ($i = 0; $i < sizeof($lesson_materials->lesson_content->content_entry); $i++) {
                    //for each section print section title
                    echo "<hr> <h4>".$lesson_materials->lesson_content->content_entry[$i]->section_title."</h4>";

                    //check if only paragraph exists and print it
                    if(is_string($lesson_materials->lesson_content->content_entry[$i]->text->paragraph)){
                        if(isset($lesson_materials->lesson_content->content_entry[$i]->text->paragraph->list)){
                            //for each list item
                            echo "<ul>";
                            for ($j = 0; $j < sizeof($lesson_materials->lesson_content->content_entry[$i]->text->paragraph->list->list_item)
                            ; $j++) {
                                echo "<li>".$lesson_materials->lesson_content->content_entry[$i]->text->paragraph->list->list_item[$j]."</li>";
                            }
                            echo "</ul>";      
                        } else {
                        echo "<p>".$lesson_materials->lesson_content->content_entry[$i]->text->paragraph."</p>";
                        }
                    } else { // else there must be more than one paragraph, iterate through them
                        for ($k = 0; $k < sizeof($lesson_materials->lesson_content->content_entry[$i]->text->paragraph); $k++) {
                            //check if each paragraph is a string, print strings, iterate through lists and print them
                            if(is_string($lesson_materials->lesson_content->content_entry[$i]->text->paragraph[$k])){
                                echo "<p>".$lesson_materials->lesson_content->content_entry[$i]->text->paragraph[$k]."</p>";
                            } else { //its a list
                                if(isset($lesson_materials->lesson_content->content_entry[$i]->text->paragraph[$k]->list)){
                                    //for each list item
                                    echo "<ul>";
                                    for ($j = 0; $j < sizeof($lesson_materials->lesson_content->content_entry[$i]->text->paragraph[$k]->list->list_item)
                                    ; $j++) {
                                        echo "<li>".$lesson_materials->lesson_content->content_entry[$i]->text->paragraph[$k]->list->list_item[$j]."</li>";
                                    }
                                    echo "</ul>";      
                                }
                            }
                        }
                    }
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