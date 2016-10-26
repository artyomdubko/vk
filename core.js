  var vk = {
      appId: $('#AppId').val(),
      groupId: "",
      postsCount: "",
      comment: "",
      currentUrl: window.location.href,
      requestInterval: 500, //by default
      currentUrlWithoutAnything: (location.protocol + '//' + location.host + location.pathname).replace(/\/$/, ""),
      accessToken: ""
  }
  $(document).ready(function() {
      if (vk.currentUrl.indexOf("access_token") > -1) {
          vk.accessToken = vk.currentUrl.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1]; //check if we redirected with token
          $("#accessTokenId").html("Access token:" + vk.accessToken);
          addOrRemoveDisableForArray($('.getting-auth').children(), true)
      } else {
          addOrRemoveDisableForArray($('.getting-auth').children(), false)
      }
  });
 