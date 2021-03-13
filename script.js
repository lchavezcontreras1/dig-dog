const numBones = 5;
let totalSquares = numBones * numBones;
let initial = 1;
let width = 0;
let number = numBones;
$(document).ready(function () {
    let numRowsCreated = 0;
    while (numRowsCreated < numBones) {
        let numSquaresCreated = 0;
        while (numSquaresCreated < numBones) {
            createSquare();
            numSquaresCreated++;
        }
        let breakTag = $("<br>");
        $("div#board").append(breakTag);
        numRowsCreated++
    }
    for (let hidden = 0; hidden < numBones; hidden++) {
        let randomNum = Math.floor(Math.random() * 25);
        let randomSquare = $("span.square").eq(randomNum);
        if (!randomSquare.hasClass("surprise")) {
            randomSquare.addClass("surprise");
        }
    }
    if (number===0){
        $("span.square").off("cllick");
    }
});

function playerGuess() {
    let clickedSpan = $(this);
    let isSurprise = clickedSpan.hasClass("surprise");
    if (isSurprise === true) {
        clickedSpan.css("background-color", "rgb(160,82,45)").css("background-image", "url('bone.png')").css("background-repeat", "no-repeat").css("background-position", "center").css("color", "rgb(205,133,63)");
        --number;
        $("div#remaining").text(`There are ${number} bones left!`).css("color", "#fff").css("font-size", "25px");
        if (number === 0) {
            $("div#message").text(`Congratulations! You have found all of the bones!`).css("color", "#fff").css("font-size", "25px");
        }
        clickedSpan.off("click");
    } else{
        clickedSpan.css("background-color", "rgb(160,82,45)");
        clickedSpan.off("click");
    }
}

function move() {
    let start = 0;
    let randomPer = Math.floor(Math.random() * (numBones / (numBones * 2)));
    if (start === 0) {
        start = 1;
        let elem = $("div#progress");
        let width = randomPer;
        let id = setInterval(frame, 10);

        function frame() {
            if (width >= 100) {
                clearInterval(id);
                start = 0;
            } else {
                elem.width(width++);
            }
        }
    }
}

//I couldn't get it to stay
function createSquare() {
    let board = $("div#board");
    let square = $("<span>");
    square.height(150);
    square.width(150);
    square.addClass("square");
    square.css("padding", "5% 0").css("color", "#fff").css("font-size", "25px");
    square.text(squareNumber);
    square.css("background-color", "rgb(49,99,0)");
    square.click(playerGuess);
    square.click(move);
    board.append(square);
}

function squareNumber() {
    if (initial <= totalSquares) {
        return (initial++);
    }
}
