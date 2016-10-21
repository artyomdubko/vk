  var vk = {
      appId: $('#AppId').val(),
      groupId: "",
      currentUrl: window.location.href,
      requestInterval: window.location.href,
      currentUrlWithoutAnything: (location.protocol + '//' + location.host + location.pathname).replace(/\/$/, ""),
      accessToken: ""
  }
  $(document).ready(function() {
      vk.appId = $('#AppId').val();
      vk.requestInterval = $('#requestInterval').val();
      if (vk.currentUrl.indexOf("access_token") > -1) {
          vk.accessToken = vk.currentUrl.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1]; //check if we redirected with token
          $("#accessTokenId").html("Access token:" + vk.accessToken);
          addOrRemoveDisableForArray($('.getting_auth').children(), true)
      } else {
          addOrRemoveDisableForArray($('.getting_auth').children(), false)
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
  }

  function getGroupOrUserInfo() {
      var params = {
          "owner_id": vk.groupId
      }
      getJsonFromRequest("wall.get", params);
  }

  function getJsonFromRequest(methodName, params) {
      var parsedParametres = getParamsStringFromDictionary(params);
      var url = " https://api.vk.com/method/" + methodName + "?" + parsedParametres;


      $.ajax({
          url: url,
          method: "GET",
          async: false,
          crossDomain: true,
          dataType: 'jsonp',
          success: function(data) {
			  $("#postsCount").html(data.response[0]);
			  $("#lastPostValue").html(data.response[1].text.substring(0, 100));	               
          },
          error: function(data) {
              console.log(data.d);
          }
      });
  }

  function getParamsStringFromDictionary(paramsDictionary) {
      var paramsString = "";
      for (key in paramsDictionary) {
          var value = paramsDictionary[key];
          paramsString += key + "=" + value + "&";
      }
      return paramsString
  }