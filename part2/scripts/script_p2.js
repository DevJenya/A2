

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
        console.log(JSON.parse(data));  
        $("#main h1").html();
    });
});

