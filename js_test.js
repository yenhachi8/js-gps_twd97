// // server.mjs
// import { createServer } from 'node:http';

// const server = createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World!\n');
// });

// // starts a simple http server locally on port 3000
// server.listen(3000, '127.0.0.1', () => {
//   console.log('Listening on 127.0.0.1:3000');
// });

// // run with `node server.mjs`


const { Trans97 } = require('trans97');
const WGS84="wgs84";
const TWD97="twd97";
// 把twd97 轉成 wgs84
const toGws84 = new Trans97({
  type: WGS84
});
// 把wgs84 轉成 twd97
const toTwd97 = new Trans97({
  type: TWD97
});

const position = toGws84.getLocation(178052.848,2501451.107);
console.log(position.lat,",", position.lng);



const twd97 = toTwd97.getLocation(22.61338465512156, 120.30166733810103);
console.log(twd97.x,",", twd97.y);

