let MenuButtons = [];
let GameButtons = [];
class Button {
  constructor(x, y, text, width, height, bgColor, txtColor, txtSize, action, menu) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.textSize = txtSize;
    this.bgColor = bgColor;
    this.txtColor = txtColor;
    this.newAction = action;
    if (menu) {
      MenuButtons.push(this);

    } else {
      GameButtons.push(this);
    }
  }
  draw() {
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.textAlign = "center";
    ctx.font = String(this.textSize) + "px Arial";
    ctx.fillStyle = this.txtColor;
    fillTextMoreLines(this.text, this.x + this.width/2, this.y+this.height/2 ,Number(this.textSize));
  }
  check_mouse(x, y, click) {
    if (this.x < x && this.x + this.width > x &&
      this.y < y && this.y + this.height > y) {
      if (click) {
        return true;
      }
    }
  }

}
