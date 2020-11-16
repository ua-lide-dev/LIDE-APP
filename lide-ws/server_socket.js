const WebSocket = require('ws');

const ws = new WebSocket.Server({ port: 3636 });

ws.on('connection', function connection(ws) {
  
  console.log(">connected")
  dockerSocket = new WebSocket('ws://localhost:2375/containers/dcf03dbe63293b86dfda81d72dddfd12b6cef3e9b929a9a577375acc46ebee31/attach/ws?stream=1&stdout=1&stdin=1&logs=1');

  dockerSocket.on('open', function open() {
    console.log(">successfully connected to docker api");
    dockerSocket.send("\n");
  });

  dockerSocket.on('message', function incoming(output) {
    console.log(">received from docker : " + output);
    ws.send(output);
  });

  ws.on('message', function incoming(input) {
     console.log('received from web: %s', input);
     dockerSocket.send(input);
  });
 
dockerSocket.on('close', function close() {
    console.log('>disconnected from docker');
    ws.send("connection docker lost");
    ws.close();
  });

});

console.log(" WS listening on port 3636 ");
