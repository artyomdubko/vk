  var vk = {
      appId: $('#AppId').val(),
      groupId: "",
      postsCount: "",
      currentUrl: window.location.href,
      requestInterval: 500, //by default
      currentUrlWithoutAnything: (location.protocol + '//' + location.host + location.pathname).replace(/\/$/, ""),
      accessToken: ""
  }
  $(document).ready(function() {
      vk.appId = $('#AppId').val();
      vk.requestInterval = $('#requestInterval').val();
      if (vk.currentUrl.indexOf("access_token") > -1) {
          vk.accessToken = vk.currentUrl.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1]; //check if we redirected with token
          $("#accessTokenId").html("Access token:" + vk.accessToken);
          addOrRemoveDisableForArray($('.getting-auth').children(), true)
      } else {
          addOrRemoveDisableForArray($('.getting-auth').children(), false)
      }
  });

  function redirectToGetToken() {
      var redirectUrl = "https://oauth.vk.com/authorize?client_id=" + vk.appId +
          "&display=page&redirect_uri=" + vk.currentUrlWithoutAnything +
          "&scope=friends,wall,groups&response_type=token&v=5.59";
      window.location.replace(redirectUrl);
  }

  function addOrRemoveDisableForArray(array, choise) { //choise - bool 
      array.each(function() {
          $(this).prop('disabled', choise);
      });
  }

  function startProcess() {
      vk.groupId = $("#wallId").val();
      getGroupOrUserInfo();
	  setTimeout(function(){ 
	     
	  
	  }, vk.requestInterval);
  }

  function getGroupOrUserInfo() {
      var params = {
          "owner_id": vk.groupId
      }
      var reponse = getJsonFromRequest("wall.get", params);
      vk.postsCount = response[0];
      $("#postsCount").html(response[0]);
      $("#lastPostValue").html(response[1].text.substring(0, 100));	   //response[0] - posts count, response[1-...] - posts
  }

  function getParamsStringFromDictionary(paramsDictionary) {
      var paramsString = "";
      for (key in paramsDictionary) {
          var value = paramsDictionary[key];
          paramsString += key + "=" + value + "&";
      }
      return paramsString
  }

  function getJsonFromRequest(methodName, params) {
      var paramsString = getParamsStringFromDictionary(params);
      var url = " https://api.vk.com/method/" + methodName + "?" + paramsString;
      var response = "";
      $.when(ajaxRequest(url)).done(function(data) {
          var response = data.response;
          $("#requestsCount").html ($("#requestsCount").val()+1);
      });

  }



  function ajaxRequest(url) {
      return $.ajax({
          url: url,
          method: "GET",
          crossDomain: true,
          dataType: 'jsonp'
      });
  }