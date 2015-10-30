//"use strict";
console.log("Here we go!!");

//Wait document ready event
$(document).ready(function(){
    console.log("jquery onload triggered");
    $("nav").css("background-color","lightblue")
    .css("padding","20px").css("border-radius","8px");
    
    $(".about").html("<b>New text</b>");
    $("[data-dummy]").html("<p>Hello World</p>");
    
    var setting = {
     
        method:"GET",
        url:"http://localhost:28017/oma/person/",
        dataType:"jsonp",
        jsonp:"jsonp"
    }
    
    $.ajax(setting).done(function(data){
        
        console.log(data);
        
        //Get all keys (attribute names) from json object
        console.log(Object.keys(data.rows[0]));
        
        
        // Check that there are elements in array
        if(data.rows.length > 0) {
            
           //Creates header also dynamically
            var headers = Object.keys(data.rows[0]);
            
            var row = $("<tr></tr>");
            for(var i = 1; i < headers.length; i++){
                //create header and add it to row
                $("<th>" + headers[i] + "</th>").appendTo(row);
            }
            //add row to thead element
            $(row).appendTo("thead");
        }
        
        //Create table content dynamically
        for(i=0; i < data.rows.length; i++){
            
            var html = "<tr>" +
                        "<td>" + data.rows[i].name + "</td>" +
                        "<td>" + data.rows[i].address + "</td>" +
                        "<td>" + data.rows[i].age + "</td>" +
                        "<td>" + data.rows[i].email + "</td>" +
                        "</tr>";
            
        
            $(html).appendTo("tbody");
        }
        
    });
    
    
});

/*
$(document).ready(domReady);

function domReady(){
} */