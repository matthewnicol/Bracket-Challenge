/*global document: false */
/*jslint browser: true*/

var setWinner, findTeam, noTeamToSelect, getTeamDiv, refreshMatchup, refreshAllBrackets, submitOurBracket,
    getWinsDiv, getVersusDiv;

function displayMakeBracket() {
    "use strict";
    
    document.getElementById("allBrackets").style.display = "none";
    document.getElementById("statistics").style.display = "none";
    document.getElementById("groups").style.display = "none";
    document.getElementById("makebracket").style.display = "block";
    refreshAllBrackets();
}

//Display the left team, user selection, and right team for each matchup.
//Needs to refresh when a user picks a certain team and options for later rounds become open
function refreshAllBrackets() {
    "use strict";
    var allMatchupElements, i, champDiv, teamID, teamData, mascotTitle, cityTitle, img,
        noteline1, noteline2, notelinetext1, notelinetext2, outerDiv;
    
    allMatchupElements = document.getElementsByClassName("matchup");
    for (i = 0; i < allMatchupElements.length; i = i + 1) {
        refreshMatchup(allMatchupElements[i]);
    }

    document.getElementById("championship").innerHTML = "";
        
    if (document.getElementById("match15").getAttribute("data-winner") !== "0") {
        outerDiv = document.getElementById("championship");
        champDiv = document.createElement("div");
        
        teamID = document.getElementById("match15").getAttribute("data-winner");
    
        teamData = document.getElementById("team" + teamID);
    
        //mascot
        mascotTitle = document.createElement("h4");
        mascotTitle.appendChild(document.createTextNode(teamData.getAttribute("data-mascot")));
        mascotTitle.className = "teamMascot leftteam";

        cityTitle = document.createElement("h4");
        cityTitle.appendChild(document.createTextNode(teamData.getAttribute("data-city")));
        cityTitle.className = "teamCity leftteam";
    
        img = document.createElement("img");
        img.src = "thumbnails/" + teamData.getAttribute("data-mascot").toLowerCase() + ".png";
        
        
        champDiv.appendChild(img);
        champDiv.appendChild(cityTitle);
        champDiv.appendChild(mascotTitle);
        noteline1 = document.createElement("p");
        noteline2 = document.createElement("p");
        noteline1.className = "note";
        noteline2.className = "note";
        notelinetext1 = document.createTextNode("make sure selections and");
        notelinetext2 = document.createTextNode("scores are completed!");
        noteline1.appendChild(notelinetext1);
        noteline2.appendChild(notelinetext2);
        champDiv.appendChild(noteline1);
        champDiv.appendChild(noteline2);
        
        outerDiv.appendChild(champDiv);
        
        
                    
    } else { document.getElementById("championship").appendChild(noTeamToSelect("left")); }
    
    document.getElementById("submitbracket").onclick = submitOurBracket;
}

//empty a bracket node and refresh it with data on the teams playing.
function refreshMatchup(meeting_div) {
    "use strict";
    var winner, leftWins, rightWins, leftTeam, rightTeam, leftMatch, rightMatch;
    
    winner = meeting_div.getAttribute("data-winner");
    leftTeam = meeting_div.getAttribute("data-left");
    rightTeam = meeting_div.getAttribute("data-right");
    leftMatch = document.getElementById("match" + meeting_div.getAttribute("data-leftmatch"));
    rightMatch = document.getElementById("match" + meeting_div.getAttribute("data-rightmatch"));
    
    if (winner !== "0") {
        if (leftMatch !== null) {
            leftWins = winner === leftMatch.getAttribute("data-winner");
        } else {
            (leftWins = winner === leftTeam);
        }
        if (rightMatch !== null) {
            rightWins = winner === rightMatch.getAttribute("data-winner");
        } else {
            rightWins = winner === rightTeam;
        }
    } else {
        leftWins = false;
        rightWins = false;
    }
    meeting_div.innerHTML = "";
    
    //left team stuff    
    meeting_div.appendChild(getTeamDiv(meeting_div, "left", leftWins, rightWins));
    meeting_div.appendChild(getWinsDiv(meeting_div, "left", leftWins, rightWins));
    
    //V
    meeting_div.appendChild(getVersusDiv(meeting_div, winner));
    
    //right team stuff
    meeting_div.appendChild(getWinsDiv(meeting_div, "right", rightWins, leftWins));
    meeting_div.appendChild(getTeamDiv(meeting_div, "right", rightWins, leftWins));
}

