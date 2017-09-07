var express = require('express');
var config = require('./config');
var path = require('path');
var cors = require('cors');
var readline = require('readline');


var app = express();


var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var plus = google.plus('v1');
var blogger = google.blogger('v3');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var authCode;

// var oauth2Client = new OAuth2(
// 	config.ClientID,
// 	config.ClientSecret,
// 	"http://localhost:3000/allPosts"
// );

app.use(cors());

app.use(function(request, response, next){
	console.log(`${request.method} request for ${request.url}`);
	next();


});

//make another get request to allPosts

app.post('/createPost', blogPost);
app.get('/allPosts', blogCallback);
var body;
function blogPost(req, res, next){
	body = req.body;
	var params = {
        // name: "sample",
        auth: getAuthUrl()
    };
     res.json(params.auth);

}


// app.get("/getURL", function(req, res){
// 	;

// });



app.post("/bloggerMessage=:message", function(request, response){
	var message = request.params.message;
	var params = {q:message};
	console.log(message);
});

function getOAuthClient() {
    return new OAuth2(config.ClientID, config.ClientSecret, "http://localhost:3000/allPosts");
}

function getAuthUrl() {
    var oauth2Client = getOAuthClient();
    var url = oauth2Client.generateAuthUrl({
        access_type: 'online',
        scope: 'https://www.googleapis.com/auth/blogger'
    });
    return url;
}

// function getAccessToken (oauth2Client, callback) {
// 	// generate consent page url
// 	var url = oauth2Client.generateAuthUrl({
// 		access_type: 'online', // will return a refresh token
// 		scope: 'https://www.googleapis.com/auth/blogger' // can be a space-delimited string or an array of scopes
// 	});
// 	return url;
// }
var tokens;
// retrieve an access token
function blogCallback(req, res){
	var oauth2Client = getOAuthClient();
	var code = req.query.code;
	oauth2Client.getToken(code, function(err, tokens){

		if (!err) {
			oauth2Client.setCredentials(tokens);
			blogger.posts.insert({
				auth: oauth2Client,
				blogId: '4002601360602175877',
				resource: {
					title: req.query.title,
					content: req.query.content
				}

			}, function(){
				return res.redirect('/');
			});

		} else{
			console.log("error getting blogger API token", err);
		}

	});
	// getAccessToken(oauth2Client, function () {
	// 	// retrieve user profile
	// 	plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
	// 		if (err) {
	// 			return console.log('An error occured', err);
	// 		}
	// 		console.log(profile.displayName, ':', profile.tagline);
	// 	});
	// });

}




app.use(express.static("./public"));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/config', express.static(path.join(__dirname)));



app.listen(3000);

console.log('Server is running on port 3000');




