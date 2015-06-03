//<input type="hidden" class="bracketEncoded" data-owner="BondFiction" id="bracket-BondFiction" data-information="1-0-9-1-2-1-15-2-3-2-14-3-4-1-13-2-1-2-9-2-2-3-14-3-1-2-9-3-9-3-">

/*jslint browser: true*/
/*global generateP: true, generateDiv: true, generateSubmit: true, generateFancyList: true,
         generateTeamThumbnail: true, generateh4: true,
         getBracketCount: true, getAllBrackets: true,
         getTeam: true, getMascot: true*/

var displayMakeBracket, setupStatistics, getBracketOwners, getTriviaDiv, getMostPopularTeams,
    loadDefaultBracket, loadLeaderboard,
    generateBracketTable, fillBracket, generateLeaderboardTable, fillLeaderboardTable,
    linkTDWithSeed, linkTDWithWinner, fillLeaderBoard, getQuestionThumbnail,
    addLeaderboardMatches, addLeaderboardScores, addLeaderboardPlayers, addLeaderboardRounds,
    orderLeaderboard, getBracketScore;


function setupStatistics() {
    "use strict";
    //load up the actual bracket
    loadDefaultBracket();
    //load up the user list
    
    //load up the leaderboard
    loadLeaderboard();
}

function loadLeaderboard() {
    "use strict";
    var leaderboardContainer;
    
    leaderboardContainer = document.getElementById("leaderboard");
    leaderboardContainer.appendChild(generateLeaderboardTable());
    fillLeaderBoard();
    
}

function loadDefaultBracket() {
    "use strict";
    var listDiv, bracketContainer;
    
    bracketContainer = document.getElementById("displayBracket");
    bracketContainer.innerHTML = "";
    
    listDiv = generateDiv("list4");
    listDiv.appendChild(generateFancyList(getBracketOwners()));
    bracketContainer.appendChild(listDiv);
    
    bracketContainer.appendChild(generateBracketTable());
    bracketContainer.appendChild(generateDiv("leaderboard", "subcontainer"));
    fillBracket("");
}

function fillBracket(bracket) {
    "use strict";
    var table, currentTR, qimg, text, textnode, h3;
    
    qimg = "thumbnails/question.png";
    table = document.getElementById("bracketTable");
    currentTR = table.getElementsByTagName("tr")[0];
    
    
    if (bracket === "") {
        text = "Actual Competition Bracket";
    } else {
        text = "Bracket: " + bracket;
    }
    
    h3 = document.createElement("h3");
    textnode = document.createTextNode(text);
    h3.appendChild(textnode);
    
    document.getElementById("bracketTable").getElementsByTagName("tr")[0].getElementsByTagName("td")[0].innerHTML = "";
    document.getElementById("bracketTable").getElementsByTagName("tr")[0].getElementsByTagName("td")[0].appendChild(h3);
    document.getElementById("bracketTable").getElementsByTagName("tr")[0].getElementsByTagName("td")[0].className = "tableHeader";
    
    
    
    linkTDWithSeed(1, 0, 1);
    linkTDWithSeed(1, 1, 8);
    linkTDWithSeed(1, 2, 4);
    linkTDWithSeed(1, 3, 5);
    linkTDWithSeed(1, 4, 3);
    linkTDWithSeed(1, 5, 6);
    linkTDWithSeed(1, 6, 2);
    linkTDWithSeed(1, 7, 7);
    
    linkTDWithWinner(2, 0, 1, bracket);
    linkTDWithWinner(2, 1, 7, bracket);
    linkTDWithWinner(2, 2, 5, bracket);
    linkTDWithWinner(2, 3, 3, bracket);
    
    linkTDWithWinner(3, 0, 9, bracket);
    linkTDWithWinner(3, 1, 11, bracket);
    
    linkTDWithWinner(4, 0, 13, bracket);
    linkTDWithWinner(4, 1, 15, bracket);
    linkTDWithWinner(4, 2, 14, bracket);
    
    linkTDWithWinner(5, 0, 10, bracket);
    linkTDWithWinner(5, 1, 12, bracket);
    
    linkTDWithWinner(6, 0, 2, bracket);
    linkTDWithWinner(6, 1, 8, bracket);
    linkTDWithWinner(6, 2, 6, bracket);
    linkTDWithWinner(6, 3, 4, bracket);
    
    linkTDWithSeed(7, 0, 9);
    linkTDWithSeed(7, 1, 16);
    linkTDWithSeed(7, 2, 12);
    linkTDWithSeed(7, 3, 13);
    linkTDWithSeed(7, 4, 11);
    linkTDWithSeed(7, 5, 14);
    linkTDWithSeed(7, 6, 10);
    linkTDWithSeed(7, 7, 15);
    
    
}

