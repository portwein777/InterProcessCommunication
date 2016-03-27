var api = {};
global.api = api;
api.net = require('net');

var task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];
var results = [];
var sockets = 4;
var currentID = 1;
var readyResultCount = 0;
var concreateSocketTask = task.length/sockets;

var server = api.net.createServer(function(socket) {
  console.log('Connected: ' + socket.localAddress);
  var taskPackage = {
    id: currentID,
    task : task.slice(concreateSocketTask*(currentID-1),concreateSocketTask*currentID)
  };
  currentID++;
  console.log(taskPackage);
  socket.write(JSON.stringify(taskPackage));

  socket.on('data', function(data) {
    data = JSON.parse(data);
    console.log('Data received (by server): ' + data);
    readyResultCount++;
    data.map(function(item) {
      results.push(item);
    })
    if(readyResultCount == sockets){
      console.log("Ready result: "+results);
    }
  });
}).listen(2000);
