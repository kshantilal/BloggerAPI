var accessToken;

function getAccessToken(){
	$.ajax({
		url: "config/config.json",
		dataType: "json",
		success: function(DataFromJSON){
			console.log(DataFromJSON.AccessToken);
			accessToken = DataFromJSON.AccessToken;
			getId();
		},
		error: function(){
			console.log("Something went wrong");
		}
	});

}

function getId(){
	$.ajax({
		url: "https://www.googleapis.com/blogger/v3/blogs/1665758190571819430?key="+accessToken,
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