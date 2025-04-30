import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
const text = ["Mensaje1", "Mensaje2", "Mensaje3", "Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4Mensaje4"];
function rngM() {
  return Math.floor(Math.random() * 4);
}
function rngA() {
  return Math.floor(Math.random() * 45);
}
function rngD() {
  return Math.floor(Math.random() * 20);
}
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  setInterval(() => {
    const instrument = [
      { depth: rngD(), ln: rngA() },
      { depth: rngD(), ln: rngA() },
      { depth: rngD(), ln: rngA() },
      { depth: rngD(), ln: rngA() }
    ];

    socket.emit('instrument', instrument);
  }, 200);
  setInterval(() => {
    const camera = rngD();

    socket.emit('camera', camera);
  }, 200);
  setInterval(() => {
    const numInstrument = 3;

    socket.emit('numInstrument', numInstrument);
  }, 200);
  setInterval(() => {
    const msg = text[rngM()];

    socket.emit('msg', msg);
  }, 2000);
});


server.listen(3000, '0.0.0.0', () => {
  console.log('Servidor escuchando en http://0.0.0.0:3000');
});




