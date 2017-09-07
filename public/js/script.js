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
			console.log(DataFromBlogger.items[0].content);


			for (var i = 0; i < DataFromBlogger.items.length; i++) {
				$("#BlogContainer").append("<div class='blog-container_divs'>"+
					"<div class='divs_pic'>"+DataFromBlogger.items[i].title+"</div>"+
					"<div class='divs_text'>"+DataFromBlogger.items[i].content+"</div>"+
				"</div>")
			}	
		},


		error:function(){
		 console.log("Something went wrong");
		}
	});

}





$("#SendTweet").submit(function(event){
	event.preventDefault();

	var message = $("#post-message").val();
	var url = "http://localhost:3000";
	console.log(message);

	if (message.length == 0) {
		alert("Please fill out your message");
		return;
	}else if(message.length > 200){
		alert("Must be less than 200 characters");
		return;

	}else{
		url += "/bloggerMessage=" + message;

	}

	// $.ajax({
	// 	url: url,
	// 	dataType: "json",
	// 	type: "post",
	// 	success: function(dataPost){
	// 		console.log(dataPost);
			
	// 	},
	// 	error: function(){
	// 		console.log("error");
			
	// 	}

	// });

	$.ajax({
		url: "/getURL",
		dataType: "json",
		beforeSend: function(xhr){
			if (xhr.overrideMimeType) {
				xhr.overrideMimeType("application/json");
			}
		},
		success: function(dataFromTerminal){
			console.log(dataFromTerminal);
			// getAccessToken();
			window.load = dataFromTerminal;


		},
		error: function(){
			console.log("Not getting url");
		}
	});

});


