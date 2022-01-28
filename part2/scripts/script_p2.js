

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


$("#btn_user_content").click(function(){
    $.ajax({
        url : "scripts/check_user_accessible_content.php",
    }).done(function(data) {
        let x = JSON.parse(data);
        console.log(x);  

        for(let i = 0; i < x.length; i++){
            let course = x[i].course_id;
            let user_id = x[i].user_id;

            let button = document.createElement('input');
            button.setAttribute('type', 'button');
            button.value = (course + " user_id:" + user_id);
            $("#user_content").append(button);
            button.addEventListener('click', function(){
                $.ajax({
                    url : "scripts/parser.php",
                    data: {course_id: course}
                }).done(function(data) {
                    console.log(data);
                    let x = JSON.parse(data);
                    console.log(x); 
                    $("#content").html(""); 
                    createGUI(x);
                });
            })
        }
    });
});

function createGUI(data){

    $("#content").append("<h3>Course id: " + data.course_id + "</h3>");
    $("#content").append("<h3>Course id: " + data.unit_number + "</h3>");
    $("#content").append("<h3>Lesson: " + data.lesson_title + "</h3>");

   for(let i = 0; i < data.lesson_content.content_entry.length; i++){
        $("#content").append("<p>" + data.lesson_content.content_entry[i].section_title + "</p>");

        console.log(typeof data.lesson_content.content_entry[i].text.paragraph);
        // for(let j = 0; j < data.lesson_content.content_entry[i].text.length; j++){
        //     $("#content").append("<p>TEXT: " + data.lesson_content.content_entry[i].text[j] + "</p>");
        // };
    

        //check that there are more than one paragraph, itterate through each else print 1 paragraph
        if(typeof data.lesson_content.content_entry[i].text.paragraph !== 'string'){
            for(let k = 0; k < data.lesson_content.content_entry[i].text.paragraph.length; k++){
                
                //if this paragraph has a list,print the list, else print the para text
                if(typeof data.lesson_content.content_entry[i].text.paragraph[k].list != 'undefined'){    
                    $("#content")
                        .append("<ul>");
                    for(let item in data.lesson_content.content_entry[i].text.paragraph[k].list.list_item)
                    {
                        $("#content")
                        .append("<li>" + 
                        data.lesson_content.content_entry[i].text.paragraph[k].list.list_item[item] + "</li>");
                    }

                    $("#content")
                        .append("</ul>");
                } else { // if no list inside print the text thats inside 
                    $("#content").append
                    ("<p>" + data.lesson_content.content_entry[i].text.paragraph[k] + "</p>");
                }
            }
        } else {
            $("#content").append("<p>" + data.lesson_content.content_entry[i].text.paragraph + "</p>");
        }

    };
}