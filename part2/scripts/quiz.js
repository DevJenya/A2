






/**
 * Assignment 1
 * Course: COMP 466
 * Student: Evgeny Zaev
 * Student #: 3270903
 * Date:18 Jan 2022
 * 
 */
//get DOM objects
var start_btn = document.getElementById("quiz_btn_start");
var question_field = document.getElementById("question");
var question_answer_container = document.getElementById("question_answer_container");
const btn_quiz_select_1 = document.getElementById("btn_quiz_select_1");
const btn_quiz_select_2 = document.getElementById("btn_quiz_select_2");
const btn_quiz_select_3 = document.getElementById("btn_quiz_select_3");
const quiz_btn_submit = document.getElementById("quiz_btn_submit");
const quiz_btn_finish = document.getElementById("quiz_btn_finish");
const results_list = document.getElementById("results_list");
const quiestion_number = document.getElementById("quiestion_number");



var xml; 
var questions_object_array = []; //stores parsed xml question and answers into question objects
var questions_length;
var counter = 0;
var ul;
var score = 0;
var ableToSelectAnswer = true;
var userProvidedAnswers = [];


//register event listeners
start_btn.addEventListener("click", runQuiz); //quiz start btn
//load quiz 1 questions 
btn_quiz_select_1.addEventListener('click', function() {
	loadQuizData("questions_data1.xml");
	start_btn.style.display = "block";
	clearDataVariables();
});
//load quiz 2 questions 
btn_quiz_select_2.addEventListener('click', function() {
	loadQuizData("questions_data2.xml");
	start_btn.style.display = "block";
	clearDataVariables();
});
//load quiz 3 questions 
btn_quiz_select_3.addEventListener('click', function() {
	loadQuizData("questions_data3.xml");
	start_btn.style.display = "block";
	clearDataVariables();
});

//Event listener for submit button shown at the end of the quiz
quiz_btn_submit.addEventListener('click', function(){
	results_list.innerHTML = displayResults();
	quiz_btn_submit.style.display = 'none';
	quiz_btn_finish.style.display = "block";
});

//Event listener for finish button shown at the end of the quiz review
quiz_btn_finish.addEventListener("click", function(){
	results_list.innerHTML = "";
	quiz_btn_finish.style.display = "none";
	question_field.innerHTML = "Please, choose the quiz above";
});

//function converts XML data and stores them in an array of question objects
function runQuiz () {
	start_btn.style.display = 'none'; //hide start button
	questions_object_array = storeXMLintoArray(xml);
	questions_length = questions_object_array.length; //get the question bank length
	populateQuestion(); //display the first question
} 

//reset data after quiz
function clearDataVariables(){
	xml = null; 
	questions_object_array = [];
	counter = 0;
	score = 0;
	question_field.innerHTML = "";
	if(ul)ul.innerHTML ="";
	results_list.innerHTML = "";
	quiz_btn_finish.style.display = "none";
}


//display next question and answers to user
function populateQuestion(){
	
	//if questions left in the question bank, show next
	if(counter < questions_length){
		//allow to answer, sets false in checkIfAnswerIsCorrect
		ableToSelectAnswer = true; 

		//change background to default, 
		//from green/red displayed in response to answer selected by user
		document.getElementById("quiz").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
		question_field.innerText = questions_object_array[counter].question; //show question
		let q_num = counter + 1; //used to show question number
		quiestion_number.innerHTML = "Question " + q_num + "/" + questions_length; //question #/total Qs

		//if ul already created in the previous question, remove it and create new for the currrent Quest.
		if(ul)
		{
			ul.parentNode.removeChild(ul);
		}
		
		ul = document.createElement("ul"); 
		
		//go through the answer list and add each to ul
		for(var i = 0; i < questions_object_array[counter].answers.length; i++)
		{
			var li = document.createElement("li");
			li.setAttribute("class", "quiz_list_item");
			li.innerText = questions_object_array[counter].answers[i];
			ul.appendChild(li);
			registerAnswerListener(li);
		}
		question_answer_container.appendChild(ul);
		counter++; 
	} else {
		//change background to default, 
		//from green/red displayed in response to answer selected by user
		document.getElementById("quiz").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
		question_field.innerHTML = ""; //clear question
		quiz_btn_submit.style.display = "block"; //show submit button
		quiestion_number.style.display = "none"; //hide question count field
		ul.innerHTML =""; //clear answers
	}
}

