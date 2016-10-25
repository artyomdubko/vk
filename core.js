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
      vk.comment = $("#commentText").val();
      getGroupOrUserInfo(vk.groupId); 
  }


  function getGroupOrUserInfo(groupId) { //set to dropdown change
      var params = {
          "owner_id": groupId
      }
      var response = "";
      doAnAjax("wall.get", params, function(data) {
          if (!data.error) {
              response = data.response;
			  if(response.count > vk.postsCount)
			  {
				  addCommentToPost (vk.groupId, response.items[0].id, vk.comment);
			  }
		  else {
			  setTimeout(getGroupOrUserInfo(params), vk.requestInterval);
		  }
              vk.postsCount = response.count;
              $("#postsCount").html(vk.postsCount);
              $("#lastPostValue").html(response.items[0].text.substring(0, 100)); //response[0] - posts count, response[1-...] - posts 
          } else {
              alert(data.error.error_code + data.error.error_msg);
          }
      });
  }

  function addCommentToPost(groupId, postId, commentText) { 
				  var params = {
					  "owner_id": groupId,
					  "post_id": postId,
					  "message": commentText
				  }
      var response = "";
      doAnAjax("wall.createComment", params, function(data) {
          if (!data.error) {
              response = data.response;  
          } else {
              alert(data.error.error_code + data.error.error_msg);
          }
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