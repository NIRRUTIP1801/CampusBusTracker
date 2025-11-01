const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });


// In-memory store for demo (use DB in production)
const buses = {}; // { busId: { lat, lon, speed, timestamp } }


app.post('/api/bus/update', (req, res) => {
const { busId, lat, lon, speed } = req.body;
if (!busId || !lat || !lon) return res.status(400).json({ error: 'busId, lat, lon required' });


buses[busId] = { lat, lon, speed: speed || 0, ts: Date.now() };


// emit real-time update to connected clients
io.emit('bus_location', { busId, lat, lon, speed: buses[busId].speed, ts: buses[busId].ts });
return res.json({ status: 'ok' });
});


app.get('/api/bus/:id', (req, res) => {
const b = buses[req.params.id];
if (!b) return res.status(404).json({ error: 'unknown bus' });
return res.json({ busId: req.params.id, ...b });
});


io.on('connection', (socket) => {
console.log('client connected', socket.id);
// send current positions
socket.emit('initial_state', buses);


socket.on('disconnect', () => console.log('client disconnected', socket.id));
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server listening on ${PORT}`));