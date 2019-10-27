var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require("fs");

app.get('/', function(req, res){
	res.sendFile(__dirname + '/www/index.html');
});

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/www'));

http.listen(3000, function(){
	console.log('listening on *:3000');
});

var socket = io.listen(http);

io.on('connection', function(client) {  
	console.log('Client connected...');

	client.on('join', function(data) {
		console.log(data);
		client.emit('hello', 'Hello from server');
	});
	client.on('message',function(event){ 
        console.log('Received message from client!',event);
    });
    /*client.on('data',function(event){ 
        console.log('Received data from client!',event);
    });*/
});