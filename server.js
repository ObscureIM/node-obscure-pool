var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("website"))
//Initialize the app

var url = '0.0.0.0:8117'
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  })

app.get('/stats',function(req,res) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
         res.send(xhttp.responseText)
      }
  };
  url = url + '/stats'
  xhttp.open("GET", url, true);
  xhttp.send();
})
