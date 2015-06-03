var generateP, generateDiv, generateSubmit, generateFancyList, generateFancyListElement,
    getTeam, getCity, getMascot,
    getAllBrackets, getBracket, getBracketCount, fillBracket;


//FUNCTIONS THAT GENERATE HTML ELEMENTS AND RETURN THEM BELOW

function generateP(pText, pClasses) {
    "use strict";
    var p, pTextNode;
    
    p = document.createElement("p");
    pTextNode = document.createTextNode(pText);
    p.appendChild(pTextNode);
    p.className = pClasses;
    return p;
    
}

function generateDiv(divId, divClasses) {
    "use strict";
    var div;
    
    div = document.createElement("div");
    
    if (divId !== "") {
        div.setAttribute("id", divId);
    }
    
    div.className = divClasses;
    return div;
}

function generateSubmit(submitId, submitValue, submitFunction, submitClass) {
    "use strict";
    var button;
    button = document.createElement("input");
    button.setAttribute("type", "submit");
    button.id = submitId;
    button.onclick = submitFunction;
    button.value = submitValue;
    button.className = submitClass;
    return button;
}

function generateFancyList(elements) {
    "use strict";
    var list, i;
    
    list = document.createElement("ul");
    for (i = 0; i < elements.length; i = i + 1) {
        list.appendChild(generateFancyListElement(elements[i]));
    }
    return list;
}

function generateFancyListElement(listElementText) {
    "use strict";
    var a, strong, li, elementText;
    
    elementText = document.createTextNode(listElementText);
    strong = document.createElement("strong");
    a = document.createElement("a");
    li = document.createElement("li");
    
    strong.appendChild(elementText);
    a.appendChild(strong);
    a.onclick = function () { fillBracket(listElementText); };
    li.appendChild(a);
    return li;
}

function generateTeamThumbnail(teamid) {
    "use strict";
    
    var img;
    img = document.createElement("img");
    img.src = "thumbnails/" + getMascot(teamid).toLowerCase() + ".png";
    return img;
}

function getQuestionThumbnail() {
    "use strict";
    
    var img;
    img = document.createElement("img");
    img.src = "thumbnails/question.png";
    return img;
}

function generateh4(h4text, h4class) {
    "use strict";
    var h4;
    
    h4 = document.createElement("h4");
    h4.appendChild(document.createTextNode(h4text));
    h4.className = h4class;
    return h4;
}

//FUNCTIONS THAT PULL INFORMATION ABOUT TEAMS

function getMascot(teamid) {
    "use strict";
    return getTeam(teamid).getAttribute("data-mascot");
}

function getCity(teamid) {
    "use strict";
    return getTeam(teamid).getAttribute("data-city");
}

function getTeam(teamid) {
    "use strict";
    return document.getElementById("team" + teamid);
}

//FUNCTIONS THAT PULL INFORMATION ABOUT BRACKETS

function getBracketCount() {
    "use strict";
    return getAllBrackets().length;
}

function getBracket(bracketowner) {
    "use strict";
    var i, allBrackets;
    
    allBrackets = getAllBrackets();
    for (i = 0; i < allBrackets.length; i = i + 1) {
        if (allBrackets[i].getAttribute("data-owner") === bracketowner) {
            return allBrackets[i];
        }
    }
    return null;
}

function getAllBrackets() {
    "use strict";
    
    return document.getElementsByClassName("bracketEncoded");
}