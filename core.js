
  VK.init(function() { 
  alert ("good");
     VK.callMethod("showSettingsBox", 8192);
  }, function() { 
  alert ("bad");
}, '5.59'); 


function addComment (){	
	 VK.api("wall.createComment", {"owner_id": "-17633860","post_id": "657","message": "AAAAAA"}, function (data) {
		alert("Post ID:" + data.response.post_id);
		});
}
function wallPost (){	
	 VK.api("wall.post", {"message": "AAAAAA"}, function (data) {
		alert("Post ID:" + data.response.post_id);
		});
}
