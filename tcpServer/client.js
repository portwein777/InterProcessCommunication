var api = {};
global.api = api;
api.net = require('net');

var socket = new api.net.Socket();
var user;
var result=[];
socket.connect({
  port: 2000,
  host: '127.0.0.1',
}, function() {
  socket.on('data', function(data) {
    var message = JSON.parse(data);
    console.log(message);
    console.log('Data received (by client): ' + message);
    message.task.map(function(item) {
      result.push(item * 2);
    });
    socket.write(JSON.stringify(result));
    console.log(result);
  });
});