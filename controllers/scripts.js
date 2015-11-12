//"use strict";
console.log("Here we go!!");

//This variable is shown to every function
var g_person_data;

//Wait document ready event
$(document).ready(function(){
    console.log("jquery onload triggered");
    
    $("#search").click(function(){
      
        var text =$("#search_text").val();
        $.ajax({
        
            method:"GET",
            url:"http://localhost:3000/persons/nimi=" + text,
        }).done(function(data){
    
            console.log(data);
            $("tbody").children().remove();
            for(i=0; i < data.length; i++){
            
            var html = "<tr>" +
                        "<td>" + data[i].name + "</td>" +
                        "<td>" + data[i].address + "</td>" +
                        "<td>" + data[i].age + "</td>" +
                        "<td><input type='button' id=" + data[i]._id + " value='Modify'/></td>" +
                        "</tr>";
            
        
            $(html).appendTo("tbody");
        }
        });
    });
    
    
    $("nav").css("background-color","lightblue")
    .css("padding","20px").css("border-radius","8px");
    
    $(".about").html("<b>New text</b>");
    $("[data-dummy]").html("<p>Hello World</p>");
    
    var setting = {
     
        method:"GET",
        url:"http://localhost:3000/friends/username=" + localStorage['username'],
        dataType:"json",
    }
    
    $.ajax(setting).done(function(data){
        
        console.log(data);
        
        //Get all keys (attribute names) from json object
        //console.log(Object.keys(data[0]));
        
        
        // Check that there are elements in array
        if(data.length > 0) {
            
           //Creates header also dynamically
            var headers = Object.keys(data[0]);
            
            var row = $("<tr></tr>");
            for(var i = 1; i < headers.length; i++){
                //create header and add it to row
                $("<th>" + headers[i] + "</th>").appendTo(row);
            }
            //add row to thead element
            $(row).appendTo("thead");
        }
        
        //Create table content dynamically
        for(i=0; i < data.length; i++){
            
            var html = "<tr>" +
                        "<td>" + data[i].name + "</td>" +
                        "<td>" + data[i].address + "</td>" +
                        "<td>" + data[i].age + "</td>" +
                        "<td><input type='button' id=" + data[i]._id + " value='Modify'/></td>" +
                        "</tr>";
            
        
            $(html).appendTo("tbody");
        }
        
        
    //Get all elements from DOM where element has attribute 'type' value 'button.
    //Then add event handler for click event for each of them.
    $("[type=button]").click(function(click_data){
        
        for(var i = 0; i < data.length; i++){
            
            //check if id from button matches one of person id
            if(click_data.currentTarget.id == data[i]._id)
            {
                buildModifyUI(data[i]);
                break;
            }
            
            
        }
        
        });
    });
    
    
    
});

/**
  *Creates a modify view for our application
*/
function buildModifyUI(person_data){
   
    var html = "<input id='name' type= 'text' value='" + person_data.name + "'/>";
    
    html +="<input id='address' type id='text' value='" + person_data.address + "'/>";
    html +="<input id='age' type='text' value='" + person_data.age + "'/>";
    html +="<input type='button' value='Update' id='update'/>";
    html +="<input type='button' value='Delete' id='delete'/>";
    
    $("body").html(html);
    
    $("#delete").click(function(){
        
        $.ajax({
        
            method:'DELETE',
            url:'http://localhost:3000/persons/id=' + person_data._id
        }).done(function(data){location.reload(true)});
    });
    
    $("#update").click(function(){
        
        var temp = {
            id:person_data._id,
            name:$("#name").val(),
            address:$("#address").val(),
            age:$("#age").val()
        }
        
        $.ajax({
            method:"PUT",
            url:'http://localhost:3000/persons',
            //dataType:'json',
            data:temp
        }).done(function(){location.reload(true)});
        
    });
    
}

/*
$(document).ready(domReady);

function domReady(){
} */