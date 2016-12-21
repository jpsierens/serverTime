var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');
var html = fs.readFileSync('index.html', 'utf8');

var app = http.createServer(function handler (req, res) {
    // HTTP server code always serves index.html file
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html, 'utf8'));
    res.end(html);
}).listen(8080);

// Upgrade regular HTTP server to Socket.IO server
var io = socketio.listen(app);

// every 1000 secs;
setInterval(function tick () {
    // Send time to all connected sockets
    var now = new Date().toUTCString();
    io.sockets.send(now);
}, 1000);
