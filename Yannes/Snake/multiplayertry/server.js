const express = require('express');
const http = require('http');
const fs =require('fs');

const port = 3000;

var da = fs.readFileSync('/public/constants.js', 'utf8');
console.log(da);
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
let rooms = [];
let freeplayers = [];
let playerIDs = [];
app.use(express.static('public'))
class Player {
  constructor(ID, socket) {
    this.ID = ID
    this.socket = socket;
    this.vel = {
      x: 0,
      y: 0
    };
    this.applepos = {
      x: 0,
      y: 0
    }
    this.pos = [];
    this.points = 0;
    freeplayers.push(this);

  }
}
class Room {
  constructor(ID) {
    this.ID = ID;
    this.players = [];
    this.players.push(this.host);
    rooms.push(this);
    this.ingame = false;
  }
}






io.on('connection', socket => {
  while (true) {
    let ID = Math.floor(Math.random() * (10000 - 1000) + 1000);
    if (playerIDs.includes(ID) !== false) {
      new Player(ID, socket);
      socket.emit("LOGIN", {
        ID: ID
      });
      break;
    }
  }

  socket.on("Create", data => {
    for (i = 0; i < freeplayers.length; i++) {
      if (freeplayers[i].socket === socket) {
        ID = freeplayers[i].ID;
        freeplayers.splice(i, 1);
      }
    }
    new Room(ID).players.push(new Player(ID, socket));
    socket.emit("Create", {
      MSG: "Room created",
      ID: ID
    });
  });
  socket.on("Join", data => {
    HOSTID = data.HOSTID;
    for (i = 0; i < freeplayers.length; i++) {
      if (freeplayers[i].socket === socket) {
        ID = freeplayers[i].ID;
        for (j = 0; j < rooms.length; j++) {
          if (rooms[i].ID === HOSTID) {
            rooms[j].players.push(new Player(ID, socket));
            freeplayers.splice(i, 1);
            socket.emit("joined", {
              MSG: "Add to Room"
            });
          }
        }
      }
    }
  });
  socket.on("GameStart", data => {
    room = 0;
    appleX = 0;
    appleY = 0;
    for (i = 0; i < rooms.length; i++) {
      for (j = 0; j < rooms[i].players.length; j++) {
        if (rooms[i].players[j].socket === socket) {
          room = i;
          appleX = getRandom().x;
          appleY = getRandom().y;


        }
      }
    }
    for (i = 0; i < rooms[room].players.length; i++) {
      rooms[room].players[j].pos.push(getRandom());
      rooms[room].players[j].applepos.x = appleX;
      rooms[room].players[j].applepos.y = appleY;

    }
  });
});

socket.on("Move", data => {

  player = 0;
  for (i = 0; i < rooms.length; i++) {
    for (j = 0; j < rooms[i].players.length; j++) {
      if (rooms[i].players[j].socket === socket) {
        player = j;
        rooms[i].players[j].vel.x = data.vel.x;
        rooms[i].players[j].vel.y = data.vel.y;
        rooms[i].players[j].pos = data.pos;
      }
    }
    for (j = 0; j < rooms[i].players.length; j++) {
      rooms[i].players[j].socket.emit("Move", {
        vel: rooms[i].players[player].vel,
        pos: rooms[i].players[player].pos
      });
    }
  }


});



function getRandom() {
  x = Math.floor(Math.random() * max_size);
  y = Math.floor(Math.random() * max_size);%
  return {
    x: x,
    y: y
  };
}




server.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${server.address().port}`);
})
