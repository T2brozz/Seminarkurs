let state = 0 //0=menu; 1=game
let mouse = {
  x: 0,
  y: 0,
  click: false
};
let question = 0;
window.onload = function() {
  canv = document.getElementById("gc"); // canvas wird geladen
  ctx = canv.getContext("2d"); //modus auf 2d setzen
  window.addEventListener('mousedown', mouseDown, false);
  window.addEventListener('mouseup', mouseUp, false);

  document.addEventListener("mousemove", mouseMoveHandler, false);
  setInterval(chooseState, 1000 / 30); // Wiederholung von der function game 120 mal in der Sekunde ( 120 fps)

  new Button(100, 100, "Play", 200, 100, "grey", "blue", 40, 1, true);

  new Button(100, 200, "A", 200, 100, "grey", "blue", 30, 1, false);
  new Button(325, 200, "B", 200, 100, "grey", "blue", 30, 1, false);
  new Button(100, 325, "C", 200, 100, "grey", "blue", 30, 1, false);
  new Button(325, 325, "D", 200, 100, "grey", "blue", 30, 1, false);

}


function chooseState() {
  if (state == 0) {
    menu();
  } else if (state == 1) {
    game();
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
  for (var i = 0; i < 4; i++) {
    GameButtons[i].draw();
    if (GameButtons[i].check_mouse(mouse.x, mouse.y, mouse.click)) {
      answer = ConvertCorrectAnswer();
      if (i == answer) {
        question++;
      }
    }
  }
}

function ConvertCorrectAnswer() {
  correctAnswer = questions[question].correctAnswer;
  answer = 0
  if (correctAnswer == "A") {
    answer = 0;
  } else if (correctAnswer == "B") {
    answer = 1;
  } else if (correctAnswer == "C") {
    answer = 2;
  } else if (correctAnswer == "D") {
    answer = 3;
  }
  return answer;
}

function fillTextMoreLines(text, x, y, textSize) {
  var betweenLines = 30;
  var lines = text.split('\n');
  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + (i * betweenLines) + textSize-(lines.length/2*betweenLines));
  }
}

function UpdateAnswers() {
  GameButtons[0].text = addLinebreak(questions[question].A, 8)
  GameButtons[1].text = addLinebreak(questions[question].B, 8)
  GameButtons[2].text = addLinebreak(questions[question].C, 8)
  GameButtons[3].text = addLinebreak(questions[question].D, 8)
}

function addLinebreak(string, maxlen) {
  stringArray = string.split("");
  if (string.length > maxlen) {
    stringArray.splice(maxlen, 0, "\n");
    return stringArray.join('');
  } else {
    return string;
  }
}

function mouseDown() {
  mouse.click = false;
}

function mouseUp() {
  mouse.click = true;
}

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canv.offsetLeft;
  let relativey = e.clientY - canv.offsetLeft;

  if (relativeX > 0 && relativeX < canv.width) {
    mouse.x = relativeX;
  }

  if (relativey > 0 && relativey < canv.height) {
    mouse.y = relativey;

  }
}
