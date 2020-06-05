//Button Arrays for Menu and for Game
let MenuButtons = [];
let GameButtons = [];

let state = 0 //0=menu; 1=game; 2=how to play; 3=credits; -x=lose page
let mouse = { // mouse variables
  x: 0,
  y: 0,
  click: false
};
let points = 0; // game points
let secondesperquestion = 10; // seconds for one question
let question = 0; // question index
let startcountdown = false; // countdown state

//sounds
var clickSound = new Audio('../static/sounds/click.wav');
var hoverSound = new Audio('../static/sounds/hover.wav');
// Menubuttons
new Button(150, 100, "Play", 300, 100, "rgb(89, 87, 87)", "white", "rgb(89,87,87)", 40, 1, true);
new Button(150, 225, "How to Play", 300, 100, "rgb(89, 87, 87)", "white", "rgb(89,87,87)", 40, 2, true);
new Button(150, 350, "Credits", 300, 100, "rgb(89, 87, 87)", "white", "rgb(89,87,87)", 40, 3, true);
new Button(150, 475, "Ranking", 300, 100, "rgb(89, 87, 87)", "white", "rgb(89,87,87)", 40, 4, true);

//GameButtons
new Button(100, 200, "A", 200, 100, "rgb(89, 87, 87)", "white", "rgb(89,87,87)", 30);
new Button(325, 200, "B", 200, 100, "rgb(89, 87, 87)", "white", "rgb(89,87,87)", 30);
new Button(100, 325, "C", 200, 100, "rgb(89, 87, 87)", "white", "rgb(89,87,87)", 30);
new Button(325, 325, "D", 200, 100, "rgb(89, 87, 87)", "white", "rgb(89,87,87)", 30);
new Button(450, 450, "Joker", 100, 100, "rgb(89, 87, 87)", "white", "rgb(89,87,87)", 30);
