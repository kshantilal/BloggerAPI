var express = require('express');
var config = require('./config');
var path = require('path');
var cors = require('cors');
var readline = require('readline');


var app = express();


var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var plus = google.plus('v1');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var tokens;
var authCode;

var oauth2Client = new OAuth2(
	config.ClientID,
	config.ClientSecret,
	"http://localhost:3000"
);


function getAccessToken (oauth2Client, callback) {
	// generate consent page url
	var url = oauth2Client.generateAuthUrl({
		access_type: 'online', // will return a refresh token
		scope: 'https://www.googleapis.com/auth/blogger' // can be a space-delimited string or an array of scopes
	});
	return url;
	// console.log('Visit the url: ', url);
	// rl.question('Enter the code here:', function (code) {
	// 	// request access token
	// 	oauth2Client.getToken(code, function (err, tokens) {
	// 		if (err) {
	// 			return callback(err);
	// 		}
	// 		// set tokens to the client
	// 		// TODO: tokens should be set by OAuth2 client.
	// 		oauth2Client.setCredentials(tokens);
	// 		console.log(tokens.access_token);
	// 		authCode = tokens.access_token;

	// 		callback();
	// 	});
	// });
}

// retrieve an access token
getAccessToken(oauth2Client, function () {
	// retrieve user profile
	plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
		if (err) {
			return console.log('An error occured', err);
		}
		console.log(profile.displayName, ':', profile.tagline);
	});
});




function getOAuthClient() {
    return new OAuth2(config.ClientID, config.ClientSecret, "http://localhost:3000/allPosts");
}

function getAuthUrl() {
    var oauth2Client = getOAuthClient();
    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/blogger'
    });
    return url;
}

//make another get request to allPosts
// app.get("/allPosts", function(req, res){})


app.get("/getURL", function(req, res){
	var params = {
        name: "sample",
        auth: getAuthUrl()
    };
     res.json(params.auth);

});



app.post("/bloggerMessage=:message", function(request, response){
	var message = request.params.message;
	var params = {q:message};
	console.log(message);
});


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