function getVersusDiv(meeting_div, winner) {
    "use strict";
    var versusDiv, versusP, versusPText, spacerP1, spacerP2, spacerP1Text, spacerP2Text;
    
    versusDiv = document.createElement("div");
    versusDiv.className = "versusDiv";
    
    versusP = document.createElement("p");
    spacerP1 = document.createElement("p");
    spacerP2 = document.createElement("p");
    
    versusP.className = "versus";
    spacerP1.className = "versus";
    spacerP2.className = "versus";
    
    spacerP1Text = document.createTextNode(String.fromCharCode(160));
    spacerP2Text = document.createTextNode(String.fromCharCode(160));
    spacerP1.appendChild(spacerP1Text);
    spacerP2.appendChild(spacerP2Text);
    
    if (winner !== "0") {
        versusPText = document.createTextNode("-");
    } else {
        versusPText = document.createTextNode("V");
    }
    
    versusP.appendChild(versusPText);
    versusDiv.appendChild(spacerP1);
    versusDiv.appendChild(versusP);
    versusDiv.appendChild(spacerP2);

    return versusDiv;
}

//generate a div containing the amount of wins that the user thinks the particular team
//will win in the series
function getWinsDiv(meeting_div, pos, iWin, iLose) {
    "use strict";
    var winsDiv, winsCountP, upArrowP, downArrowP, winsCountText, upArrowText, downArrowText;
    
    winsDiv = document.createElement("div");
    winsDiv.className = "winsDiv";

    //figure out text to display in each case    
    if (iLose) {
        winsCountText = document.createTextNode(meeting_div.getAttribute("data-loserwins"));
        downArrowText = document.createTextNode(String.fromCharCode(8675));
        upArrowText = document.createTextNode(String.fromCharCode(8673));
    } else {
        downArrowText = document.createTextNode(String.fromCharCode(160));
        upArrowText = document.createTextNode(String.fromCharCode(160));
        
        if (iWin) {
            winsCountText = document.createTextNode("4");
        } else {
            winsCountText = document.createTextNode(String.fromCharCode(8253));
        }
    
    }
    
    //up arrow
    upArrowP = document.createElement("p");
    upArrowP.className = "arrow upArrow";
    upArrowP.appendChild(upArrowText);
    if (iLose) {
        upArrowP.onclick = function () { clickUpArrow(winsDiv.parentNode.id); };
    }
    winsDiv.appendChild(upArrowP);
    
    //wins count
    winsCountP = document.createElement("p");
    winsCountP.className = "winCount";
    winsCountP.appendChild(winsCountText);
    winsDiv.appendChild(winsCountP);
    
    //down arrow
    downArrowP = document.createElement("p");
    downArrowP.className = "arrow downArrow";
    downArrowP.appendChild(downArrowText);
    if (iLose) {
        downArrowP.onclick = function () { clickDownArrow(winsDiv.parentNode.id); };
    }
    winsDiv.appendChild(downArrowP);
    
    return winsDiv;
}

