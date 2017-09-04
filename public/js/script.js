function getAccessToken(){
	$.ajax({
		url: "config/config.json",
		dataType: "json",
		success: function(DataFromJSON){
			console.log(DataFromJSON);
		},
		error: function(){
			console.log("Something went wrong");
		}
	});

}

getAccessToken();