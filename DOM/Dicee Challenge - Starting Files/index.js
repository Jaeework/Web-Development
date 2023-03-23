// dice 1
var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var diceImage1 = "images/dice" + randomNumber1 + ".png";
var dice1 = document.querySelector(".img1");
dice1.setAttribute("src", diceImage1);

// dice 2
var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var diceImage2 = "images/dice" + randomNumber2 + ".png";
var dice2 = document.querySelector(".img2");
dice2.setAttribute("src", diceImage2);

// change title
var title = document.querySelector("h1");
if (randomNumber1 > randomNumber2) {
    title.innerText = "🚩 Player 1 Wins!";
} else if (randomNumber1 < randomNumber2) {
    title.innerText = "Player 2 Wins! 🚩";
} else {
    title.innerText = "Draw!";
}