function linkTDWithSeed(row, cell, match) {
    "use strict";
    var img, tr, td, table, data;
    
    table = document.getElementById("bracketTable");
    tr = table.getElementsByTagName("tr")[row];
    td = tr.getElementsByTagName("td")[cell];
    td.innerHTML = "";
    

    data = document.getElementById("team" + match.toString()).getAttribute("data-mascot");
    img = document.createElement("img");
    img.src = "thumbnails/" + data.toLowerCase() + ".png";
    td.appendChild(img);
}

function linkTDWithWinner(row, cell, match, bracket) {
    "use strict";
    var table, tr, td, winner, img, mascot, bracketElement, bracketData, bracketlisthack, winslisthack,
        info, infonode;
    
    if (bracket === "") {
        table = document.getElementById("bracketTable");
        tr = table.getElementsByTagName("tr")[row];
        td = tr.getElementsByTagName("td")[cell];

        winner = document.getElementById("match" + match.toString()).getAttribute("data-actualwins");
        if (winner === "0") {
            img = document.createElement("img");
            img.src = "thumbnails/question.png";
            td.appendChild(img);
        } else {
            linkTDWithSeed(row, cell, winner);
            
            table = document.getElementById("bracketTable");
            tr = table.getElementsByTagName("tr")[row];
            td = tr.getElementsByTagName("td")[cell];

            info = document.createElement("p");
            info.className = "bracketWinsText";
            winner = document.getElementById("match" + match.toString()).getAttribute("data-actualloserwins");
            infonode = document.createTextNode("4-" + winner);
            info.appendChild(infonode);
            td.appendChild(info);
        }
        
        
    } else {
        bracketlisthack = ["", "0", "2", "4", "6", "8", "10", "12", "14",
                           "16", "18", "20", "22", "24", "26", "28", "30"];
        winslisthack = ["", "1", "3", "5", "7", "9", "11", "13", "15",
                           "17", "19", "21", "23", "25", "27", "29", "31"];
        
        bracketElement = document.getElementById("bracket-" + bracket);
        bracketData = bracketElement.getAttribute("data-information").split("-")[bracketlisthack[match]];
        linkTDWithSeed(row, cell, bracketData);
        
        table = document.getElementById("bracketTable");
        tr = table.getElementsByTagName("tr")[row];
        td = tr.getElementsByTagName("td")[cell];
        
        info = document.createElement("p");
        info.className = "bracketWinsText";
        bracketData = bracketElement.getAttribute("data-information").split("-")[winslisthack[match]];
        infonode = document.createTextNode("4-" + bracketData);
        info.appendChild(infonode);
        td.appendChild(info);
    }
}

