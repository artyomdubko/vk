
  VK.init(function() { 
  alert ("good");
     VK.callMethod("showSettingsBox", 0);
  }, function() { 
  alert ("bad");
}, '5.59'); 


function addComment (){	
	 VK.api("wall.createComment", {"owner_id": "-17633860","post_id": "660","message": "aaa"}, function (data) {
		alert("Post ID:" + data.response.post_id);
		});
}
function wallPost (){	
	 VK.api("wall.post", {"message": "AAAAAA", "owner_id":"-17633860", "from_group":"1"}, function (data) {
		alert("Post ID:" + data.response.post_id);
		});
}
