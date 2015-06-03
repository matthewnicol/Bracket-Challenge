/*global document: false */
/*jslint browser: true*/

function runFirst() {
   document.getElementById("makebracket").style.display = "none";
   document.getElementById("allBrackets").style.display = "none";
   document.getElementById("statistics").style.display = "none";
   document.getElementById("groups").style.display = "none";
   //loadAllBrackets(); WE PASTED THE BRACKETS INLINE
   
    //setup Display
    statisticsWindow = document.getElementById("statistics");
    statisticsWindow.style.display = "block";
    
    /*var p = document.createElement("h2");
    var ptext = document.createTextNode("Loading brackets... Please wait...");
    p.appendChild(ptext);
    statisticsWindow.appendChild(p);
    setTimeout(setupStatistics, 2500);*/
    
    setupStatistics();
}

//GET INFORMATION FOR ALL BRACKETS AND ENCODE IT INTO OUR PAGE
function loadAllBrackets() {
    "use strict";
    requestBracketList();
}

//GET LIST OF BRACKETS, SEND IT TO ENCODEALLBRACKETS FOR PARSING
function requestBracketList() {
    "use strict";    
    var xmlhttp;

    xmlhttp = getNewRequestObject();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { 
            encodeAllBrackets(xmlhttp.response); 
        }
    }
    
    xmlhttp.open("GET", "allbrackets", true);
    xmlhttp.send();
}

//GIVEN A STRING LIST OF BRACKETS, SEND THEM TO BE ENCODED
function encodeAllBrackets(bracketNamesString) {
	  "use strict";
	  var bracketNamesList, bracketDataElement, i, fileobj, filedata;
	  
	  bracketNamesList = bracketNamesString.substring(0, bracketNamesString.length - 1).split(" ");
	  bracketDataElement = document.getElementById("bracketdata");
	  bracketDataElement.innerHTML = "";
	  
	  for (i = 0; i < bracketNamesList.length; i = i + 1) { 
         if (bracketNamesList[i] != "" && bracketNamesList[i] != " ") {	      
	        createBracketDataEntry(bracketNamesList[i]); }
	  }	  
}

//GET BRACKET NAME AND ENCODE IT
function createBracketDataEntry(bracketName) {
    "use strict";
    var obj;

    obj = getNewRequestObject();
    obj.onreadystatechange = function() {
        if (obj.readyState == 4 && obj.status == 200) {

            var bracketDataEntry = document.createElement("input");
            var bracketDataElement = document.getElementById("bracketdata");
            bracketDataEntry.setAttribute("type", "hidden");
            bracketDataEntry.className = "bracketEncoded";
            bracketDataEntry.setAttribute("data-owner", obj.response.split(":")[0].split("brackets/")[1]);
            bracketDataEntry.setAttribute("data-information", obj.response.split(":")[1]);
            bracketDataElement.appendChild(bracketDataEntry);  
        }
     }

    obj.open("GET", bracketName, true);
    obj.send();
    
    return;
}

//GENERATE NEW XMLHTTPREQUEST OBJECT - AVOID CODE DUPLICATION
function getNewRequestObject() {
    "use strict";
    var obj;

    if (window.XMLHttpRequest) { obj = new XMLHttpRequest(); }  
    else                       { obj = new ActiveXObject("Microsoft.XMLHTTP"); }   
    
    return obj;
}

window.onload = runFirst;