function generateBracketTable() {
    "use strict";
    var table, i, j, cols, rowspan, side;
    
    table = document.createElement("table");
    table.className = "bracketTable";
    table.id = "bracketTable";
    table.style.border = "1px solid";
    cols = [0, 8, 4, 2, 3, 2, 4, 8];
    rowspan = [0, 1, 2, 4, -1, 4, 2, 1];
    table.appendChild(document.createElement("tr"));
    table.getElementsByTagName("tr")[0].appendChild(document.createElement("td"));
    table.getElementsByTagName("tr")[0].getElementsByTagName("td")[0].colSpan = 8;
    
    for (i = 1; i < cols.length; i = i + 1) {
        table.appendChild(document.createElement("tr"));
        
        if (i === 4) {
            table.getElementsByTagName("tr")[i].appendChild(document.createElement("td"));
            table.getElementsByTagName("tr")[i].appendChild(document.createElement("td"));
            table.getElementsByTagName("tr")[i].appendChild(document.createElement("td"));
            table.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].colSpan = 2;
            table.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].colSpan = 4;
            table.getElementsByTagName("tr")[i].getElementsByTagName("td")[2].colSpan = 2;
            
            table.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].className = "leftConfBracket";
            table.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].className = "centerConfBracket";
            table.getElementsByTagName("tr")[i].getElementsByTagName("td")[2].className = "rightConfBracket";
        
        } else {
            for (j = 0; j < cols[i]; j = j + 1) {
                if (i < 4) {
                    side = "left";
                } else {
                    side = "right";
                }
                table.getElementsByTagName("tr")[i].appendChild(document.createElement("td"));
                table.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].colSpan = rowspan[i];
                table.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].className = side + "ConfBracket";
            }
        }
    }
    
    return table;
    
    
    
}

function generateLeaderboardTable() {
    "use strict";
    var table, allBrackets, allMatches, i, j;
    
    allBrackets = document.getElementsByTagName("bracketEncoded");
    allMatches = document.getElementsByTagName("matchup");
    
    table = document.createElement("table");
    table.id = "leaderboardtable";
    
    table.appendChild(document.createElement("tr"));
    table.getElementsByTagName("tr")[0].appendChild(document.createElement("td"));
    table.getElementsByTagName("tr")[0].className = "ordinal";
    table.getElementsByTagName("tr")[0].getElementsByTagName("td")[0].colSpan = 15;
    table.getElementsByTagName("tr")[0].getElementsByTagName("td")[0].appendChild(generateh4("Leaderboard", ""));
    
    for (i = 1; i < 16; i = i + 1) {
        table.appendChild(document.createElement("tr"));
        for (j = 0; j < 15; j = j + 1) {
            table.getElementsByTagName("tr")[i].appendChild(document.createElement("td"));
        }
    }
    return table;
}


function fillLeaderBoard() {
    "use strict";
    var table, tr, td;
    
    addLeaderboardMatches();
    addLeaderboardScores();
    
    table = document.getElementById("leaderboardtable");
    
    tr = table.insertRow(4);
    td = tr.insertCell(0);
    tr.className = "leaderboardround"
    td.colSpan = 15;
    td.appendChild(generateh4("Round 1",""));
    
    tr = table.insertRow(13);
    td = tr.insertCell(0);
    tr.className = "leaderboardround"
    td.colSpan = 15;
    td.appendChild(generateh4("Round 2",""));
    
    tr = table.insertRow(18);
    td = tr.insertCell(0);
    tr.className = "leaderboardround"
    td.colSpan = 15;
    td.appendChild(generateh4("Conference Finals",""));
    
    tr = table.insertRow(21);
    td = tr.insertCell(0);
    tr.className = "leaderboardround"
    td.colSpan = 15;
    td.appendChild(generateh4("Final",""));
    
    
                   
}

