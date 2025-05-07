import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const text = [["This is an example of an error message", "error"], ["This is an example of a warning message", "warning"],["This is an example of an info message", "info"]];

function randomMessage() {
  return Math.floor(Math.random() * 3);
}

let currentDepth = 0;
let currentDepth2 = 0;
let currentDepth3 = 0;
let currentDepth4 = 0;
let currentDepthCam = 0;

let currentAngle = 0;
let currentAngle2 = 0;
let currentAngle3 = 0;
let currentAngle4 = 0;

function nextDepth() {
  const value = currentDepth;
  currentDepth = (currentDepth + 0.5) % 15; 
  return value;
}
function nextDepth2() {
  const value = currentDepth2;
  currentDepth2 = (currentDepth2 + 0.5) % 15; 
  return value;
}
function nextDepth3() {
  const value = currentDepth3;
  currentDepth3 = (currentDepth3 + 0.5) % 15;
  return value;
}
function nextDepth4() {
  const value = currentDepth4;
  currentDepth4 = (currentDepth4 + 0.5) % 15;
  return value;
}
function nextDepthCam() {
  const value = currentDepthCam;
  currentDepthCam = (currentDepthCam + 0.5) % 15;
  return value;
}

function nextAngle() {
  const value = currentAngle;
  currentAngle = (currentAngle + 1) % 90; 
  return value;
}
function nextAngle2() {
  const value = currentAngle2;
  currentAngle2 = (currentAngle2 + 1) % 90; 
  return value;
}
function nextAngle3() {
  const value = currentAngle3;
  currentAngle3 = (currentAngle3 + 1) % 90; 
  return value;
}
function nextAngle4() {
  const value = currentAngle4;
  currentAngle4 = (currentAngle4 + 1) % 90; 
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
    let messageGenerator = randomMessage();
    const message = [ 
      {msg: text[messageGenerator][0],  type: text[messageGenerator][1]}
    ];
    
    socket.emit('message', message);
  }, 3000);
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Servidor escuchando en http://0.0.0.0:3000');
});
