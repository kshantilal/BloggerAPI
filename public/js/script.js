var apiKey;
var allKeys = [];

var discoveryDocs = ["https://people.googleapis.com/$discovery/rest?version=v1"];
var clientId = '863978693509-mrknbvl68d4vpusg82gsuncjgsgqk7td.apps.googleusercontent.com';

var scopes = 'profile';

function handleClientLoad() {
	// Load the API client and auth2 library
	gapi.load('client:auth2', initClient);
}
function initClient() {
	gapi.client.init({
		apiKey: apiKey,
		discoveryDocs: discoveryDocs,
		clientId: clientId,
		scope: scopes
	}).then(function () {
	  // Listen for sign-in state changes.
	  gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
	  // Handle the initial sign-in state.
	  updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
	  authorizeButton.onclick = handleAuthClick;
	  signoutButton.onclick = handleSignoutClick;
	});
}
function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
	  authorizeButton.style.display = 'none';
	  signoutButton.style.display = 'block';
	  makeApiCall();
	} else {
	  authorizeButton.style.display = 'block';
	  signoutButton.style.display = 'none';
	}
}

function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
	gapi.auth2.getAuthInstance().signOut();
}
// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
	gapi.client.people.people.get({
	  'resourceName': 'people/me',
	  'requestMask.includeField': 'person.names'
	}).then(function(resp) {
	  var p = document.createElement('p');
	  var name = resp.result.names[0].givenName;
	  p.appendChild(document.createTextNode('Hello, '+name+'!'));
	  document.getElementById('content').appendChild(p);
	});
}



function getAccessToken(){
	$.ajax({
		url: "config/config.json",
		dataType: "json",
		success: function(DataFromJSON){
			console.log(DataFromJSON);

			allKeys.push({
				apiKey: DataFromJSON.apiKey,
				clientID: DataFromJSON.ClientID,
				clientSecret: DataFromJSON.ClientSecret
				
			})
			console.log(allKeys[0].apiKey);
			apiKey = allKeys[0].apiKey;
			getId();
		},
		error: function(){
			console.log("Something went wrong");
		}
	});

}

function getId(){
	$.ajax({
		url: "https://www.googleapis.com/blogger/v3/blogs/4002601360602175877/posts?key="+apiKey, //need a apikey
		dataType:"jsonp",
		success:function(DataFromBlogger){
			console.log(DataFromBlogger)

			
		},


		error:function(){
		 console.log("Something went wrong");
		}
	});

}

getAccessToken();