function addLeaderboardScores() {
    "use strict";
    var allBrackets, allScores, i, j, order,
        table, tr, tr2, td,
        curplayer, sums;
    
    allBrackets = document.getElementsByClassName("bracketEncoded");
    allScores = [];
    
    for (i = 0; i < allBrackets.length; i = i + 1) { allScores.push(getBracketScore(allBrackets[i])); }
    order = orderLeaderboard(allScores);
    
    table = document.getElementById("leaderboardtable");
    for (i = 0; i < order.length; i = i + 1) {
        curplayer = allScores[order[i]];
        
        for (j = 0; j < curplayer.length; j = j + 1) {
            tr = table.getElementsByTagName("tr")[j + 1];
            td = tr.getElementsByTagName("td")[i + 1];
            td.appendChild(generateh4(curplayer[j].toString()));
        }
    }
    
    tr = table.insertRow(1);
    tr2 = table.insertRow(2);
    tr.className = "names";
    tr2.className = "points";
    td = tr.insertCell(0);
    td - tr2.insertCell(0);
    sums = document.getElementById("sums").getAttribute("data-sums").split(",");
    
    for (i = 0; i < allBrackets.length; i = i + 1) {
        td = tr.insertCell(i + 1);
        td.appendChild(generateh4(allBrackets[order[i]].getAttribute("data-owner"), ""));
        td = tr2.insertCell(i + 1);
        td.appendChild(generateh4(sums[order[i]], ""));
    }
    
    tr = table.insertRow(1);
    tr.className = "ordinal";
    td = tr.insertCell(0);
    td = tr.insertCell(1); td.appendChild(generateh4("1st",""));
    td = tr.insertCell(2); td.appendChild(generateh4("2nd",""));
    td = tr.insertCell(3); td.appendChild(generateh4("3rd",""));
    td = tr.insertCell(4); td.appendChild(generateh4("4th",""));
    td = tr.insertCell(5); td.appendChild(generateh4("5th",""));
    td = tr.insertCell(6); td.appendChild(generateh4("6th",""));
    td = tr.insertCell(7); td.appendChild(generateh4("7th",""));
    td = tr.insertCell(8); td.appendChild(generateh4("8th",""));
    td = tr.insertCell(9); td.appendChild(generateh4("9th",""));
    td = tr.insertCell(10); td.appendChild(generateh4("10th",""));
    td = tr.insertCell(11); td.appendChild(generateh4("11th",""));
    td = tr.insertCell(12); td.appendChild(generateh4("12th",""));
    td = tr.insertCell(13); td.appendChild(generateh4("13th",""));
    td = tr.insertCell(14); td.appendChild(generateh4("14th",""));
    
}

function getBracketScore(bracket) {
    "use strict";
    var choicelist, winslist, scoreslist, i, matches, curmatch, j, tally, matchscores;
    
    winslist = [];
    scoreslist = [];
    
    matchscores = [];
    
    matches = document.getElementsByClassName("matchup");
    choicelist = bracket.getAttribute("data-information").split("-");
    
    j = 0;
    for (i = 1; i < matches.length+1; i = i + 1) {
        curmatch = document.getElementById("match" + i.toString());
        tally = 0;
        if (curmatch.getAttribute("data-actualwins") === choicelist[j]) { tally = tally + 1; }
        j = j + 1;
        if (curmatch.getAttribute("data-actualloserwins") === choicelist[j]) { tally = tally + 1; }
        j = j + 1;
        if (tally === 2) { tally = 3; }
        matchscores.push(tally);
    }
    
    return matchscores;
}

function orderLeaderboard(allScores) {
    "use strict";
    var order, highest_score, highest_person, i, j, sums, tally, inp;
    
    order = [];
    sums = [];
    for (i = 0; i < allScores.length; i = i + 1) {
        tally = 0;
        for (j = 0; j < allScores[i].length; j = j + 1) {
            tally = tally + allScores[i][j];
        }
        sums.push(tally);
    }
    
    
    while (order.length < sums.length) {
        highest_score = -1;
        highest_person = -1;
        for (i = 0; i < sums.length; i = i + 1) {
            if (sums[i] > highest_score) {
                if (order.indexOf(i) === -1) {
                    highest_score = sums[i];
                    highest_person = i;
                }
            }
        }
        order.push(highest_person);
    }
    inp = document.createElement("input");
    inp.type = "hidden";
    inp.id = "sums";
    inp.setAttribute("data-sums", sums);
    document.body.appendChild(inp);
    return order;
}

