var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {

});

app.post('/', function (req, res) {
  fs.writeFile("/data/data.json", JSON.stringify(req.body.data), function() {
    console.log("Data saved.");
  });
});

app.listen(8888, function () {
  console.log('Server listening on port 8888!');
});
