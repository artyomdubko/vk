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
          vk.accessToken = vk.currentUrl.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];    //check if we redirected with token
          $("#accessTokenId").html("Access token:" + vk.accessToken);
		  addOrRemoveDisableForArray($('.getting_auth').children(),true) 
      }
	  else{
		  addOrRemoveDisableForArray($('.getting_auth').children(),false) 
	  }
  });

  function redirectToGetToken() {   
      var redirectUrl = "https://oauth.vk.com/authorize?client_id=" + vk.appId + 
	  "&display=page&redirect_uri="+ vk.currentUrlWithoutAnything +
	  "&scope=friends,wall,groups&response_type=token&v=5.59";
      window.location.replace(redirectUrl);
  }

   function addOrRemoveDisableForArray(array,choise) {   //choise - bool 
	  array.each(function() {
	  $( this ).prop('disabled', choise);
	  });
   } 
   
   function startProcess() {   
        vk.groupId = $(".wallId").val();
        getGroupOrUserInfo();
   }  
   
   function getGroupOrUserInfo() {    
	   var url =" https://api.vk.com/method/wall.get?owner_id="+ vk.groupId +"&access_token="+vk.accessToken;
   } 
   
    function getParamsStringFromDictionary (paramsDictionary) {
		var paramsString = "";
		for (key  in paramsDictionary) { 
		   var value = paramsDictionary[key];
		   paramsString += key + "=" + value  + "&";
		}
		return paramsString
}
  
 