

//onclick handler for clicking login button
$("#btn_login").click(function(){
    $("#btn_login").hide();
    $("#login_window").fadeIn(100).css('display', 'flex');
});

//onclick handler for closing login window
$("#btn_close").click(function(){
    $("#btn_login").show();
    $("#login_window").fadeOut(100);
});

//login AJAX call to login.php
$("#form_login").submit(function(e){
    e.preventDefault();
    $.ajax({
        url : $('#form_login').attr('action'),
        data: {user_name: $("#login_user_name").val(),password: $("#login_pass").val()}
    }).done(function(data) {
        if(data == 1){
            window.location.href="home.html";
        }else{
            alert("Please, enter correct login information");
        }   
    });
});

$("#slide").click(function(){
    $.ajax({
        url : "scripts/parser.php",
    }).done(function(data) {
        let x = JSON.parse(data);
        console.log(x);  
        createGUI(x);
    });
});

function createGUI(data){

    $("#content").append("<h3>Course id: " + data.course_id + "</h3>");
    $("#content").append("<h3>Course id: " + data.unit_number + "</h3>");
    $("#content").append("<h3>Lesson: " + data.lesson_title + "</h3>");

   for(let i = 0; i < data.lesson_content.content_entry.length; i++){
        $("#content").append("<p>Section title: " + data.lesson_content.content_entry[i].section_title + "</p>");

        alert(data.lesson_content.content_entry[i].text.length);
        for(let j = 0; j < data.lesson_content.content_entry[i].text.length; j++){
            $("#content").append("<p>TEXT: " + data.lesson_content.content_entry[i].text[j] + "</p>");
        };
    
    };
}