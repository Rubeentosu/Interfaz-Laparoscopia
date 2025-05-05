import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const text = ["Mensaje1", "Mensaje2", "Mensaje3"];

function randomMessage() {
  return Math.floor(Math.random() * 3);
}

// Variables que almacenan el estado incremental
let currentDepth = 0;
let currentAngle = 0;

function nextDepth() {
  const value = currentDepth;
  currentDepth = (currentDepth + 0.1) % 15; // reinicia al llegar a 20
  return value;
}

function nextAngle() {
  const value = currentAngle;
  currentAngle = (currentAngle + 0.5) % 90; // reinicia al llegar a 45
  return value;
}

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  setInterval(() => {
    const instrument = [
      { depth: nextDepth(), angle: nextAngle() },
      { depth: nextDepth(), angle: nextAngle() },
      { depth: nextDepth(), angle: nextAngle() },
      { depth: nextDepth(), angle: nextAngle() }
    ];

    socket.emit('instrument', instrument);
  }, 50);

  setInterval(() => {
    const camera = nextDepth(); // También puedes hacer que esto crezca si lo deseas

    socket.emit('camera', camera);
  }, 200);

  setInterval(() => {
    const numInstrument = 3;

    socket.emit('numInstrument', numInstrument);
  }, 200);

  setInterval(() => {
    const msg = text[randomMessage()];

    socket.emit('msg', msg);
  }, 200);
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Servidor escuchando en http://0.0.0.0:3000');
});
