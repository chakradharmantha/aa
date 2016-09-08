var http    = require("https");             
var express = require("express");          
var fs = require('fs');
var app = express();



app.use('/client',express.static(__dirname + '/client'));
app.get('/',function (req,res) {
   res.sendFile(path.join(__dirname + '/client/gum_test.html'));
});

var options = {
  key: fs.readFileSync('28071246-55.55.55.128.key'),
  cert: fs.readFileSync('28071246-55.55.55.128.cert')
};



// Start Express http server on port 8080
var webServer = http.createServer(options,app).listen(3000);
console.log("started on  3000")











 


