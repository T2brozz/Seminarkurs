function mouseDown() {
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
