var express = require('express');
var config = require('./config');
var path = require('path');
var cors = require('cors');


var app = express();
app.use(cors());

app.use(function(request, response, next){
	console.log(`${request.method} request for ${request.url}`);
	next();


});

app.use(express.static("./public"));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/config', express.static(path.join(__dirname)));



app.listen(3000);

console.log('Server is running on port 3000');