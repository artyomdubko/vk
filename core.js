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
      checkUrlForToken(vk.currentUrl);
  });

  function getAuthTokenFromUrl() {
      var urlWithToken = $('#authTokenUrl').val();
      checkUrlForToken(urlWithToken);
  }

  function checkUrlForToken(url) {
      if (url.indexOf("access_token") > -1) {
          vk.accessToken = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1]; //check if we redirected with token
          $("#accessTokenId").html("Access token:" + vk.accessToken);
          addOrRemoveDisableForArray($('.getting-auth').children(), true)
      } else {
          addOrRemoveDisableForArray($('.getting-auth').children(), false)
      }
  }

  function redirectToGetToken() {
      vk.appId = $('#AppId').val();
      var redirectUrl = "https://oauth.vk.com/authorize?client_id=" + vk.appId +
          "&display=page&redirect_uri=https://oauth.vk.com/blank.html" +
          "&scope=friends,wall,groups,messages&response_type=token&v=5.59";
      window.open(redirectUrl);
  }

  function addOrRemoveDisableForArray(array, choise) { //choise - bool 
      array.each(function() {
          $(this).prop('disabled', choise);
      });
  }

  function startProcess() {
      vk.requestInterval = parseInt($('#requestInterval').val());
      vk.groupId = $("#wallId").val();
      vk.comment = $("#commentText").val();
      getGroupOrUserInfo(vk.groupId, true);
  }


  function getGroupOrUserInfo(groupId, isFirstTime) { //set to dropdown change
      var params = {
          "owner_id": groupId
      }
      var response = "";
      doAnAjax("GET", "wall.get", params, function(data) {
          if (!data.error) {
              response = data.response;
              if (!isFirstTime && response.count > vk.postsCount) {
                  handleNewPost(response, vk.groupId, response.items[0].id, vk.comment);
              } else {
                  setTimeout(function() {
                      getGroupOrUserInfo(groupId, false)
                  }, vk.requestInterval);
              }
              vk.postsCount = response.count;
              $("#postsCount").html(vk.postsCount);
              $("#lastPostValue").html(response.items[0].text.substring(0, 100)); //response[0] - posts count, response[1-...] - posts 
          } else {
              alert(data.error.error_code + data.error.error_msg);
          }
      });
  }

  function handleNewPost(newPostResponse, groupId, postId, commentText) {
      if ($('#addCommentCheckbox').is(":checked")) {
          var params = {
              "owner_id": groupId,
              "post_id": postId,
              "message": commentText
          }
          var response = "";
          doAnAjax("POST", "wall.createComment", params, function(data) {
              if (!data.error) {
                  response = data.response;
              } else {
                  alert(data.error.error_code + data.error.error_msg);
              }
          });
      }
      if ($('#openLinkCheckbox').is(":checked")) {
          var lastPostArray = newPostResponse.items[0].text.replace(/\n/g, " ").split(" ");
          lastPostArray.forEach(function(entry) {
              if (isURL(entry)) {
                  window.open(entry);
              }
          });
      }

  }


  function doAnAjax(type, methodName, params, callBack) {
      var paramsString = getParamsStringFromDictionary(params);
      var newUrl = " https://api.vk.com/method/" + methodName + "?&access_token=" + vk.accessToken + "&v=5.59&" + paramsString;
      var response = "";
      $("#requestsCount").html(parseInt($("#requestsCount").html()) + 1); //increment request count


      $.ajax({
          async: false,
          url: newUrl,
          method: type,
          async: false,
          crossDomain: true,
          dataType: 'jsonp',
          success: function(data, textStatus, xhr) {
              return callBack(data);
          },
          error: function(xhr, exception) {
              //$('.rtnMsg').html("opps: " + textStatus + " : " + errorThrown);  
              if (xhr.status === 0) {
                  alert('Not connect.\n Verify Network.');
              } else if (xhr.status == 404) {
                  alert('Requested page not found. [404]');
              } else if (xhr.status == 500) {
                  alert('Internal Server Error [500].');
              } else if (exception === 'parsererror') {
                  alert('Requested JSON parse failed.');
              } else if (exception === 'timeout') {
                  alert('Time out error.');
              } else if (exception === 'abort') {
                  alert('Ajax request aborted.');
              } else {
                  alert('Uncaught Error.\n' + xhr.responseText);
              }
              return callBack(myRtnA); // return callBack() with myRtna
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

  function isURL(str) { 
   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
   return regexp.test(str);
} 