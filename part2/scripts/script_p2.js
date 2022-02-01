
var userProvidedAnswers = [];

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

//used in index.html login
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




function show_courses_available(){
 
    //request of course list accessible to user
    $.ajax({
        url : "scripts/check_user_accessible_content.php",
    }).done(function(data) {
        let available_courses = JSON.parse(data);
        console.log(available_courses);  
        
        //for each available course
        for(let i = 0; i < available_courses.length; i++){
            let course = available_courses[i].course_id;
            let user_id = available_courses[i].user_id;

            
            show_quizes_available(course);

            //create a div for each course
            let div_course_data = document.createElement('div');
            div_course_data.id = "div_course_" + course;
            $(div_course_data).addClass("course_block_div_home_page");
            $("#user_content").append(div_course_data);

            //print course name on top of the div
            div_course_data.innerHTML = ("<h3>" + course + "</h3>");

            //request into course structure database to see what 
            //components of the course exist and create link buttons to them
            $.ajax({
                url : "scripts/get_course_internals.php",
                data: {course_id: course}
            }).done(function(data) {
                console.log(data);
                let course_component = JSON.parse(data);
                
                let btn_array = [];

                $.each(course_component, function(i,val){
                    btn_array[i] = document.createElement('input');
                    btn_array[i].setAttribute('type', 'submit');
       
                });

                //for each course lesson display below 
                $.each(course_component, function(i, val){
                    btn_array[i].id = "form_btn_" + i;
                    let form = document.createElement('form');
             
                    form.id = "form_course_" + course;
                    form.action = "scripts/parser.php"
                    form.method = "GET";
                    btn_array[i].value = ("Unit: "
                    + val.unit + " lesson: " + val.lesson);

                    //add information hidden fields to form
                    let c_id = document.createElement('input');
                    c_id.value  = course;
                    c_id.name  = "course_id";
                    c_id.type = "hidden";
                    $(form).append(c_id);
                    let un = document.createElement('input');
                    un.value = val.unit;
                    un.name = "unit";
                    un.type = "hidden";
                    $(form).append(un);
                    let les = document.createElement('input');
                    les.name = "lesson_number";
                    les.value = val.lesson;
                    les.type = "hidden";
                    $(form).append(les);

                    $(form).append(btn_array[i]);
                    $("#"+div_course_data.id).append(form);
                    
                });
            });
        }
    });
}

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
                    $("#content").append("<ul>");
                    for(let item in data.lesson_content.content_entry[i].text.paragraph[k].list.list_item)
                    {
                        $("#content")
                        .append("<li>" + 
                        data.lesson_content.content_entry[i].text.paragraph[k].list.list_item[item] + "</li>");
                    }

                    $("#content").append("</ul>");
                } else { // if no list inside print the text thats inside 
                    $("#content").append
                    ("<p>" + data.lesson_content.content_entry[i].text.paragraph[k] + "</p>");
                }
            }
        } else {
            $("#content").append("<p>" + data.lesson_content.content_entry[i].text.paragraph + "</p>");
        }

    }
}


function show_quizes_available(course){
            //create a div for each course
            let div_course_data = document.createElement('div');
            div_course_data.id = "div_quiz_" + course;
            $(div_course_data).addClass("course_block_div_home_page");
            $("#user_quizes").append(div_course_data);
            //print course name on top of the div
            div_course_data.innerHTML = ("<h3>" + course + "</h3>");

            //request into course structure database to see what 
            //components of the course exist and create link buttons to them
            $.ajax({
                url : "scripts/get_quiz_internals.php",
                data: {course_id: course}
            }).done(function(data) {
                console.log(data);
                let quiz_component = JSON.parse(data);
                console.log(quiz_component);

                let btn_array = [];

                $.each(quiz_component, function(i,val){
                    btn_array[i] = document.createElement('input');
                    btn_array[i].setAttribute('type', 'submit');
       
                });

                //for each course lesson display below 
                $.each(quiz_component, function(i, val){
                    btn_array[i].id = "form_btn_" + i;
                    let form = document.createElement('form');
             
                    form.id = "form_course_" + course;
                    form.action = "scripts/parser_quiz.php"
                    form.method = "GET";
                    btn_array[i].value = ("Unit: " + val.unit + " quiz");

                    //add information hidden fields to form
                    let c_id = document.createElement('input');
                    c_id.value  = course;
                    c_id.name  = "course_id";
                    c_id.type = "hidden";
                    $(form).append(c_id);
                    let un = document.createElement('input');
                    un.value = val.unit;
                    un.name = "unit";
                    un.type = "hidden";
                    $(form).append(un);

                    $(form).append(btn_array[i]);
                    $("#"+div_course_data.id).append(form);
                    
                });
            });
        }


function register_answers(json_obj){
    let emptyAnswerexists = false;
    console.log(json_obj.lesson_content.content_entry[0].question);
    console.log(json_obj);
    $('#content ul').each(function(i)
    {
        $("li",this).each(function(k){
            this.addEventListener("click", e => store_answer(e,i));
        });
    });

    $("#quiz_submit").click(function(){
        console.log(userProvidedAnswers);
        console.log(userProvidedAnswers.length);

        if(userProvidedAnswers.length < json_obj.lesson_content.content_entry.length){
            alert("Please, answer all questions");
            return;
        }

       for(let pos = 0; pos < userProvidedAnswers.length; pos++){
            if(userProvidedAnswers[pos] == null){
                alert("Please, provide answer for question: " + (pos+1));
                return;
            }  
        }
       
        $('#content').html(displayResults(json_obj.lesson_content.content_entry.length, json_obj));        
    });
}

//funciton checks if the answer the user clicked on is correct
//it checks the submitted answer against expected correct answer
function store_answer(event, index)
{
	//get user answer and store it in the array
	userProvidedAnswers[index] = event.target.innerText;
    $(event.target).siblings().css('background-color', 'white');
    $(event.target).css('background-color', 'rgb(255, 146, 106)');
}

// function builds results string and returns it
function displayResults(questions_length, json_obj){
	let result_string = "<p>Your score is: " + (score_answers(json_obj)/questions_length*100).toFixed(2) + "%</p>";
	let q_num;

	for(let i = 0; i < questions_length; i++){
		q_num = i+1;
		result_string += "<span class='result_display_block'>";
		result_string += "<h5>Question: " + q_num + "</h5>";
		result_string += "<h4>" + json_obj.lesson_content.content_entry[i].question + "</h4>";
		result_string += "<p>You answered: " + userProvidedAnswers[i] + "</p>";
		result_string += "<p>Correct answer: " + json_obj.lesson_content.content_entry[i].correctAnswer + "</p>";
		result_string += "</span>";
	}
	return result_string;
}

function score_answers(json_obj){
    let score = 0;

    for(let i = 0; i < json_obj.lesson_content.content_entry.length; i++){
        if(userProvidedAnswers[i] == json_obj.lesson_content.content_entry[i].correctAnswer){
            score++;
        }
    }

    return score;
}