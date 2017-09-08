var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var execSync = require('child_process').execSync;

execSync("git clone https://github.com/mcarreiro/pruebas-hook").toString()
execSync("git --git-dir=pruebas-hook/.git fetch").toString()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/webhook', function (req, res) {
  var result = execSync("git --git-dir=pruebas-hook/.git rev-list --left-right --count origin/master...origin/develop").toString()
  var behind = parseInt(result.split(" ")[0]) > 0;
  res.send("Behind: " + behind)
});

app.post('/webhook', function (req, res) {
  var head = req.body.pull_request.head.ref
  var base = req.body.pull_request.base.ref
  var result = execSync("git --git-dir=pruebas-hook/.git rev-list --left-right --count origin/"+base+"...origin/"+head).toString()
  
  var behind = parseInt(result.split(" ")[0]) > 0;
  console.log(req.body)
  res.send("Behind: " + behind)
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});