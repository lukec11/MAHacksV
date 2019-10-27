var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require("fs");

var dataArray = {arrayOfObjects: []};

if (fs.existsSync(".data.json")) {
    var dataArray = JSON.parse(fs.readFileSync(".data.json", "utf8"));
}

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
    client.on('JSONData',function(event){ 
        console.log('Received message from client stuff!', event);
        dataArray.arrayOfObjects.push(event);
        console.log("this is the json array of objects: " + dataArray.arrayOfObjects[0].weight);
        fs.writeFileSync('.data.json', JSON.stringify(dataArray));
    });
    /*client.on('data',function(event){ 
        console.log('Received data from client!',event);
    });*/
});