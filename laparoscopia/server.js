import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const text = [["This is example of an error message", "error"], ["This is an example of a warning message", "warning"],["This is an example of an info message", "info"]];

function randomMessageGeneratorTest() {
  return Math.floor(Math.random() * 3);
}

let currentDepthTool1 = 0;
let currentDepthTool2 = 0;
let currentDepthTool3 = 0;
let currentDepthTool4 = 0;
let currentDepthCam = 0;

let currentAngleTool1 = 0;
let currentAngleTool2 = 0;
let currentAngleTool3 = 0;
let currentAngleTool4 = 0;

function nextDepth() {
  const value = currentDepthTool1;
  currentDepthTool1 = (currentDepthTool1 + 0.5) % 15; 
  return value;
}
function nextDepth2() {
  const value = currentDepthTool2;
  currentDepthTool2 = (currentDepthTool2 + 0.5) % 15; 
  return value;
}
function nextDepth3() {
  const value = currentDepthTool3;
  currentDepthTool3 = (currentDepthTool3 + 0.5) % 15;
  return value;
}
function nextDepth4() {
  const value = currentDepthTool4;
  currentDepthTool4 = (currentDepthTool4 + 0.5) % 15;
  return value;
}
function nextDepthCam() {
  const value = currentDepthCam;
  currentDepthCam = (currentDepthCam + 0.5) % 15;
  return value;
}

function nextAngle() {
  const value = currentAngleTool1;
  currentAngleTool1 = (currentAngleTool1 + 1) % 90; 
  return value;
}
function nextAngle2() {
  const value = currentAngleTool2;
  currentAngleTool2 = (currentAngleTool2 + 1) % 90; 
  return value;
}
function nextAngle3() {
  const value = currentAngleTool3;
  currentAngleTool3 = (currentAngleTool3 + 1) % 90; 
  return value;
}
function nextAngle4() {
  const value = currentAngleTool4;
  currentAngleTool4 = (currentAngleTool4 + 1) % 90; 
  return value;
}

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  setInterval(() => {
    const tool = [
      { depth: nextDepth(), angle: nextAngle() },
      { depth: nextDepth2(), angle: nextAngle2() },
      { depth: nextDepth3(), angle: nextAngle3() },
      { depth: nextDepth4(), angle: nextAngle4() },
    ];

    socket.emit('tool', tool);
  }, 50);

  setInterval(() => {
    const camera = nextDepthCam(); 

    socket.emit('camera', camera);
  }, 50);

  setInterval(() => {
    let messageGenerator = randomMessageGeneratorTest();
    const message = [ 
      {msg: text[messageGenerator][0],  type: text[messageGenerator][1]}
    ];
    
    socket.emit('message', message);
  }, 1000);
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Servidor escuchando en http://0.0.0.0:3000');
});
