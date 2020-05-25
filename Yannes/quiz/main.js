let state = 0 //0=menu; 1=game
let mouse = {
  x: 0,
  y: 0,
  click: false
};
let points = 0;
let secondesperquestion = 10;
let question = 0;
let startcountdown = false;
window.onload = function() {
  canv = document.getElementById("gc"); // canvas wird geladen
  ctx = canv.getContext("2d"); //modus auf 2d setzen
  window.addEventListener('mousedown', mouseDown, false);
  window.addEventListener('mouseup', mouseUp, false);

  document.addEventListener("mousemove", mouseMoveHandler, false);
  setInterval(chooseState, 1000 / 30);
  setInterval(timer, 1000);
  new Button(100, 100, "Play", 200, 100, "grey", "blue", 40, 1, true);

  new Button(100, 200, "A", 200, 100, "grey", "blue", 30, 1, false);
  new Button(325, 200, "B", 200, 100, "grey", "blue", 30, 1, false);
  new Button(100, 325, "C", 200, 100, "grey", "blue", 30, 1, false);
  new Button(325, 325, "D", 200, 100, "grey", "blue", 30, 1, false);

}


function chooseState() {
  if (state == 0) {
    menu();
    starttimer();
  } else if (state == 1) {
    game();

  } else if (state == 2) {
    lose();
  }
  mouse.click = false;
}

function menu() {
  ctx.fillStyle = "red"
  ctx.fillRect(0, 0, canv.width, canv.height);

  for (var i = 0; i < MenuButtons.length; i++) {
    MenuButtons[i].draw();
    if (MenuButtons[i].check_mouse(mouse.x, mouse.y, mouse.click)) {
      state = MenuButtons[i].newAction;
      questions.sort(() => Math.random() - 0.5);
    }
  }
}

function game() {
  ctx.fillStyle = "green"
  ctx.fillRect(0, 0, canv.width, canv.height);
  UpdateAnswers();

  ctx.fillStyle = "black"
  ctx.font = "25px Arial"
  fillTextMoreLines(addLinebreak(questions[question].question, 20), canv.width / 2, canv.height / 5, 25);
  ctx.fillText("points:" + points, 50, 45);
  ctx.fillText("Time left:" + secondesperquestion, 500, 45)

  for (var i = 0; i < 4; i++) {
    GameButtons[i].draw();
    if (GameButtons[i].check_mouse(mouse.x, mouse.y, mouse.click)) {
      answer = ConvertCorrectAnswer();
      if (i == answer) {
        question++;
        points++;
        starttimer();
      } else {
        state = 2;
      }
    }
  }
  if (secondesperquestion <= 0) {
    state = 2;
  }
}

function lose() {
  ctx.fillStyle = "red"
  ctx.fillRect(0, 0, canv.width, canv.height);
  stoptimer();
  console.log("losssse");
}
