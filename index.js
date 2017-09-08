var express = require('express');
var app = express();

var execSync = require('child_process').execSync;

app.get('/webhook', function (req, res) {
  //var result = execSync("git rev-list --left-right --count origin/master...origin/develop").toString()
  //var behind = parseInt(result.split(" ")[0]) > 0;
  var result = execSync("git branch -v").toString()
  result += execSync("git remote -v ").toString()
  res.send(result)
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});