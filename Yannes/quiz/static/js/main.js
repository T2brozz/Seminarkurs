window.onload = function() {
  canv = document.getElementById("gc"); // canvas wird geladen
  ctx = canv.getContext("2d"); //modus auf 2d setzen
  window.addEventListener('mousedown', mouseDown, false);

  document.addEventListener("mousemove", mouseMoveHandler, false);
  setInterval(chooseState, 1000 / 30);
  setInterval(timer, 100);

}


function chooseState() {
  if (state == 0) {
    menu();
    starttimer();
    UpdateAnswers();

  } else if (state == 1) {
    game();

  } else if (state == 2) {
    howto();
    starttimer();
  } else if (state == 3) {
    credits();
    starttimer();
  } else if (state == 4) {
    window.location.href = "./leaderboard";
  } else if (state == -1) {
    end("False Answer");
  } else if (state == -2) {
    end("Time is up");
  }
  mouse.click = false;
}

function menu() {
  clear_screen("#B8CFD4");
  ctx.fillStyle = "black";
  ctx.fillText("Allgemeinwissen Quiz", 300, 50)
  for (var i = 0; i < MenuButtons.length; i++) {
    MenuButtons[i].draw();
    if (MenuButtons[i].check_click(mouse.x, mouse.y, mouse.click)) {
      state = MenuButtons[i].newAction;
      questions.sort(() => Math.random() - 0.5);
    } else if (MenuButtons[i].check_hover(mouse.x, mouse.y)) {
      MenuButtons[i].bgColor = "black";

    } else {
      MenuButtons[i].bgColor = "rgb(89, 87, 87)";

    }
  }
}

function howto() {
  clear_screen("#B8CFD4");
  ctx.fillStyle = "black"
  fillTextMoreLines("How to Play:\n \n its a quiz so press PLAY \n and let's go", canv.width / 2, canv.height / 5, 25);

}

function credits() {
  clear_screen("#B8CFD4");
  ctx.fillStyle = "black"
  fillTextMoreLines("Credits:\n\n\n \nCode:T2brozz\n     Design: T2brozz \n           Color Design: Philipp\n        other stuff: T2brozz", canv.width / 4, canv.height / 2, 25);
}

function game() {
  clear_screen("#B8CFD4");
  ctx.fillStyle = "black";
  ctx.font = "25px Arial";
  fillTextMoreLines(addLinebreak(questions[question].question, 20), canv.width / 2, canv.height / 5, 25);
  ctx.fillText("points:" + points, 50, 45);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 580, map_range(secondesperquestion, 0, 10, 0, 600), 20);
  for (var i = 0; i < GameButtons.length; i++) {
    GameButtons[i].draw();
    if (GameButtons[i].check_click(mouse.x, mouse.y, mouse.click)) {

      answer = ConvertCorrectAnswer();
      if (GameButtons[i].text == "Joker") {
        applyJoker();
      } else if (i == answer) {
        question++;
        points += Math.floor(secondesperquestion);
        starttimer();
        UpdateAnswers();

      } else {
        state = -1;
      }
    } else if (GameButtons[i].check_hover(mouse.x, mouse.y)) {
      GameButtons[i].bgColor = "black";
    } else {
      GameButtons[i].bgColor = "rgb(89, 87, 87)";
    }
  }
  if (secondesperquestion <= 0) {
    state = -2;
  }
}

function end(msg = "You won") {
  clear_screen("#cce4ff");
  stoptimer();
  ctx.fillStyle = "#000000";
  ctx.fillText(msg, 250, 100);
  ctx.fillText("You had " + points + " Points", 250, 200);

  var person = prompt("Please enter your name for the leaderboard:", "");
  if (person == null || person == "") {
    window.location.href = "./";
  } else {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./newscore", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      name: person,
      score: points
    }));
    state = 0;
  }
}
