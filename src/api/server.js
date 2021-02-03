const express = require("express");
const http = require("http");
const { createElement } = require("react");
let bodyParser = require('body-parser');
const port = process.env.PORT || 4001;
const index = require("../Board/edit");
let cors = require('cors');
const { Socket } = require("dgram");
var jsonParser = bodyParser.json()

  
const app = express();
// parse application/json
app.use(bodyParser.json());
const corsOptions = {
    origin: '*',   
    methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
    credentials: true,               
    allowedHeaders: "Content-Type, Authorization, X-Requested-With, Accept",
  }
  app.options('*', cors(corsOptions))
  app.use(cors(corsOptions));


  
const server = http.createServer(app);
const io = require("socket.io")(server,{
    
        cors: {
          origin: "*",
          methods: ["GET", "POST"]
        }
});

let tableOne=[],tableTwo=[];
let userOne,User2;
let turnOne=true
let turnTwo=false;
let queue = [];    // list of sockets waiting for peers
let rooms = {};    // map socket.id => room
let allUsers = {}; // map socket.id => socket

var findPeerForLoneSocket = function(socket) {
    // this is place for possibly some extensive logic
    // which can involve preventing two people pairing multiple times
    if (queue) {
        // somebody is in queue, pair them!
        let peer = queue.pop();
        let room = socket.id + '#' + peer.id;
        // join them both
        peer.join(room);
        socket.join(room);
        // register rooms to their names
        rooms[peer.id] = room;
        rooms[socket.id] = room;
        // start game
        peer.emit('game start', {'name': socket.id, 'room':room});
        socket.emit('game start', {'name': peer.id, 'room':room});
    } else {
        // queue is empty, add our lone socket
        queue.push(socket);
    }
}
const gameover =(socket)=>{
    let userOneWon = true,userTwoWon=true;
        for(let row =0;row<10;row++){
            for(let col =0;col<10;col++){
                if(tableOne[row][col] === true){
                    userOneWon = false;
                }
            }
        }
        for(let row =0;row<10;row++){
            for(let col =0;col<10;col++){
                if(tableTwo[row][col] === true){
                    userTwoWon = false;
                }
            }
        }
        console.log(userOneWon,userTwoWon);
        if(userOneWon || userTwoWon){
            socket.broadcast.emit('won',`user ${socket.id} won`);
        }
}

io.on("connection", (socket) => {
  console.log("New client connected"+socket.id);
  if(userOne===undefined){
      userOne = socket.id;
  }
  else{
      user2 = socket.id;
  }
socket.on('tbl',function (tbl) {
    console.log(tbl);
    if(tableOne.length===0){
        tableOne =tbl;
    }else{
        tableTwo=tbl;
    }
});
socket.on('attack',function(id){
    let count =0;
    if(socket.id===userOne ){
        for(let row =0;row<10;row++){
            for(let col =0;col<10;col++){
                if(count===parseInt(id)){
                    if(tableTwo[row][col]===true){
                        tableTwo[row][col] = false;
                        console.log(tableTwo[row][col]);
                        socket.emit('hit',true);
                    }else{
                        socket.emit('hit',false);
                    }
                }
                count++;
            }
        }
    }else{
        for(let row =0;row<10;row++){
            for(let col =0;col<10;col++){
                if(count===parseInt(id)){
                    if(tableOne[row][col]===true){
                        tableOne[row][col]=false;
                        console.log(tableOne[row][col]);
                        socket.emit('hit',true);
                    }else{
                        
                        socket.emit('hit',false);
                    }
                }
                count++;
            }
        }

    }
    let userOneWon = true,userTwoWon=true;
        for(let row =0;row<10;row++){
            for(let col =0;col<10;col++){
                if(tableOne[row][col] === true){
                    userOneWon = false;
                }
            }
        }
        for(let row =0;row<10;row++){
            for(let col =0;col<10;col++){
                if(tableTwo[row][col] === true){
                    userTwoWon = false;
                }
            }
        }
        console.log(userOneWon,userTwoWon);
        if(userOneWon || userTwoWon){
            console.log('check');
            io.emit('won',`user ${socket.id} won`);
        }
});



 
  socket.on("disconnect", () => {
      tableTwo=[];
      tableOne =[];
    console.log("Client disconnected");
  });
});



server.listen(port, () => console.log(`Listening on port ${port}`));
