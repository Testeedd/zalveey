var express = require('express');
var http = require('http');
var app = express();

let db = require("quick.db")
let serv = new db.table("serverConfig")

// Glitch Ping
app.use(express.static('public'));
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  console.log("Ping Received [" + new Date(Date.now()).toISOString().replace(/T/, ' ').replace(/\..+/, '') + "]");
    response.sendStatus(200);
});

// Request Listener
var listener = app.listen(process.env.PORT, function() {
  console.log('This App Is Listening To Port: ' + listener.address().port);
});
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

app.get('/api/prefix', function(request, response) {
    response.send(serv.get("prefix"));
});

app.get('/api/prefix/:guildid', function(request, response) {
  let guild = request.params.guildid
  let guildprefix = serv.get(`prefix.${guild}`)
  if (!guildprefix) return response.send({error:"no_prefix"})
    response.send(serv.get("prefix"));
});
