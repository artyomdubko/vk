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
      var vkTimer = setInterval(function() {
          var response = getJsonFromRequest("wall.get", params);
          if (response > vk.postsCount) {
              clearInterval(vkTimer);
          }
      }, vk.requestInterval);
  }

  function addCommentToPost() {
      var params = {
          "owner_id": vk.groupId
      }
      var response = getJsonFromRequest("wall.get", params);
      vk.postsCount = response[0];
      $("#postsCount").html(response[0]);
      $("#lastPostValue").html(response[1].text.substring(0, 100)); //response[0] - posts count, response[1-...] - posts
  }

  function getGroupOrUserInfo() { //set to dropdown change
      var params = {
          "owner_id": vk.groupId
      }
      var response = "";
	  doAnAjax("wall.get", params, function(data) {
          response = data;
      vk.postsCount = response.count;
      $("#postsCount").html(vk.postsCount);
      $("#lastPostValue").html(response.items[0].text.substring(0, 100)); //response[0] - posts count, response[1-...] - posts
    });
  }
 
 
  function doAnAjax(methodName, params, callBack) {	  
      var paramsString = getParamsStringFromDictionary(params);
      var newUrl = " https://api.vk.com/method/" + methodName + "?&access_token=" + vk.accessToken + "&v=5.59&" + paramsString;
      var response = "";
      $("#requestsCount").html(parseInt($("#requestsCount").html()) + 1); //increment request count
    $.ajax({
          async: false,
          url: newUrl,
          method: methodName,
          async: false,
          crossDomain: true,
          dataType: 'jsonp',
        success: function(data, textStatus, xhr) { 
            return callBack( data );   
        },
        error: function(xhr, textStatus, errorThrown) {
            //$('.rtnMsg').html("opps: " + textStatus + " : " + errorThrown); 
            return callBack ( myRtnA ); // return callBack() with myRtna
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