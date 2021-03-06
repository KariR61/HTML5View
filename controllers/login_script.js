$(document).ready(function(){

    $("#login").click(loginHandler);
    $("#register").click(registerHandler);
    
});

/*
*This function is called when login button is pressed
*/
function loginHandler(event){
    
    var requestData = {
    
        username:$("#username").val(),
        password:$("#password").val()
    }
    
    localStorage['username'] = $("#username").val();
    sessionStorage['user'] = $("#username").val();
    
    //Send login request to server
    $.ajax({
        method:'POST',
        url:'http://localhost:3000/friends/login',
        data:requestData,
        dataType:'json'
        
    }).done(loginResponseHandler);
}
/*
*this function is called when register button is pressed
*/
function registerHandler(event){
    
        console.log("registerhandler called");
    
        var requestData = {
    
        username:$("#username").val(),
        password:$("#password").val()
    }
    //Send login request to server
    $.ajax({
        method:'POST',
        url:'http://localhost:3000/friends/register',
        data:requestData,
        dataType:'json'
        
    }).done(registerResponseHandler);
}

/*
*This function is called when register response arrives in some point of time
*/

function registerResponseHandler(data){
    
    $("#status").text(data.status);
}

function loginResponseHandler(data){
    
    //if login status was ok
    if(data.status === "OK"){
        //ask browser to load persons.html file from node server
        window.location.href='http://localhost:3000/persons.html';
        
    }else{
        $("#status").text(data.status);
    }
    
}

/*
function renderPersonView(data){

    console.log(data);
    $("html").html(data);
}
*/






