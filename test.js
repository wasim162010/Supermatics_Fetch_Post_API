var express = require('express')
  app = express()
  server = require('http').createServer(app);
  
server.listen(8080);

app.get('/:id', function (req, res) {
  var id = req.params.id;
  res.end("Received parameter:"+id);
  console.log('id='+id);
});