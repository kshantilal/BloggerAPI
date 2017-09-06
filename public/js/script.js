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
