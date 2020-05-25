window.onload = function() {



  //let level[];
  let canv = document.getElementById("gc"); // canvas wird geladen
  let ctx = canv.getContext("2d"); //modus auf 2d setzen
  canv.width = window.innerWidth - 20;
  canv.height = window.innerHeight - 20;


  let tile_rows = 20;
  let tile_cols = 30;
  let tile_size = canv.height / tile_rows;



  document.addEventListener("keyup", keyUp);
  document.addEventListener("keydown", keyDown);
  let keys = [];
  setInterval(keyCheck, 1000 / 60);


  document.addEventListener("mousemove", mouseMoveHandler, false);
  window.addEventListener('mousedown', mousedownHandler, false);
  window.addEventListener('mouseup', mouseupHandler, false);
  let mouse_x;
  let mouse_y; //TODO variablen ordenen
  let mouse_down = false;
  let mouse_x_rect = mouse_x / tile_size;
  let mouse_y_rect = mouse_y / tile_size;



  let ingame = false




  let use_start = false; // check if start or end is used only 1 time
  let use_end = false;

  let where = 1;
  let go_nextStep = 0;


  let speed_player = 6;
  console.log(tile_size);
  let imageTiles = new Image();
  imageTiles.src = "tilemap.png";
  let playerImage = new Image();
  playerImage.src = "player.png";

  let enemyImage = new Image();
  enemyImage.src = "gegner.png";



  let map = {
    cols: tile_cols,
    rows: tile_rows,
    tiles: [



    ]


  }




  for (i = 0; i < tile_rows; i++) {
    map.tiles.push([]);
    for (j = 0; j < tile_cols; j++) {
      map.tiles[i].push(0);
    }
  }
  map.tiles.push([]);
  for (i = 0; i < map.cols; i++) {
    map.tiles[map.rows].push(4);
  }

  function tile(image = undefined, sx = 0, sy = 0, s_width = 100, s_height = 100, x, y, d_width = 100, d_height = 100, color = undefined) { //constructor
    this.x = x; // position y
    this.y = y; // Position  y
    this.image = image;
    this.sx = sx; // position bildschnipsel x
    this.sy = sy; // position bildschnipsel y
    this.s_width = s_width; //bildschnipsel breite
    this.s_height = s_height; //bildschnipsel höhe
    this.scale_width = d_width; //skalierung breite
    this.scale_height = d_height; //skalierung höhe

    this.color = color;
    this.show = function() {
      if (this.image !== undefined) {
        ctx.drawImage(image, this.sx, this.sy, this.s_width, this.s_height, this.x, this.y, this.scale_width, this.scale_height);
      } else {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.scale_width, this.scale_height);
      }
    }
    this.mouse_in_there = function() {
      if (mouse_x >= this.x && mouse_x <= this.x + this.scale_width) {
        if (mouse_y >= this.y && mouse_y <= this.y + this.scale_height) {

          return true;

        }
      }
    }
    this.draw = function(x, y) {
      if (this.image !== undefined) {
        ctx.fillStyle = background.color;
        ctx.fillRect(x, y, tile_size, tile_size);

        ctx.drawImage(image, this.sx, this.sy, this.s_width, this.s_height, x, y, tile_size, tile_size);
      } else {
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, tile_size, tile_size);

      }
    }

  }

  function moving_part(image, sx = 0, sy = 0, s_width = 100, s_height = 100, x, y, /*d_width = 100, d_height = 100,*/ vx = 0, vy = 0.5, is_enemy) {
    this.x = x; // position y
    this.y = y; // Position  y
    this.image = image;
    this.sx = sx; // position bildschnipsel x
    this.sy = sy; // position bildschnipsel y
    this.s_width = s_width; //bildschnipsel breite
    this.s_height = s_height; //bildschnipsel höhe
    //        this.scale_width = d_width; //skalierung breite
    //        this.scale_height = d_height; //skalierung höhe
    this.vx = vx;
    this.vy = vy;
    this.jump = false;
    this.is_enemy = is_enemy;
    this.move = function() {

      this.x = this.x + this.vx;
      this.y = this.y + this.vy;

      switch (map.tiles[Math.round((this.y + 0.5 * tile_size) / tile_size)][Math.round(this.x / tile_size)]) { //looks under charakter
        case 1:
          this.vy = 0;
          this.jump = false;
          break;

        case 2:
          if (this.is_enemy == false) {
            this.dead();
          }

          break;
        case 4:
          if (is_enemy === false) {


          }
          break;
        default:
          this.vy = this.vy + 0.5;

      }
      /*          if (map.tiles[Math.round((this.y + 0.5 * tile_size) / tile_size)][Math.round(this.x / tile_size)] === 1) {
                  this.vy = 0;

                } else if (map.tiles[Math.round((this.y + 0.5 * tile_size) / tile_size)][Math.round(this.x / tile_size)] === 2) {
                  for (let i = 0; i < map.rows; i++) {
                    if (map.tiles[i].indexOf(3) !== -1) {
                      this.x = map.tiles[i].indexOf(3) * tile_size;
                      console.log(map.tiles[i].indexOf(3));
                      this.y = i * tile_size - tile_size;
                      break;
                    }
                  }

                }else {
                  this.vy = 8;
                }*/

      switch (map.tiles[Math.round(this.y / tile_size)][Math.round((this.x + 0.5 * tile_size) / tile_size)]) {
        case 1:
          this.x = this.x - speed_player;

          if (this.is_enemy) {
            this.vx = -this.vx;
          }
          break;
        case 2:
          if (this.is_enemy == false) {
            this.dead();
          }
          break;
        case 4:
          if (is_enemy === false) {


          }
          break;

        default:


      }
      switch (map.tiles[Math.round(this.y / tile_size)][Math.round((this.x - 0.5 * tile_size) / tile_size)]) {
        case 1:
          this.x = this.x + speed_player;
          if (this.is_enemy) {
            this.vx = -this.vx;
          }
          break;
        case 2:
          if (this.is_enemy == false) {
            this.dead();
          }
          break;
        case 4:
          if (is_enemy === false) {


          }
          break;
        default:

      }
      if (this.is_enemy === false) {
        this.vx = 0;
      }

      /*          if (map.tiles[Math.round(this.y / tile_size)][Math.round((this.x + 0.5 * tile_size) / tile_size)] === 1) {
                  this.x = this.x - speed_player;
                  console.log("dfgh");
                }
                if (map.tiles[Math.round(this.y / tile_size)][Math.round((this.x - 0.5 * tile_size) / tile_size)] === 1) {
                  this.x = this.x + speed_player;
                  console.log("dfrrgh");
                }
                this.vx = 0;*/


      /*  switch (map.tiles[Math.round((this.y + 0.5*tile_size) / tile_size)][Math.round((this.x+tile_size) / tile_size)]) {
          case 1:
            this.vy = 0;
            this.vx = 0;
            break;
          case 2:
            this.vy =
            this.vx = 0;
            for (let i = 0; i < map.rows; i++) {
              if (map.tiles[i].indexOf(3) !== -1) {
                this.x = map.tiles[i].indexOf(3) * tile_size;
                console.log(map.tiles[i].indexOf(3));
                this.y = i * tile_size - tile_size;
                break;
              }
            }
            default:
              this.vy = 8;
        }*/
      ctx.drawImage(image, this.sx, this.sy, this.s_width, this.s_height, this.x, this.y, tile_size, tile_size);

    }
    this.dead = function() {
      if (this.is_enemy == false) {
        for (let i = 0; i < map.rows; i++) {
          if (map.tiles[i].indexOf(3) !== -1) {
            this.x = map.tiles[i].indexOf(3) * tile_size;
            console.log(map.tiles[i].indexOf(3));
            this.y = i * tile_size - tile_size;
            break;
          }
        }
        this.jump = false;
      }
    }
  }
  let background = new tile(undefined, 0, 0, 0, 0, 0 /*x*/ , 0 /*y*/ , tile_size * map.cols, canv.height, "#cfffd3");


  let player = new moving_part(playerImage, 0, 0, 100, 100, 0, 0, 0, 8, false);


  let enemys_1 = [];

  let tiles = 4; // how many tiles assets per row
  let size_asset = canv.height / (tiles + 1) // +1 for rubber
  let blue = new tile(imageTiles, 0, 0, 100, 100, canv.width - size_asset, 0, size_asset, size_asset); //map array = 1
  let red = new tile(imageTiles, 0, 101, 100, 100, canv.width - size_asset, 1 * size_asset, size_asset, size_asset); //map array = 2
  let start = new tile(imageTiles, 101, 101, 100, 100, canv.width - size_asset, 2 * size_asset, size_asset, size_asset); //map array = 3
  let end = new tile(imageTiles, 101, 0, 100, 100, canv.width - size_asset, 3 * size_asset, size_asset, size_asset); //map array = 4
  let enemy_pic = new tile(enemyImage, 0, 0, 100, 100, canv.width - (2 * size_asset), 0, size_asset, size_asset); // map array =5

  let rubber = new tile(undefined, 0, 0, 0, 0, canv.width - size_asset, 4 * size_asset, size_asset, size_asset, "#cfffd3");


  let menu_in = setInterval(menu, 1000 / 30);




  function menu() {


    switch (where) {
      case 1:
        clearInterval(menu_in);
        background.show();
        initate_editor();

        break;
      case 2:
        clearInterval(menu_in);
        initate_game();

        break;
    }
  }




  function initate_editor() {
    background.show();



    for (i = 0; i < map.rows; i++) { // draw tiles
      for (j = 0; j < map.cols; j++) {
        if (map.tiles[i][j] == 1) {
          blue.draw(j * tile_size, i * tile_size);
        } else if (map.tiles[i][j] == 2) {
          red.draw(j * tile_size, i * tile_size);
        } else if (map.tiles[i][j] == 3) {
          start.draw(j * tile_size, i * tile_size);
        } else if (map.tiles[i][j] == 4) {
          end.draw(j * tile_size, i * tile_size);
        } else if (map.tiles[i][j] == 5) {
          enemy_pic.draw(j * tile_size, i * tile_size);
        }
      }
    }
    //delete enemys instances in enemys_1
    enemys_1.splice(0,enemys_1.length);

    ingame = false;
    let using_block = "";

    setInterval(editor, 1000 / 30);

    function editor() {

      if (where !== 1) {
        clearInterval(editor);
      } else {


        blue.show(); //wand
        red.show(); //kill
        start.show(); //start
        end.show();; //end
        rubber.show();
        enemy_pic.show();
        if (mouse_down) {
          draw_pics();
        }

      }
    }

    function draw_pics() {


      if (blue.mouse_in_there()) { //TODO alle .is_used in Funktion
        console.log("b");
        using_block = "blue";


      } else if (red.mouse_in_there()) {
        console.log("r");
        using_block = "red";


      } else if (start.mouse_in_there()) {
        console.log("start");
        using_block = "start";


      } else if (end.mouse_in_there()) {
        console.log("end");
        using_block = "end";

      } else if (rubber.mouse_in_there()) {
        console.log("rubber");
        using_block = "rubber";
      } else if (enemy_pic.mouse_in_there()) {
        console.log("enemy");
        using_block = "enemy";
      }
      // looks if mouse click item buttons

      if (mouse_x < map.cols * tile_size - 25 && mouse_y < map.rows * tile_size - 25) { // FIXME maus in kästchen bleiben
        console.log(using_block);
        if (using_block === "rubber") {
          rubber.draw(mouse_x_rect * tile_size, mouse_y_rect * tile_size);
          map.tiles[mouse_y_rect][mouse_x_rect] = 0;

        } else if (using_block === "blue") {
          blue.draw(mouse_x_rect * tile_size, mouse_y_rect * tile_size);
          map.tiles[mouse_y_rect][mouse_x_rect] = 1;

        } else if (using_block === "red") {
          red.draw(mouse_x_rect * tile_size, mouse_y_rect * tile_size);
          map.tiles[mouse_y_rect][mouse_x_rect] = 2;

        } else if (using_block === "start") { //TODO use start and end only 1 time/map

          for (let i = 0; i < map.rows; i++) {
            if (map.tiles[i].indexOf(3) !== -1) {
              use_start = true;
              break;
            }
          }
          if (use_start === false) {

            start.draw(mouse_x_rect * tile_size, mouse_y_rect * tile_size);
            map.tiles[mouse_y_rect][mouse_x_rect] = 3;
            console.log(mouse_x_rect * tile_size);
          }


        } else if (using_block === "end") {
          for (let i = 0; i < map.rows; i++) {
            if (map.tiles[i].indexOf(4) !== -1) {
              use_end = true;
              break;
            }
          }
          if (use_end === false) {

            end.draw(mouse_x_rect * tile_size, mouse_y_rect * tile_size);
            map.tiles[mouse_y_rect][mouse_x_rect] = 4;
          }
        } else if (using_block === "enemy") {
          enemy_pic.draw(mouse_x_rect * tile_size, mouse_y_rect * tile_size);
          map.tiles[mouse_y_rect][mouse_x_rect] = 5;


        } //draw special image on screen
      }
    }
  }



  function initate_game() {

    ingame = true;
    ctx.fillStyle = "white";

    background.show();

    for (i = 0; i < map.rows; i++) { // draw tiles
      for (j = 0; j < map.cols; j++) {
        if (map.tiles[i][j] == 1) {
          blue.draw(j * tile_size, i * tile_size);
        } else if (map.tiles[i][j] == 2) {
          red.draw(j * tile_size, i * tile_size);
        } else if (map.tiles[i][j] == 3) {
          start.draw(j * tile_size, i * tile_size);
        } else if (map.tiles[i][j] == 4) {
          end.draw(j * tile_size, i * tile_size);
        }
      }
    }

    for (let i = 0; i < map.rows; i++) { //set player to start
      if (map.tiles[i].indexOf(3) !== -1) {
        player.x = map.tiles[i].indexOf(3) * tile_size;
        console.log(map.tiles[i].indexOf(3));
        player.y = i * tile_size;
        break;
      }
    }

    console.log("player postion = green block");

    for (i = 0;i<map.rows;i++) {
      for (j=0;j<map.cols;j++) {
        if (map.tiles[i][j] == 5) {
          //enemy.push([element * tile_size, i * tile_size]);
          enemys_1.push(new moving_part(enemyImage, 0, 0, 100, 100, j*tile_size,i*tile_size, -2, 8, true));

        }
      }
    }
    console.log("created enemy instances");

    ///new moving_part(enemyImage, 0, 0, 100, 100, 100, 100, 5, 0);



    console.log("finish");
    setInterval(game, 1000 / 60);

    function game() {
      if (where !== 2) {
        clearInterval(game);
      } else {
        background.show();
        for (i = 0; i < map.rows; i++) {
          for (j = 0; j < map.cols; j++) {
            if (map.tiles[i][j] == 0) {
              rubber.draw(j * tile_size, i * tile_size);
            } else if (map.tiles[i][j] == 1) {
              blue.draw(j * tile_size, i * tile_size);

            } else if (map.tiles[i][j] == 2) {
              red.draw(j * tile_size, i * tile_size);
            } else if (map.tiles[i][j] == 3) {
              start.draw(j * tile_size, i * tile_size);
            } else if (map.tiles[i][j] == 4) {
              end.draw(j * tile_size, i * tile_size);
            }

          }


        }
        player.move();
        for (i = 0; i < enemys_1.length; i++) {
          enemys_1[i].move();


          if (enemys_1[i].x < player.x + tile_size &&
            enemys_1[i].x + tile_size > player.x &&
            enemys_1[i].y < player.y + tile_size &&
            enemys_1[i].y + tile_size > player.y) {

            player.dead();
          }

        }

      }
    }
  }


  function keyUp(event) {
    keys.splice(keys.indexOf(event.keyCode), 1);
  }

  function keyDown(event) {
    if (keys.includes(event.keyCode) === false) {
      keys.push(event.keyCode);
    }
  }

  function keyCheck() {
    if (keys.includes(32) && player.jump === false) { // space to jump
      player.vy = player.vy - 10;
      player.jump = true;
    }
    if (keys.includes(39)) { //arrow left to go left
      player.vx = speed_player;
    }
    if (keys.includes(37)) { //arrow right to go right
      player.vx = -speed_player;
    }
    if (keys.includes(13) && use_start && use_end && ingame === false) { //start to test the game
      for (i = 0; i < map.rows; i++) { // console log the map in numbers
        let text = "";
        for (j = 0; j < map.cols; j++) {
          text = text.concat(map.tiles[i][j].toString());
        }
        console.log(text);
      }


      go_nextStep = 1;
      where = 2;
      ctx.fillRect(0, 0, canv.width, canv.heigh);
      initate_game();
    }
    if (keys.includes(81) && ingame) { //Q to quit game and go to editor
      where = 1;
      initate_editor();
      console.log("jzhguzg");

    }

  }


  function mouseMoveHandler(e) {
    let relativeX = e.clientX - canv.offsetLeft;
    let relativey = e.clientY - canv.offsetLeft;

    if (relativeX > 0 && relativeX < canv.width) {
      mouse_x = relativeX;
      mouse_x_rect = Math.round(mouse_x / tile_size);
    }

    if (relativey > 0 && relativey < canv.height) {
      mouse_y = relativey;
      mouse_y_rect = Math.round(mouse_y / tile_size);
    }
    //console.log(mouse_x_rect + " : " + mouse_y_rect);
  }


  function mousedownHandler() {
    mouse_down = true;
  }



  function mouseupHandler() {
    mouse_down = false;
  }


}
