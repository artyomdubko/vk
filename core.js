
  VK.init(function() { 
  alert ("good");
     VK.callMethod("showSettingsBox", 4096+8192+262144);
  }, function() { 
  alert ("bad");
}, '5.59'); 


function addComment (){	
	 VK.api("wall.createComment", {"owner_id": "13040847","post_id": "2508","message": "aaa"}, function (data) {
		alert("Post ID:" + data.response.post_id);
		});
}
function wallPost (){	
	 VK.api("wall.post", {"message": "AAAAAA"}, function (data) {
		alert("Post ID:" + data.response.post_id);
		});
}
