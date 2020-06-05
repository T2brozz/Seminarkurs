let beeren = [{
  x: 0,
  y: 0
}];
let schneggepos = {
  x: 0,
  y: 0
};
let maus = {
  x: 0,
  y: 0
};
let inBewegung = false;

let beere = new Image();
beere.src = 'beere.png';
let schnegge = new Image();
let gras = new Image();
let rabe = new Image();

schnegge.src = 'garry.png';
gras.src = 'gras.jpg';
rabe.src = 'rabe.png';
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseClickHandler, false);
window.onload = function() {
  canv = document.getElementById("gc"); // Canvas aus HTML Teil ansteuern
  ctx = canv.getContext("2d"); // Kontext zum "zeichnen" festlegen
  setInterval(draw, 1000 / 30);
}

function draw() {
  ctx.drawImage(gras, 0, 0);
  ctx.drawImage(rabe, (canv.width / 2) - 32, (canv.height / 2) - 32);
  for (var i = 0; i < beeren.length; i++) {
    ctx.drawImage(beere, beeren[i].x - 16, beeren[i].y - 16);

  }
  ctx.drawImage(schnegge, schneggepos.x, schneggepos.y);
  if (inBewegung) {
    var angleDeg = Math.atan2(beeren[beeren.length - 2].y - beeren[beeren.length - 1].y, beeren[beeren.length - 2].x - beeren[beeren.length - 1].x);
    schneggepos.x = schneggepos.x + -(1 * Math.cos(angleDeg));
    schneggepos.y = schneggepos.y + -(1 * Math.sin(angleDeg));
  }
  if (schneggepos.x < beeren[beeren.length - 1].x + 16 && schneggepos.x > beeren[beeren.length - 1].x - 16 && schneggepos.y < beeren[beeren.length - 1].y + 16 && schneggepos.y > beeren[beeren.length - 1].y - 16) {
    inBewegung = false;
  }

  if (Math.sqrt(Math.pow(schneggepos.x - (canv.width / 2) - 32, 2) + Math.pow(schneggepos.y - (canv.height / 2) - 32, 2)) <= 100) {
    alert("GaMe oVeR!1!")
  }
}

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canv.offsetLeft;
  let relativey = e.clientY - canv.offsetLeft;
  if (relativeX > 0 && relativeX < canv.width) {
    maus.x = relativeX;
  }
  if (relativey > 0 && relativey < canv.height) {
    maus.y = relativey;
  }
}

function mouseClickHandler() {
  if (inBewegung == false) {
    inBewegung = true;
    beeren.push({
      x: maus.x,
      y: maus.y
    });
  }
}
