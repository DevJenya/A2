<?php
// Copied from : https://www.geeksforgeeks.org/how-to-check-the-existence-of-url-in-php/
// accessed on 2 Feb 2022
// By Evgeny Zaev
// author: aman neekhara
//  

// Initialize an URL to the variable
$url = $_POST['url'];;
  
// Use get_headers() function
$headers = @get_headers($url);
  
// Use condition to check the existence of URL
if($headers && strpos( $headers[0], '200')) {
    $status = "1"; //exists
}
else {
    $status = "0"; //doesnt exist
}
  
// Display result
echo($status);
  
?>