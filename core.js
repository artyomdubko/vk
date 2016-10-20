  var vk = {
      appId: $('#AppId').val(),
      currentUrl: window.location.href,
      currentUrlWithoutAnything: (location.protocol + '//' + location.host + location.pathname).replace(/\/$/, ""),
      accessToken: null
  }
  $(document).ready(function() {
      vk.appId = $('#AppId').val(); 
      if (vk.currentUrl.indexOf("access_token") > -1) {
          vk.accessToken = vk.currentUrl.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];    //check if we redirected with token
          $("#accessTokenId").html("Access token:" + vk.accessToken);
		  $('.getting_auth').hide();
      }
	  else{
		  $('.getting_auth').show();
	  }
  });

  function redirectToGetToken() {   
      var redirectUrl = "https://oauth.vk.com/authorize?client_id=" + vk.appId + 
	  "&display=page&redirect_uri="+ vk.currentUrlWithoutAnything +
	  "&scope=friends,wall,groups&response_type=token&v=5.59";
      window.location.replace(redirectUrl);
  }