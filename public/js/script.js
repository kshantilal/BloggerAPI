var ApiKey,clientIdJSON,clientSecret;

var allKeys = [];


function getAccessToken(){
	$.ajax({
		url: "config/config.json",
		dataType: "json",
		success: function(DataFromJSON){
			// console.log(DataFromJSON);

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
		type: "get",
		dataType:"jsonp",
		success:function(DataFromBlogger){
			// console.log(DataFromBlogger.items[0].content);
			
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
	console.log("send form");
	var content = $("#content").val();
	var title = $("#title").val();
	console.log(title);
	var url = "http://localhost:3000/createPost";
	console.log(content);

	if (title.length == 0) {
		alert("Please insert a title for your blog");
	}

	if (content.length == 0) {
		alert("Please fill out your message");
		return;
	}if(content.length > 200){
		alert("Must be less than 200 characters");
		return;

	}
	$.ajax({
		url: "http://localhost:3000/createPost",
		type: "post",
		data: {title: $("#title").val(), content: $("#content").val()},
		dataType: "json",
		success: function(DataFromBlogger){
			console.log(DataFromBlogger);
			// getAccessToken();
			window.location = DataFromBlogger;

		},
		error: function(error){
			console.log(error);
		}
	});


});

getAccessToken();