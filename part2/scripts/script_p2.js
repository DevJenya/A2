
const login_user_name = document.getElementById("login_user_name");
const login_pass = document.getElementById("login_pass");
const btn_login_submit = document.getElementById("btn_login_submit");
const LOGIN_WINDOW = document.getElementById("login_window");
const BTN_CLOSE = document.getElementById("btn_close");
const BTN_LOGIN = document.getElementById("btn_login");

btn_login_submit.addEventListener('click', print_stuff);
if(BTN_LOGIN){BTN_LOGIN.addEventListener('click', showLogin);}

if(BTN_CLOSE){BTN_CLOSE.addEventListener('click', closeLogin);}


function print_stuff(){
    LOGIN_WINDOW.style.display = "flex";
    alert("HERE");
    console.log(login_user_name.value);
}

function showLogin(){
    LOGIN_WINDOW.style.display = "flex";
    BTN_LOGIN.style.display = "none";
}

function closeLogin(){
    LOGIN_WINDOW.style.display = "none";
    BTN_LOGIN.style.display = "flex";
}