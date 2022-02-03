const BTN_LOGIN = document.getElementById("btn_login");
const LOGIN_WINDOW = document.getElementById("login_window");
const BTN_CLOSE = document.getElementById("btn_close");
const BTNS_REMOVE_LINK = document.getElementsByClassName("btn_link_remove");

if(BTN_LOGIN){BTN_LOGIN.addEventListener('click', showLogin);}

if(BTN_CLOSE){BTN_CLOSE.addEventListener('click', closeLogin);}


window.addEventListener('load', function(){
    console.log(BTNS_REMOVE_LINK);
    btns_remove_addListeners();
});


function showLogin(){
    LOGIN_WINDOW.style.display = "flex";
    BTN_LOGIN.style.display = "none";
}

function closeLogin(){
    LOGIN_WINDOW.style.display = "none";
    BTN_LOGIN.style.display = "flex";
}

function deleteRow(id){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "delete.php?id=" + id, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
      // Response
      var response = this.responseText; 
   }
        };
    xhttp.send();
    document.getElementById("btn_remove_"+id).parentElement.parentElement.remove();
}

$("#btn_add_bookmark").click(function(e){
    e.preventDefault();

    if($("#user_entered_url_name").val() == "" || $("#user_entered_url").val() == ""){
        alert("Enter both name and url data before adding");
        return;
    }

    let user_entered_url = $("#user_entered_url").val();
    console.log(user_entered_url);
  
    $.ajax({
        url:      "../part1/checkurl.php",
        data: {url: user_entered_url},
        type:     'POST',
    }).done(function(data) {
        console.log(data);
        
        if(data == 1){
            console.log(data);
                $("#b_add_form").submit()
        } else {
            alert("Please, enter correct name and url data before adding");
        }
    }); 
});

function btns_remove_addListeners(){
    for(let i = 0; i < BTNS_REMOVE_LINK.length; i++){
        BTNS_REMOVE_LINK[i].addEventListener('click', deleteRow(BTNS_REMOVE_LINK[i].getAttribute("name")));
    }
}

// Copied from : https://javascript.tutorialink.com/checking-if-a-url-is-broken-in-javascript/
// accessed on 2 Feb 2022
// By Evgeny Zaev
// author: unknown
//
function UrlExists(url, cb){
    $.ajax({
        url:      url,
        dataType: 'text',
        type:     'POST',
        complete:  function(xhr){
            if(typeof cb === 'function')
               cb.apply(this, [xhr.status]);
        }
    });
}

