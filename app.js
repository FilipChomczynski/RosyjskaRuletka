const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"],
        Credentials: true
    }
})

app.use(express.static("public"));

let bullets = [0, 0, 0, 0, 0, 0];
let users = []
let turn;

function place_bullet() {
  const len = bullets.length;
  bullets = []
  for(let i = 0; i<len; i++) {
  	bullets.push(0);
  }
  const index = Math.floor(Math.random() * 5);
  bullets[index] = 1;
  console.log(bullets);
}

place_bullet();

io.on("connection", (socket) => {
  console.log("User connected");
  users.push(socket.id);
  console.log(users);
  if (users.length == 2) {
  	turn = users[0];
  	io.emit("turn", turn);
  }
	  socket.on("pull-trigger", () => {
	  	if (users.length == 2 && turn == socket.id){
		    console.log("Trigger pulled!");
		    const isDead = bullets[0] == 1;
		    console.log(turn);
		    if (isDead) {
		      io.emit("result", ["lost", turn]);

		    } else {
		      bullets.shift();
		      console.log(bullets);
		      io.emit("result", ["survive", turn]);
		    }
		    turn = turn == users[0] ? users[1]: users[0];
		    io.emit("turn", turn);
	    }
  	  });

  	

  socket.on("place-bullet", ()=> {
  	if (users.length == 2 && turn == socket.id){
  		place_bullet();
  	}
  })

  socket.on("disconnect", () => {
    console.log("User disconnected");
    var index = users.indexOf(socket.id);
	if (index !== -1) {
	  users.splice(index, 1);
	}
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});