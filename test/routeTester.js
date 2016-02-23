'use strict';

var http = require('http');
var rp = require('request-promise');

var times = 100;
var count = 0;


var server = http.createServer();

server.listen(8000, function(){
  console.log('listening on port ', 8000);

  var id = pinger(5000);

});

function pinger(delay){
  return setInterval(function(){
    if (count === times){
      clearInterval(id);
    }
    count++;
    rp('http://192.168.128.47:8080/trucks?latitude=-122&longitude=34')
    .then(function(res){
      console.log('no error', JSON.parse(res));
    })
    .catch(function(err){
      console.log(err);
    });
  }, delay)
}
