// Simple simulator: posts incremental locations to the server every 2s
const axios = require('axios');


const SERVER = 'http://localhost:3000';
const BUS_ID = 'bus-101';


// start position (example)
let lat = 17.4300;
let lon = 78.4250;
let step = 0.0003; // small movement per tick


setInterval(async () => {
lat += (Math.random() - 0.5) * step;
lon += (Math.random() - 0.5) * step;
try {
await axios.post(`${SERVER}/api/bus/update`, { busId: BUS_ID, lat, lon, speed: 25 });
console.log('posted', { lat, lon });
} catch (e) {
console.error('err posting', e.message);
}
}, 2000);