  var vk = {
      appId: $('#AppId').val(),
      currentUrl: window.location.href,
      accessToken: null
  }
  $(document).ready(function() {
      vk.appId = $('#AppId').val();
      vk.currentUrl = window.location.href;
	  var newUrl=window.location.href;
      if (newUrl.indexOf("access_token") > -1) {
          vk.accessToken = newUrl.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
          $("#accessTokenId").html("Access token:" + accessToken);
      }
  });

  function getToken() {
      var redirectUrl = "https://oauth.vk.com/authorize?client_id=" + vk.appId + "&display=page&redirect_uri=https://artyomdubko.github.io/vk&scope=friends,wall,groups &response_type=token&v=5.59";
      window.location.replace(redirectUrl);
  }