function getTeamDiv(meeting_div, pos, iWin, iLose) {
    "use strict";
    var teamID, teamData, mascotTitle, cityTitle, img, leagueStanding, leagueTitle, leagueTitleText, leagueText,
        conferenceStanding, conferenceTitle, conferenceTitleText, conferenceText, finalDiv, bgTickDiv, clickFunction;
    
    
    //figure out which team we need
    teamID = findTeam(meeting_div, pos);
    if (teamID === "0") { return noTeamToSelect(pos); }
    teamData = document.getElementById("team" + teamID);
    clickFunction = function () { setWinner(this.parentNode.getElementsByTagName("img")[0], teamID); };
    
    //mascot
    mascotTitle = document.createElement("h4");
    mascotTitle.appendChild(document.createTextNode(teamData.getAttribute("data-mascot")));
    mascotTitle.className = "teamMascot " + pos + "team";
    mascotTitle.onclick = clickFunction;

    //city
    cityTitle = document.createElement("h4");
    cityTitle.appendChild(document.createTextNode(teamData.getAttribute("data-city")));
    cityTitle.className = "teamCity " + pos + "team";
    cityTitle.onclick = clickFunction;

    //image
    img = document.createElement("img");
    img.src = "thumbnails/" + teamData.getAttribute("data-mascot").toLowerCase() + ".png";
    //determine image class based on winning or losing status
    if (iWin) {
        img.className = pos + "Team winningTeam";
    } else if (iLose) {
        img.className = pos + "Team losingTeam";
    } else {
        img.className = pos + "Team";
    }
    
    img.onclick = clickFunction;

    //league-standing
    leagueStanding = document.createElement("p");
    leagueStanding.className = "note";
    leagueTitle = document.createElement("span");
    leagueTitleText = document.createTextNode("Total: ");
    leagueTitle.appendChild(leagueTitleText);
    leagueText = document.createTextNode(teamData.getAttribute("data-wins") + " wins - " + teamData.getAttribute("data-losses") + " losses");
    leagueStanding.appendChild(leagueTitle);
    leagueStanding.appendChild(leagueText);

    //conference-standing
    conferenceStanding = document.createElement("p");
    conferenceStanding.className = "note";
    conferenceTitle = document.createElement("span");
    conferenceTitleText = document.createTextNode("Conf.: ");
    conferenceText = document.createTextNode(teamData.getAttribute("data-confwins") + " wins - " + teamData.getAttribute("data-conflosses") + " losses");
    conferenceTitle.appendChild(conferenceTitleText);
    conferenceStanding.appendChild(conferenceTitle);
    conferenceStanding.appendChild(conferenceText);

    //bring it all together
    finalDiv = document.createElement("div");
    finalDiv.appendChild(img);
    finalDiv.appendChild(cityTitle);
    finalDiv.appendChild(mascotTitle);
    finalDiv.appendChild(leagueStanding);
    finalDiv.appendChild(conferenceStanding);
    //finalDiv.onclick = function() { setWinner(this.getElementsByTagName("img")[0], teamID); };

    //determine class based on winning or losing status
    if (iWin) finalDiv.className = pos + "TeamContainer winningTeam";
    else if (iLose) finalDiv.className = pos + "TeamContainer losingTeam";
    else finalDiv.className = pos + "TeamContainer";    

    //return
    return finalDiv;
}


//given a MEETING_DIV, look for the id of the team in POS (left or right) by
//looking for a seeding number in the data, or looking at the winner of the match
//that this div depends on.)
//  returns: id of the team, which correlates with a hidden element full of team data 
function findTeam(meeting_div, pos) {
    "use strict";
    var dependencyMatchID, dependencyDiv;
    
    //if a seed is specified, return that element.
    if (meeting_div.getAttribute("data-" + pos) !== "0") { 
        return meeting_div.getAttribute("data-" + pos); 
    }
    
    //have we set a winner for a previous match?
    dependencyMatchID = meeting_div.getAttribute("data-" + pos + "match");
    dependencyDiv = document.getElementById("match" + dependencyMatchID);    
    if (dependencyDiv.getAttribute("data-winner") !== "0") { 
        return dependencyDiv.getAttribute("data-winner"); 
    }

    //dependency div isn't filled out either    
    return "0";
}

//if the user has not filled out an earlier part of the bracket
//and thus we don't know which team he thinks will advance to this
//point, we need to display an "empty" div w/ a question mark.
function noTeamToSelect(pos) {
    "use strict";
    var div, img, line1, line2;
    div = document.createElement("div");
    div.className = ("leftTeamContainer");

    img = document.createElement("img");
    img.src = "thumbnails/question.png";
    img.className = pos + "Team";

    line1 = document.createElement("h4");
    line1.appendChild(document.createTextNode("fill out"));
    line1.className = "teamCity " + pos + "Team";

    line2 = document.createElement("h4");
    line2.appendChild(document.createTextNode("previous rounds"));
    line2.className = "teamCity " + pos + "Team";

    div.appendChild(img);
    div.appendChild(line1);
    div.appendChild(line2);
    return div;
}

function setWinner(imgElement, teamID) {
    "use strict";
    var dataLeft, dataRight, dependencyLeft, dependencyRight;
    
    //set imgElement as selected

    dataLeft = imgElement.parentNode.parentNode.getAttribute("data-left");
    dataRight = imgElement.parentNode.parentNode.getAttribute("data-right");
    dependencyLeft = imgElement.parentNode.parentNode.getAttribute("data-leftMatch");
    dependencyRight = imgElement.parentNode.parentNode.getAttribute("data-rightMatch");
    
    //set parent's parent's data-winner as teamID;
    imgElement.parentNode.parentNode.setAttribute("data-winner", teamID);

    //refresh when ready
    document.addEventListener("DOMContentLoaded", refreshAllBrackets());
}

