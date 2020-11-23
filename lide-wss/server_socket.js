const WebSocket = require('ws');

const ws = new WebSocket.Server({ port: 3636 });

ws.on('connection', function connection(ws) {
  console.log("> connected");

  let dockerSocket;
  let containerId;
  let firstMessage = true;

  ws.on('message', function incoming(input) {
    if (firstMessage) {
      containerId = input;
      
      dockerSocket = new WebSocket('ws://localhost:2375/containers/' + containerId + '/attach/ws?stream=1&stdout=1&stdin=1');

      dockerSocket.on('open', function open() {
        console.log("> successfully connected to docker api");
        dockerSocket.send("\n");
      });
    
      dockerSocket.on('message', function incoming(output) {
        ws.send(output);
      });
     
      dockerSocket.on('close', function close() {
        console.log('> disconnected from docker');
        ws.close();
      });

      firstMessage = false;
    }
    else {
      dockerSocket.send(input);
    }

  });
});

ws.on('close', function close() {
  console.log('> client disconnected');
});

console.log(" WS listening on port 3636 ");
