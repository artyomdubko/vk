  var vk = {
      appId: 4753143,
      groupId: "", 
      postId: "", 
      postUrl: "",
      newPost: "",
      postsCount: "",
      comment: "",
      currentUrl: window.location.href, 
      currentUrlWithoutAnything: (location.protocol + '//' + location.host + location.pathname).replace(/\/$/, ""),
      accessToken: ""  
  }
  var started = false;
  var demo;
  $(document).ready(function() {
      $(document).tooltip();
      demo = new Console({
          'element': '#debug',
          'width': 500,
          'height': 475,
          'bg': '#f9ebd2'
      });
      demo.success('Hello!');

      //checkUrlForToken(vk.currentUrl);
      $(".add-comment-checkbox").change(function() {
          if (this.checked) {
              addOrRemoveDisableForArray($('.comments-params '), false);
          } else {
              addOrRemoveDisableForArray($('.comments-params '), true);
          }
      });
  });

  function getAuthTokenFromUrl() {
      var urlWithToken = $('.auth-token-url').val();
      checkUrlForToken(urlWithToken);
  }

  function checkUrlForToken(url) {
      if (url.indexOf("access_token") > -1) {
          vk.accessToken = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1]; //check if we redirected with token 
          $(".access-token-id").html("<p style='color:green;'>ЕСТЬ</p>");
          addOrRemoveDisableForArray($('.getting-token'), true);
          addOrRemoveDisableForArray($('.request-params'), false);
          demo.success('Токен получен. Можно запускать процесс');
      } else {
          addOrRemoveDisableForArray($('.getting-auth'), false);
          demo.error('Что-то не так с введеным урлом. Перепроверьте его или перезапустите');
      }
  }

  function redirectToGetToken() {
      vk.appId = $('.app-id').val();
      var redirectUrl = "https://oauth.vk.com/authorize?client_id=" + vk.appId +
          "&display=page&redirect_uri=https://oauth.vk.com/blank.html" +
          "&scope=friends,wall,groups,messages&response_type=token&v=5.59";

      $(function() {
          $(".dialog-confirm").dialog({
              resizable: false,
              height: "auto",
              width: 400,
              modal: true,
              buttons: {
                  "Да. Давай погнали! ": function() {
                      window.open(redirectUrl);
                      addOrRemoveDisableForArray($('.redirect-button'), true);
                      addOrRemoveDisableForArray($('.getting-token'), false);
                      $(this).dialog("close");
                  },
                  "Я лох. Я зассал": function() {
                      $(this).dialog("close");
                  }
              }
          });
      });
  }

  function addOrRemoveDisableForArray(array, choise) { //choise - bool 
      array.each(function() {
          $(this).prop('disabled', choise);
      });
  }

  function getComments() {
      try { 
			  vk.postUrl = $(".wall-id").val(); 
			  var first = vk.postUrl.indexOf('wall');
              var second = vk.postUrl.indexOf('_');
			  vk.groupId = vk.postUrl.substr(first+4,second-first-4)
			  vk.postId = vk.postUrl.substr(second+1);
			  
              if (vk.groupId != "") {
                  demo.log('Процесс запущен. Ща ща ща...'); 
				  var params = {
                  "owner_id": vk.groupId,
                  "post_id":  vk.postId,
				  "count":100
              }
              var response = "";
              doAnAjax("GET", "wall.getComments", params, function(data) {
                  if (!data.error) { 
				     $(".comments-list").html("");
					  $(".comments-list").attr('rows', 1)
                      response = data.response; 
					  var comments = response.items;
					  var commentsText = "";
					  comments.forEach(function(comment) {             
							  commentsText += comment.text.replace(/(\r\n|\n|\r)/gm," ") + '&#13;&#10;' ; 
							  $(".comments-list").attr('rows', parseInt ($(".comments-list").attr('rows')) +1)
					  }); 
					   $(".comments-list").html(commentsText);
                  } else {
                      demo.error(data.error.error_code + data.error.error_msg);
                  }
              });
                  started = true;
              } else {
                  demo.error('Неверный или пустой URL!');
              } 
      } catch (ex) {
          demo.error(ex.message); 
      }  
  }
  

  function doAnAjax(type, methodName, params, callBack) {
	   
      var paramsString = getParamsStringFromDictionary(params);
      var newUrl = " https://api.vk.com/method/" + methodName + "?&access_token=" + vk.accessToken + "&v=5.59&" + paramsString;
      var response = "";
      $(".requests-count").html(parseInt($(".requests-count").html()) + 1); //increment request count


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
                  demo.error('Not connect.\n Verify Network.');
              } else if (xhr.status == 404) {
                  demo.error('Requested page not found. [404]');
              } else if (xhr.status == 500) {
                  demo.error('Internal Server Error [500].');
              } else if (exception === 'parsererror') {
                  demo.error('Requested JSON parse failed.');
              } else if (exception === 'timeout') {
                  demo.error('Time out error.');
              } else if (exception === 'abort') {
                  demo.error('Ajax request aborted.');
              } else {
                  demo.error('Uncaught Error.\n' + xhr.responseText);
              }
              stopProcess();
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