function clickUpArrow(matchID) {
    if (document.getElementById(matchID).getAttribute("data-loserwins") === "0") {
        document.getElementById(matchID).setAttribute("data-loserwins", "1");
        document.addEventListener("DOMContentLoaded", refreshAllBrackets());    
    }
    else if (document.getElementById(matchID).getAttribute("data-loserwins") === "1") {
        document.getElementById(matchID).setAttribute("data-loserwins", "2");
        document.addEventListener("DOMContentLoaded", refreshAllBrackets());    
    }
    else if (document.getElementById(matchID).getAttribute("data-loserwins") === "2") {
        document.getElementById(matchID).setAttribute("data-loserwins", "3");
        document.addEventListener("DOMContentLoaded", refreshAllBrackets());    
    }
}

function clickDownArrow(matchID) {
    if (document.getElementById(matchID).getAttribute("data-loserwins") === "1") {
        document.getElementById(matchID).setAttribute("data-loserwins", "0");
        document.addEventListener("DOMContentLoaded", refreshAllBrackets());    
    }
    else if (document.getElementById(matchID).getAttribute("data-loserwins") === "2") {
        document.getElementById(matchID).setAttribute("data-loserwins", "1");
        document.addEventListener("DOMContentLoaded", refreshAllBrackets());    
    }
    else if (document.getElementById(matchID).getAttribute("data-loserwins") === "3") {
        document.getElementById(matchID).setAttribute("data-loserwins", "2");
        document.addEventListener("DOMContentLoaded", refreshAllBrackets());    
    }
}


function submitOurBracket() {
    "use strict";
    var ennumerate, dataToSave, i, winnerID, loserWins, playerName, currentMatch;
    dataToSave = "";
    ennumerate = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];

    for (i = 0; i < ennumerate.length; i = i + 1) {
        currentMatch = document.getElementById("match" + ennumerate[i]);     	  
    	  winnerID = currentMatch.getAttribute("data-winner");
    	  loserWins = currentMatch.getAttribute("data-loserwins");

        if (winnerID === "0") {
            errorUnfilledBracket();
            return;        
        }
        dataToSave = dataToSave + winnerID + "-" + loserWins + "-"; 
    }
    
    playerName = document.getElementById("playername").value; 
    
    if (playerName === "") {
    	  errorUnfilledPlayerName();
    	  return;
    }
    
    for (i = 0; i < playerName.length; i = i + 1) {
      if (playerName.charAt(i) == " ") {
           errorNoSpacesInNamePlease();
           return;
      }    
      if (playerName.charAt(i) == "?") {
      	  errorNoQMarkInNamePlease();
      	  return;
      }
       if (playerName.charAt(i) == "&") {
      	  errorNoAmpInNamePlease();
      	  return;
      }
      if (playerName.charAt(i) == "\\") {
      	  errorNoSlashInNamePlease();
      	  return;
      }
      if (playerName.charAt(i) == ":") {
      	  errorNoSlashInNamePlease();
      	  return;
      }
    }
    
    attemptToSubmitFile(dataToSave, "brackets/" + playerName );
        
}

function attemptToSubmitFile(datastring, fname) {
    var xmlhttp;

    // code for IE7+, Firefox, Chrome, Opera, Safari
    if (window.XMLHttpRequest) { xmlhttp = new XMLHttpRequest(); }
    // code for IE6, IE5 
    else { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
           if (xmlhttp.statusText == "Not Found") { 
               alert("Success. We are submitting!");               
               var form = document.createElement("form");               
               var submit = document.createElement("input");
               submit.setAttribute("type", "submit");
               form.method = "GET";
               form.action = "submitdata.php";
               
               var datainput = document.createElement("input");
               datainput.value = datastring;
               datainput.name = "details";
               var nameinput = document.createElement("input");
               nameinput.value = fname;
               nameinput.name = "fname";
               form.appendChild(nameinput);
               form.appendChild(datainput);               
               form.appendChild(submit);
               document.body.appendChild(form);               
               form.submit();
             
           }
           if (xmlhttp.status == 200) {
               errorUsernameAlreadyExists();
           }
           

        }
    }

    xmlhttp.open("GET", fname, true);
    xmlhttp.send();
}

function errorUnfilledBracket() {
    alert("You have not filled in the bracket properly!");
}

function errorUnfilledPlayerName() {
    alert("Fill in your player name!");
}

function errorNoSpacesInNamePlease() {
    alert("No spaces in player name please");
}

function errorUsernameAlreadyExists() {
    alert("Somebody already submitted a bracket under that name");
}

function errorNoQMarkInNamePlease() {
    alert("No question marks in player name please");
}

function errorNoAmpInNamePlease() {
    alert("No ampersands in player name please");
}

function errorNoColonInNamePlease() {
    alert("No ampersands in player name please");
}

function errorNoSlashInNamePlease() {
    alert("No slashes in player name please");
}