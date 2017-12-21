const express = require('express');
//Socket.io
var app = express();
var http = require('http');
var server = http.Server(app);

var socketIO = require('socket.io');
var io = socketIO(server);

//APIAI GOOGLE
var apiai = require('apiai');
var appAI = apiai("f6d61fd8a3ba40e5aaf3b28e73099875"); //<your client access token>

const socketPort = process.env.PORT || 3100;

io.on('connection', (socket) => {

    socket.on('new_message', (message) => {
      console.log(io.sockets.name);
      console.log("on api socket");
      console.log(message);
      io.emit('new_message',message);
    });

    socket.on('new_notification', (message) => {
      console.log("*****************************");
      console.log(message);
      io.emit('new_notification',message);
    });

    socket.on('new_apiai_messge', (message) => {
      // APIAI GOOGLE ----------------------->>
      console.log('MY SEND MESSAGE IS ', message);

      if(message == 'WELCOME'){
        var event = {
            name: "WELCOME"
        };

        var options = {
            sessionId: '12112017'
        };

        var request = appAI.eventRequest(event, options);

        request.on('response', function(response) {
            console.log(response.result.fulfillment.speech);
            message = response.result.fulfillment.speech;
            io.emit('new_apiai_messge',response.result.fulfillment.speech);
        });

        request.on('error', function(error) {
            console.log(error);
        });

        request.end();

      }else{

        var request = appAI.textRequest(message, {      //<Your text query>
          sessionId: '12112017'                        //<unique session id>
        });
        request.on('response', function(response) {
          console.log('my respont through socket');
            console.log(response.result.fulfillment.speech);
            message = response.result.fulfillment.speech;
            io.emit('new_apiai_messge',response.result.fulfillment.speech);
        });

        request.on('error', function(error) {
            console.log(error);
        });

        request.end();
      }
      console.log(io.sockets.name);
      console.log(" on api socket");
      console.log(this.messageOut);
      //<<----------------------- APIAI GOOGLE

    });

});

server.listen(socketPort, () => {
    console.log(`started on port: ${socketPort}`);
});

module.exports = io;
