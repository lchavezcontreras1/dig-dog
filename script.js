// when changed rows/columns/bones will change
// used to scale rest of the game
const NUM_BONES = 5;
// creates dimension of grid
let totalSquares = NUM_BONES * NUM_BONES;
//number for squares
let initial = 1;
//number of bones left
let number = NUM_BONES;

//danger bar
let width = 0;

//functions that run when document ready
$(document).ready(function () {
    createGrid();
    hideBone();
});
//creates number in square
function squareNumber() {
    if (initial <= totalSquares) {
        return (initial++);
    }
}
//creates squares and gives function to squares
function createSquare() {
    //grabs board
    let board = $("div#board");
    //creates a span
    let square = $("<span>");
    //gives the span dimensions
    square.height(150);
    square.width(150);
    //adds class of square
    square.addClass("square");
    //gives style to .square text
    square.css("padding", "5% 0").css("color", "#fff").css("font-size", "25px");
    //adds number to .square
    square.text(squareNumber);
    //gives background color to .square
    square.css("background-color", "rgb(49,99,0)");
    //when clicked go to playerGuess
    square.click(playerGuess);
    //append the square to the board
    board.append(square);
}
//creates square grid with NUM_BONES
function createGrid() {
    //display number of bones left
    $("div#remaining").text(`There are ${number} bones left!`).css("color", "#fff").css("font-size", "25px");
    //created rows
    let numRowsCreated = 0;
    while (numRowsCreated < NUM_BONES) {
        // creates columns
        let numSquaresCreated = 0;
        while (numSquaresCreated < NUM_BONES) {
            createSquare();
            numSquaresCreated++;
        }
        //creates break tag
        let breakTag = $("<br>");
        //appends it to the board making rows visible
        $("div#board").append(breakTag);
        numRowsCreated++
    }
}
//creates squares with bones
function hideBone(){
    for (let hidden = 0; hidden <= NUM_BONES; hidden++) {
        let randomNum = Math.floor(Math.random() * totalSquares);
        let randomSquare = $("span.square").eq(randomNum);
        //adds class of surprise to the square with a bone
        if (!randomSquare.hasClass("surprise")) {
            randomSquare.addClass("surprise");
        }
    }
    //square becomes non-clickable
    if (number === 0) {
        $("span.square").off("cllick");
    }
}
//action activated when a square is clicked
function playerGuess() {
    //target the span
    let clickedSpan = $(this);
    //target span with bone
    let isSurprise = clickedSpan.hasClass("surprise");
    //does it have a bone?
    if (isSurprise === true) {
        //Yes, it has a bone
        //square changes from green to brown
        //square has a bone image
        clickedSpan.css("background-color", "rgb(160,82,45)").css("background-image", "url('bone.png')").css("background-repeat", "no-repeat").css("background-position", "center").css("color", "rgb(205,133,63)");
        //bone number remaining decreases by one
        number--;
        $("div#remaining").text(`There are ${number} bones left!`).css("color", "#fff").css("font-size", "25px");
        //makes square unclickable
        clickedSpan.off("click");
    }else {
        //change color when clicked and turn click off
        clickedSpan.css("background-color", "rgb(160,82,45)");
        //makes square unclickable
        clickedSpan.off("click");
    }
    //empty block oh no! lose health
    if(isSurprise===false){
        //add random number to width
        width += generateRandomNumber();
        //get div with id progress
        let progress = $("div#progress");
        //add the width with css to progress
        progress.css("width", width+"%");
        console.log(width);
        //is width same or greater than the bar?
        if(width>=100){
            //Sard Message is Displayed
            $("div#message").text(`Sorry! You are out of health!`).css("color", "#fff").css("font-size", "25px");
            //makes rest of the square unclickable
            $("span.square").off("click");
        }
    }
    //if all bones found
    if (number === 0) {
        //Happy Message is Displayed
        $("div#message").text(`Congratulations! You have found all of the bones!`).css("color", "#fff").css("font-size", "25px");
        //makes rest of the square unclickable
        $("span.square").off("click");
    }
}

//generates a random number between (1/NUM_BONES**2) and (3/NUM_BONES**2)
function generateRandomNumber() {
    //the danger meter is increased by a random percent between (1/NUM_BONES**2) and (3/NUM_BONES**2)
    let min = (1/NUM_BONES**2)*100; //.04
    let max = (4/NUM_BONES**2)*100; //.16
    let randomPercent = Math.floor(Math.random() * (max-min) + min);
    console.log(randomPercent);
    return randomPercent;
}