function addLeaderboardMatches() {
    "use strict";
    var table, i, match, td, tr, leftpic, rightpic,
        leftmatch, rightmatch, wholediv, intholder,
        numer, allMatches, img;
    
    table = document.getElementById("leaderboardtable");
    allMatches = document.getElementsByClassName("matchup");

    for (i = 0; i < allMatches.length; i = i + 1) {
        wholediv = generateDiv("", "teams");

        tr = table.getElementsByTagName("tr")[i + 1];
        tr.className = "leaderboardrow";
        td = tr.getElementsByTagName("td")[0];
        numer = i;
        numer = numer.toString();
        match = document.getElementById("match" + (i + 1).toString());

        if (match.getAttribute("data-left") === "0") {
            leftmatch = document.getElementById("match" + match.getAttribute("data-leftmatch"));
            if (leftmatch.getAttribute("data-actualwins") === "0") {
                img = getQuestionThumbnail();
                img.setAttribute("class", "smlimg");
                wholediv.appendChild(img);
            } else {
                intholder = leftmatch.getAttribute("data-actualwins");
                img = generateTeamThumbnail(intholder)
                img.setAttribute("class", "smlimg");
                wholediv.appendChild(img);
            }
        } else {
            intholder = match.getAttribute("data-left");
            img = generateTeamThumbnail(intholder)
            img.setAttribute("class", "smlimg");
            wholediv.appendChild(img);
        }

        if (match.getAttribute("data-right") === "0") {
            rightmatch = document.getElementById("match" + match.getAttribute("data-rightmatch"));
            if (rightmatch.getAttribute("data-actualwins") === "0") {
                img = getQuestionThumbnail();
                img.setAttribute("class", "smlimg");
                wholediv.appendChild(img);
            } else {
                intholder = rightmatch.getAttribute("data-actualwins");
                img = generateTeamThumbnail(intholder);
                img.setAttribute("class", "smlimg");
                wholediv.appendChild(img);
            }
        } else {
            intholder = match.getAttribute("data-right");
            img = generateTeamThumbnail(intholder);
            img.setAttribute("class", "smlimg");
            wholediv.appendChild(img);
        }
        
        td.appendChild(wholediv);
    }
}

function getPopularTeamDiv(location, teamid) {
    "use strict";
    var statsDiv;
    
    statsDiv = generateDiv("", "teamDiv");
    statsDiv.appendChild(generateTeamThumbnail(teamid));
    statsDiv.appendChild(generateh4("Most popular in the " + location, "teamCity"));
    statsDiv.appendChild(generateh4(getMascot(teamid), "teamMascot"));
    return statsDiv;
}

function getTriviaDiv() {
    "use strict";
    var statsDiv, popTeams;
    
    popTeams = getMostPopularTeams();
    statsDiv = generateDiv("", "statsInformation");
    statsDiv.appendChild(getPopularTeamDiv("EAST", popTeams[0]));
    statsDiv.appendChild(getPopularTeamDiv("WEST", popTeams[1]));
    return statsDiv;
}

function getMostPopularTeams() {
    "use strict";
    var brackets, data, i, j, mostpop, bracketData, mostPopularEast, mostPopularWest, highestEast, highestWest, winTeam;
    
    brackets = getAllBrackets();
    highestEast = 0;
    highestWest = 0;
    mostpop = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    for (i = 0; i < brackets.length; i = i + 1) {
        bracketData = brackets[i].getAttribute("data-information");
        bracketData = bracketData.split("-");
        
        for (j = 0; j < bracketData.length; j = j + 2) {
            
            winTeam = bracketData[j.toString()];
            mostpop[winTeam] = mostpop[winTeam] + 1;
            
            if (winTeam < 9 && mostpop[winTeam] >= highestEast) {
                highestEast = mostpop[bracketData[j.toString()]];
                mostPopularEast = winTeam;
            
            } else if (winTeam > 8 && mostpop[winTeam] >= highestWest) {
                highestWest = mostpop[bracketData[j.toString()]];
                mostPopularWest = winTeam;
            }
        }
    }
    
    return [mostPopularEast, mostPopularWest];
}

//GET A PLAIN TEXT LIST OF THE CREATORS OF EACH BRACKET
function getBracketOwners(element) {
    "use strict";

    var allBrackets, bracketOwners, i;
    
    allBrackets = document.getElementById("bracketdata").getElementsByClassName("bracketEncoded");
    bracketOwners = [];
    
    for (i = 0; i < allBrackets.length; i = i + 1) {
        bracketOwners.push(allBrackets[i].getAttribute("data-owner"));
    }
    
    return bracketOwners;

}

function mostPopularTeamName() {
    "use strict";
    var allEntrants, i;
    
    
}