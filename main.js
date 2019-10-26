var express = require('express');
var app = express();
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/www/index.html');
});

app.use(express.static(__dirname + '/www'));

http.listen(3000, function(){
  console.log('listening on *:3000');
});