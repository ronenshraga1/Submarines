const express = require("express");
const http = require("http");
const { createElement } = require("react");
let bodyParser = require('body-parser');
const port = process.env.PORT || 4001;
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
let userOne='',user2;
let turnOne=true;
let turnTwo=false;



io.on("connection", (socket) => {
  console.log("New client connected"+socket.id);
  if(userOne===''){
      userOne = socket.id;
      io.to(userOne).emit('start','your turn');
  }
  else{
      user2 = socket.id;
      io.to(user2).emit('start','other user turn wait for alert for your turn');
  }
socket.on('tbl',function (tbl) {
    if(tableOne.length===0 && userOne!==''){
        tableOne =tbl;
        console.log(tableOne);
        console.log('sec tbl');
    }else{
        tableTwo=tbl;
        console.log(tableTwo);
    }
    socket.emit('setid',socket.id);
});
socket.on('attack',function(id){
    let count =0;
    if(socket.id===userOne && turnOne===true){
        for(let row =0;row<10;row++){
            for(let col =0;col<10;col++){
                if(count===parseInt(id)){
                    if(tableTwo[row][col]===true){
                        tableTwo[row][col] = false;
                        console.log(tableTwo[row][col]);
                        socket.emit('hit',true);
                    }else{
                        socket.emit('hit',false);
                        turnOne = false;
                        turnTwo = true;
                        console.log('alert1');
                        io.to(user2).emit('turn','your turn');
                    }
                }
                count++;
            }
        }
    } else if(socket.id===userOne && turnOne===false){
        socket.emit('hit','not your turn');
    } 
    if(socket.id===user2 && turnTwo===true){
        for(let row =0;row<10;row++){
            for(let col =0;col<10;col++){
                if(count===parseInt(id)){
                    if(tableOne[row][col]===true){
                        tableOne[row][col]=false;
                        console.log(tableOne[row][col]);
                        socket.emit('hit',true);
                    }else{
                        socket.emit('hit',false);
                        turnTwo=false;
                        turnOne =true;
                        console.log('alert2');
                        io.to(userOne).emit('turn','your turn');
                    }
                }
                count++;
            }
        }

    }
    else if(socket.id===user2 && turnTwo===false){
        socket.emit('hit','not your turn');
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
            io.emit('won',`user ${socket.id} won`,socket.id);
        }
});



 
  socket.on("disconnect", () => {
      if(socket.id===userOne){
        tableOne =[];
        userOne='';
    }else{
      tableTwo=[];
      user2='';
    }
    console.log("Client disconnected");
  });
});



server.listen(port, () => console.log(`Listening on port ${port}`));
