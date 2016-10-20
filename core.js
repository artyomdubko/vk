 
 var vk = {
	 appId : $('#AppId').val(),
     currentUrl : window.location.href,
      accessToken : window.location.href
 }
 $(document).ready(function () {
    if(window.location.href.indexOf("access_token") > -1) {
		 vk.accessToken = newurl.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
	   $("#accessTokenId").html( "Access token:" + accessToken);
    }
});
 function getToken() {
	  var newurl = "https://oauth.vk.com/authorize?client_id="+vk.appId+"&display=page&redirect_uri=https://artyomdubko.github.io/vk&scope=friends,wall,groups &response_type=token&v=5.59";
	   window.location.replace(newurl);   
	    
 }