// register answer click listeners 
function registerAnswerListener(answer_option)
{
	answer_option.addEventListener("click", e => checkIfAnswerIsCorrect(e));
}

//function loads data in string form from file
//stores in questions_data_text var
//calls parseIntoXML function, stores XML in global xml var
function loadQuizData(filename) {
		fetch(filename)
		.then(response => response.text())
		.then(data => {
			xml = parseIntoXML(data);	 
		});			
}

// parse string into xml
function parseIntoXML(strintToParse){
	let parser = new DOMParser();
	let xml = parser.parseFromString(strintToParse, "application/xml");
	return xml;
}

// Definition for question class used to store questions parsed from XML
class Question {
	constructor (question, answerArray, correct_answer) {
		this.correct_answer = correct_answer;
		this.question = question;
		this.answers = answerArray;
	}
}


function storeXMLintoArray(XMLfile){
	//get individual question
	let q_temp = XMLfile.getElementsByTagName("individual"); 
	let temp_q_obj_arr = [];
	let q;
	
	for(let j = 0; j < q_temp.length; j++)
	{	
		var temp_answers_array = []; //stores answers for each question object
		// for each question get answers and push them to temp array
		for(let i = 0; i < q_temp[j].getElementsByTagName("answer").length; i++)
		{
			temp_answers_array.push(q_temp[j].getElementsByTagName("answer")[i].childNodes[0].nodeValue);
		}

		//create the question object per one question 
		q = new Question (q_temp[j].getElementsByTagName("question")[0].childNodes[0].nodeValue, 
			temp_answers_array, q_temp[j].getElementsByTagName("correctAnswer")[0].childNodes[0].nodeValue);
		temp_q_obj_arr.push(q); // push it onto array
	}
	return temp_q_obj_arr;
} 

//funciton checks if the answer the user clicked on is correct
//it checks the submitted answer against expected correct answer
function checkIfAnswerIsCorrect(event)
{
	//get user answer and store it in the array
	userProvidedAnswers[counter-1] = event.target.innerText;
	// if user hasnt already clicked one answer for the question
	if(ableToSelectAnswer){
		ableToSelectAnswer = false;
		// if the user answer == correct answer
		if(questions_object_array[counter-1].correct_answer == event.target.innerText)
		{
			// set background green
			document.getElementById("quiz").style.backgroundColor = "rgba(12, 163, 7, 0.5)"; 
			score++;
			setTimeout((populateQuestion), 1000); //show next question
		}
		else
		{
			// set background red
			document.getElementById("quiz").style.backgroundColor = "rgba(235, 64, 52, 0.5)";
			setTimeout((populateQuestion), 1000); //show next question
		}
	}
}

// function builds results string and returns it
function displayResults(){
	let result_string = "<p>Your score is: " + score/questions_length*100 + "%</p><br>";
	let q_num;

	for(let i = 0; i < questions_length; i++){
		q_num = i+1;
		result_string += "<span class='result_display_block'>";
		result_string += "<h5>Question: " + q_num + "</h5>";
		result_string += "<h4>" + questions_object_array[i].question + "</h4>";
		result_string += "<p>You answered: " + userProvidedAnswers[i] + "</p>";
		result_string += "<p>Correct answer: " + questions_object_array[i].correct_answer + "</p>";
		result_string += "</span>";
	}

	return result_string;
}

