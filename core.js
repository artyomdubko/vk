 var appId=$('#AppId
 var currentUrl = window.location.href;
 var accessToken = window.location.href;
 
 function getToken() {
	  var newurl = "https://oauth.vk.com/authorize?client_id="+appId+"&display=page&redirect_uri=https://artyomdubko.github.io/vk&scope=friends,wall,groups &response_type=token&v=5.59";
	 var url = 'http://localhost:3000/_oauth/google#access_token=ya29.5HxuYol1Io8JLeGePDznbfkkwu_PC4uodKwG8_1clFYAn9AgdOV1WGpOTNQP3s76HAsn7Y4zWw&token_type=Bearer&expires_in=3600',
      accessToken = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
	  $("#accessTokenId").html( "Access token:" + accessToken);
	   
 }