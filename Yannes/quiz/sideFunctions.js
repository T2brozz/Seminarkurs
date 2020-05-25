function starttimer() {
  secondesperquestion = 10;
  startcountdown = true;
}

function stoptimer() {
  startcountdown = false;
}

function timer() {
  if (startcountdown) {
    secondesperquestion--;
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
    ctx.fillText(lines[i], x, y + (i * betweenLines) + textSize - (lines.length / 2 * betweenLines));
  }
}

function UpdateAnswers() {
  GameButtons[0].text = addLinebreak(questions[question].A, 8)
  GameButtons[1].text = addLinebreak(questions[question].B, 8)
  GameButtons[2].text = addLinebreak(questions[question].C, 8)
  GameButtons[3].text = addLinebreak(questions[question].D, 8)
}

//https://stackoverflow.com/questions/12426118/split-a-text-to-add-a-new-line-every-n-characters-taking-care-of-spaces
function addLinebreak(text, max) { // clean the text
  text = text.replace(/  +/g, " ").replace(/^ /, "").replace(/ $/, "");
  // return empty string if text is undefined
  if (typeof text === "undefined") return "";
  // if max hasn't been defined, max = 50
  if (typeof max === "undefined") max = 50;
  // return the initial text if already less than max
  if (text.length <= max) return text;
  // get the first part of the text
  var exploded = text.substring(0, max);
  // get the next part of the text
  text = text.substring(max);
  // if next part doesn't start with a space
  if (text.charAt(0) !== " ") {
    // while the first part doesn't end with a space && the first part still has at least one char
    while (exploded.charAt(exploded.length - 1) !== " " && exploded.length > 0) {
      // add the last char of the first part at the beginning of the next part
      text = exploded.charAt(exploded.length - 1) + text;
      // remove the last char of the first part
      exploded = exploded.substring(0, exploded.length - 1);
    }
    // if the first part has been emptied (case of a text bigger than max without any space)
    if (exploded.length == 0) {
      // re-explode the text without caring about spaces
      exploded = text.substring(0, max);
      text = text.substring(max);
      // if the first part isn't empty
    } else {
      // remove the last char of the first part, because it's a space
      exploded = exploded.substring(0, exploded.length - 1);
    }
    // if the next part starts with a space
  } else {
    // remove the first char of the next part
    text = text.substring(1);
  }
  // return the first part and the exploded next part, concatenated by \n
  return exploded + "\n" + addLinebreak(text);
}
