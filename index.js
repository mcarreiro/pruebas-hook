var express = require('express');
var app = express();

var execSync = require('child_process').execSync;

execSync("git clone https://github.com/mcarreiro/pruebas-hook").toString()

app.get('/webhook', function (req, res) {
  var result = execSync("git --git-dir=pruebas-hook/.git rev-list --left-right --count origin/master...origin/develop").toString()
  var behind = parseInt(result.split(" ")[0]) > 0;
  res.send("Behind" + result)
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});