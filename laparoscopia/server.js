import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});


function randomtoolPositionGeneratorTest() {
  return Math.floor(Math.random() * 2);
}

let currentDepthTool1 = 0;
let currentDepthTool2 = 2;
let currentDepthTool3 = 4;
let currentDepthTool4 = 8;
let currentDepthCam = 0;

let currentAngleTool1 = 0;
let currentAngleTool2 = 30;
let currentAngleTool3 = 60;
let currentAngleTool4 = 80;

function nextDepthTool1() {
  currentDepthTool1 += 0.5;
  if (currentDepthTool1 >= 15) {
    currentDepthTool1 = 0;
  }
  return currentDepthTool1;
}
function nextDepthTool2() {
  currentDepthTool2 += 0.5;
  if (currentDepthTool2 >= 15) {
    currentDepthTool2 = 0; 
  }
  return currentDepthTool2;
}
function nextDepthTool3() {
  currentDepthTool3 += 0.5;
  if (currentDepthTool3 >= 15) {
    currentDepthTool3 = 0; 
  }
  return currentDepthTool3;
}
function nextDepthTool4() {
  currentDepthTool4 += 0.5;
  if (currentDepthTool4 >= 15) {
    currentDepthTool4 = 0; 
  }
  return currentDepthTool4;
}
function nextDepthCam() {
  currentDepthCam += 0.5;
  if (currentDepthCam >= 15) {
    currentDepthCam = 0; 
  }
  return currentDepthCam;
}

function nextAngleTool1() {
  currentAngleTool1 += 0.5;
  if (currentAngleTool1 >= 90) {
    currentAngleTool1 = 0; 
  }
  return currentAngleTool1;
}
function nextAngleTool2() {
  currentAngleTool2 += 0.5;
  if (currentAngleTool2 >= 90) {
    currentAngleTool2 = 0; 
  }
  return currentAngleTool2;
}
function nextAngleTool3() {
  currentAngleTool3 += 0.5;
  if (currentAngleTool3 >= 90) {
    currentAngleTool3 = 0; 
  }
  return currentAngleTool3;
}
function nextAngleTool4() {
  currentAngleTool4 += 0.5;
  if (currentAngleTool4 >= 90) {
    currentAngleTool4 = 0; 
  }
  return currentAngleTool4;
}

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  setInterval(() => {
    const tool = [
      { depth: nextDepthTool1(), angle: nextAngleTool1(), position: 3},
      { depth: nextDepthTool3(), angle: nextAngleTool3(), position: 1},
      { depth: nextDepthTool2(), angle: nextAngleTool2(), position: 4},
      { depth: nextDepthTool4(), angle: nextAngleTool4(), position: 2},
    ];

    socket.emit('tool', tool);
  }, 200);

  setInterval(() => {
    const camera = nextDepthCam(); 

    socket.emit('camera', camera);
  }, 200);

  setInterval(() => {

    const messages = [
      {text: "This is an example of an info message",  type: "info", toolPosition: 2},
      {text: "This is an example of an error message",  type: "error", toolPosition: 3},
      {text: "This is an example of an info message",  type: "info", toolPosition: 4},
      {text: "This is an example of an error message",  type: "error", toolPosition: 0},  
      {text: "This is an example of a warning message",  type: "warning", toolPosition: 1},
      ];
    socket.emit('messages', messages);
  }, 1000);
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Servidor escuchando en http://0.0.0.0:3000');
});
