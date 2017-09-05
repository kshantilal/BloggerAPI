var ApiKey,clientIdJSON,clientSecret;

var allKeys = [];

function getAccessToken(){
	$.ajax({
		url: "config/config.json",
		dataType: "json",
		success: function(DataFromJSON){
			console.log(DataFromJSON);

			allKeys.push({
				apiKey: DataFromJSON.apiKey,
				clientId: DataFromJSON.ClientID,
				clientSec: DataFromJSON.ClientSecret
				
			})
			//All these variables are named at the top
			ApiKey = allKeys[0].apiKey;
			clientIdJSON = allKeys[0].clientId;
			clientSecret = allKeys[0].clientSec;
			
			
			//Runs the function getId
			getId();
		},
		error: function(){
			console.log("Something went wrong");
		}
	});

}

function getId(){
	$.ajax({
		url: "https://www.googleapis.com/blogger/v3/blogs/4002601360602175877/posts?key="+ApiKey, //need a apikey
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
// http://localhost:3000/?code=4/JJXYEa-n_Foh_rBvRPGsuzabRkzcMjJCLUBQrgd9rz0#

//Google authentication stuff
var discoveryDocs = ["https://people.googleapis.com/$discovery/rest?version=v1"];
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
var scopes = "profile";

handleClientLoad();

function handleClientLoad(){
  // Loading the Google Client JavaScript Authentication Library
  gapi.load('client:auth2', initClient);
}

function initClient(){
  // Using the config keys to access the api
  gapi.client.init({
      apiKey: ApiKey,
      discoveryDocs: discoveryDocs,
      clientId: clientIdJSON,
      scope: scopes
  }).then(function (){
    // Checking whether user is signed in
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handling the existing sign-in state, in case user is already signed in.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

    // Click function for sign in/sign out buttons
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

function updateSigninStatus(isSignedIn){
  // If user is signed in, show/hide authentication sign buttons
  if (isSignedIn) {
    // Hide sign in, show sign out.
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    makeApiCall();
  } else {
    // Hide sign out, show sign in.
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

// This is where authentication is called
function handleAuthClick(event){
  gapi.auth2.getAuthInstance().signIn();
}

// This is the sign out function
function handleSignoutClick(event){
  gapi.auth2.getAuthInstance().signOut();
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall(){
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