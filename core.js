  var vk = {
      appId: 4753143,
      groupId: "",
      postId: "",
      postsCount: "",
      comment: "",
      currentUrl: window.location.href,
      requestInterval: 500, //by default
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

  function startProcess() {
      if (!started) {
          vk.requestInterval = parseInt($('.request-interval').val());
          vk.groupId = $(".wall-id").val();
          vk.comment = $(".commentText").val();
		  if (vk.groupId!=""){
	          getGroupOrUserInfo(vk.groupId, true);
	          $(".start-button").html('СТОП');
			  demo.log('Процесс запущен. Ждем нового поста в группе...');
              started = true;
		  }
		  else {
		    demo.error('Надо ввести ID группы!');
		  }
      } else {
	     stopProcess();
      }
  }

  function stopProcess() {
	      demo.log('Процесс остановлен');
          $(".start-button").html('СТАРТ!');
          started = false;
  }

  function getGroupOrUserInfo(groupId, isFirstTime) { //set to dropdown change
      var params = {
          "owner_id": groupId,
		  "extended" : 1
      }
      var postId;
      var response = "";
	  vk.comment = $('.comment-text').val();
      doAnAjax("GET", "wall.get", params, function(data) {
          if (!data.error) {
              response = data.response;
              if (!isFirstTime && response.count > vk.postsCount) {    //if new post added
			      demo.success('Добавлен новый пост!');
                  if (response.items[0].is_pinned != 1) {             //check if new posts pinned. then we need items[1]
                      vk.postId = response.items[0].id;
                  } else {
                      vk.postId = response.items[1].id;
                  }
                  handleNewPost(response, vk.groupId, vk.postId, vk.comment);
              } else { //check group again if there isn't a new post
                  if (started) { //check if started clicked
                      setTimeout(function() {
                          getGroupOrUserInfo(groupId, false)
                      }, vk.requestInterval);
                  }
              }
              vk.postsCount = response.count;
			  var title = response.groups[0].name != null ? response.groups[0].name : response.profiles[0].first_name + " " + response.profiles[0].last_name;
              $(".wall-title").html(title);
              //$(".posts-count").html(vk.postsCount);
              //$(".last-post-value").html(response.items[0].text.substring(0, 100)); //response[0] - posts count, response[1-...] - posts 
          } else {
              demo.error(data.error.error_code + data.error.error_msg);
			  stopProcess();
          }
      });
  }

  function handleNewPost(newPostResponse, groupId, postId, commentText) { 
      if ($('.add-comment-checkbox').is(":checked")) {
	     demo.log('Добавляем комментарий');
          var params = {
              "owner_id": groupId,
              "post_id": postId,
              "message": commentText
          }
          var response = "";
          doAnAjax("POST", "wall.createComment", params, function(data) {
              if (!data.error) {
                  response = data.response;
				  if (response.comment_id!=0){
				  var commentUrl = 'https://vk.com/wall' + groupId +'_' + postId + '?reply=' + response.comment_id;
				  demo.success('Комментарий добавлен! Тут - <a target="_blank" href=' + commentUrl + '>' + commentUrl + '</a>');
					
				  }
              } else {
                  demo.error(data.error.error_code + data.error.error_msg);
              }
				  stopProcess();
          });
      }
      if ($('.open-link-checkbox').is(":checked")) {
          var lastPostArray = newPostResponse.items[0].text.replace(/\n/g, " ").split(" "); 
		  try {
			  if (typeof newPostResponse.items[0].attachments != "undefined") {
			   if (typeof newPostResponse.items[0].attachments[0].link.url != "undefined") {
				   lastPostArray.push (newPostResponse.items[0].attachments[0].link.url);
				}
			  }
		  }catch (e) { 
		        demo.error("Ошибка:" + e);
			}
          lastPostArray.forEach(function(entry) {
              if (isURL(entry)) {
				  demo.log('Открываем ссылку: ' + entry);
                  window.open(entry);
              }
          });
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