  var vk = {
      groupId: "",
      postId: "",
      postsCount: "",
      comment: "",
      currentUrl: window.location.href,
      requestInterval: 500, //by default
      currentUrlWithoutAnything: (location.protocol + '//' + location.host + location.pathname).replace(/\/$/, ""),
      accessToken: "d9c490d3d311a8d7002b3a9b367eb86c4fdc2d6d4a763ccca5f238eee310af1cf693de322e808030e1fba"
  }
  var started = false;
  var demo;
  
		  function start(){
      var messages = ["Вот почитай ничего новости https://nv86.ru/news/nizhnevartovsk/",
          "Интересный сайт http://www.gbf.ge/", "Хотел бы там учиться http://gimnazija.ucoz.ru/",
          "Ржака да? http://comedy-portal.net/",
          "Сайт для тех, кто хочет подучить лексику.https://quizlet.com/",
          "Urban dictionary http://www.urbandictionary.com/",
          "http://mypiday.com - Найди где в числе Пи находится твой день рождения",
          "http://mypiday.com - Найди где в числе Пи находится твой день рождения",
          "http://www.nationalanthems.info/ - Гимны всех стран мира (в т.ч. старые)",
          "http://www.particlesimulator.com/ - Симулятор частицы",
          "http://iamthecu.be/ - Кубик Рубика онлайн",
          "http://sci-hub.io/ - 47000000  пиратских научных статей. Piratebay от мира науки.",
          "http://playjudgey.com/ - Не суди книгу по обложке.",
          "https://tosdr.org/index.html - Для тех, кто ленится прочитать лицензионное соглашение",
          "http://lhartikk.github.io/ArnoldC/ - Язык программирования, основанный на цитатах Арнольда Шварцнеггера",
          "http://codepen.io/akm2/full/rHIsa - Симулятор гравитации",
          "http://teflsearch.com/creative/what-could-you-achieve-2016/ - Чего бы вы достигли в 2016, если бы тратили время по-другому",
          "https://the.wubmachine.com/ - Дабстеп любой музыки",
          "http://billionbirthday.com/ - Миллиардная секунда в твоем дне рождения",
          "http://justdelete.me/ - Удаление аккаунтов с веб-сервисов",
          "http://forebears.io/surnames - Насколько распространена твоя фамилия?",
          "http://opensignal.com/ - 2G, 3G, 4G покрытие",
          "https://www.symbolab.com/ - То же что WolframAlpha, но есть бесплатное пошаговое решение",
          "http://www.systemrequirementslab.com/cyri - определит может ли ваш ПК потянуть очередную новинку",
          "http://www.metacritic.com/ - сайт, на котором вы можете увидеть оценки к новым играм",
          "https://www.randomlists.com/random-video-games - не знаете во что поиграть? Вот вам рандомные игры!",
          "http://outsideandriod.ru/ - любите поиграть на своем телефоне, но на плэймаркете одна дичь? Каждый день на сайте появляется одна годная игра.",
          "http://www.cheatbook.de/ - любите почитераить в играх? На этом сайте расскажут все секреты",
          "https://www.freegamehosting.eu/ - бесплатный хостинг для игровых серверов",
          "https://www.youtube.com/ - возможность без каких-либо усилий пройти абсолютно любую игру без лагов и затруднений.",
          "https://midomi.com - если вам нужно найти название песни, просто спойте её мотив.",
          "https://ctrlq.org/dictation - распознает речь в текст прямо на сайте.",
          "https://unfurlr.com - находит оригинальный URL, спрятанный в укороченном.",
          "https://lovelycharts.com - создает диаграммы любого вида.",
          "https://iconfinder.com - лучшее место для поиска иконок любого размера.",
          "https://wolframalpha.com - получите ответ на запрос сразу, не переходя по ссылкам.",
          "https://e.ggtimer.com - простой таймер для ваших ежедневных нужд.",
          "https://coralcdn.org - если какой-либо сайт упал из-за большого траффика, попробуйте зайти на него через coral CDN.",
          "https://random.org - случайные числа, подбрасывание монетки, кости, и другие случайности.",
          "https://pdfescape.com - позволяет редактировать PDF прямо в браузере.",
          "https://myfonts.com/WhatTheFont - быстро распознает название шрифта с картинки.",
          "https://homestyler.com - создайте с эскиза и/или измените модель своего дома в 3D.",
          "https://wetransfer.com - если нужно поделиться очень большим файлом.",
          "https://noteflight.com - пишите музыку онлайн.",
          "https://imo.im - общайтесь с друзьями со Skype, Facebook, Google Talk, и т.д. с одного приложения!",
          "https://urbandictionary.com - не знаете что значит buddy или tonite? Ищите определение здесь!",
          "https://sumopaint.com - не Photoshop конечно, но очень хороший онлайн-редактор изображений.",
          "https://www.skillsup.ru – уроки, сервисы, тесты по фш",
          "https://www.umka.kharkov.ua/htmlbr/pack088.html - более 800 наборов кистей ",
          "https://zerolayer.ru/ – кисти, формы, текстуры, экшены, рамки, шрифты ",
          " globator.net/ – кисти, стили, шрифты ",
          " tutbrush.com/ – кисти. Рассортированы по темам. ",
          " www.0lik.ru/ – градиенты, паттерны, кисти, экшены, стили, текстуры, формы, шаблоны ",
          " photoshopmix.ru/ – кисти, шаблоны, текстуры, фигуры, экшены, шрифты, градиенты",
          " http://demiart.ru/forum/index.php?s=dd5a1f42da7b55558.. – склад на Демиарте: кисти, плагины, клипарты ",
          " photoshopbrushes.ru/ – кисти. Рассортированы по темам. ",
          " www.gzweb.ru/ - градиенты, кисти, экшены, стили, текстуры, формы, шаблоны ",
          " www.vsekisti.ru/ – огромная коллекция кистей ",
          " goldenone.ru/ – кисти, шрифты, шаблоны ",
          " www.photoshop-master.ru/ - градиенты, кисти, экшены, стили, текстуры, формы, шаблоны ",
          " www.rozhdestvo.org/ – Рождественские кисти, шрифты, стили, клипарт ",
          " fotodryg.ru/ – кисти, шрифты, фигуры ",
          " www.alldesign.biz/ - градиенты, кисти, экшены, стили, текстуры, формы, шаблоны, шрифты ",
          " design-mania.ru/category/downloads - шаблоны, кисти, шрифты, текстуры ",
          " balbesof.net/down/view/brashs.html - коллекция кистей ",
          " design.ru-deluxe.ru/ – стили, формы, текстуры, плагины, рамки, паттерны ",
          " www.grafamania.net/photoshop - кисти, шрифты, шаблоны, рамки ",
          " deeplace.net/ – кисти, плагины, экшены, клипарт, шрифты, рамки, текстуры ",
          " 2dtutorials.ru/download - кисти, шрифты, стили, клипарт ",
          " photoshope.ru/index.htm - плагины, кисти, действия, стили, фигуры, градиенты, текстуры, шрифты",
          " colorworld.org/ - плагины, кисти, стили, градиенты, текстуры, шрифты ",
          " rukoyatki.ru/photoshop - градиенты, кисти, экшены, стили, текстуры, формы, шаблоны, отрисовки",
          " www.forum.thesoul.ru/index.php?showforum=6 – текстуры, кисти, стили, фильтры ",
          ". www.zerores.com.ru/ – шрифты, кисти ",
          " www.cwer.ru/dlya_photoshop_0 - кисти, маски, экшены, текстуры, шрифты ",
          " www.deviantart.com/ – кисти, текстуры, формы, шрифты ",
          " fordezign.ru/ – экшены, градиенты, кисти, плагины, стили, текстуры",
          " Новости футбола, чемпионат Беларуси http://www.football.by",

          " Официальный сайт Белорусской федерации волейбола http://bvf.by",

          " Официальный орган Белорусской Автомобильной Федерации http://autosport.nsys.by",

          " Белорусская республиканская федерация таэквондо  http://www.brtf.org",

          " Белорусская федерация горнолыжного спорта и сноуборда http://blralpineski.info",

          " Белорусская федерация шахмат http://www.chess.by",

          " Национальный олимпийский комитет Беларуси. Официальный сайт http://www.noc.by",

          " Белорусская федерация Айкидо http://belaikido.com",

          " Белорусская федерация бодибилдинга и фитнесса http://www.bfbb.by",

          " Официальный сайт Министерства спорта и туризма Республики Беларусь http://www.mst.by",

          " Белорусская федерация танцевального спорта http://www.bydsf.com",

          " Официальный сайт Ассоциации Белорусская федерация футбола http://www.bff.by",

          " Федерация хоккея Республики Беларуси http://bihf.org",
          " http://button.dekel.ru/ - волшебная кнопка",
          " 	http://ru.akinator.com/ - угадывает почти всех",
          " 	http://wvs.topleftpixel.com/flash/cntower_timelapse.swf - день - ночь",
          " 	http://open.adaptedstudio.com/html5/many-lines/index... - что то типа рисовалки",
          " 	http://www.pixelcase.com.au/vr/2009/newyork/ - New York",
          " 	http://www.rivelazioni.com/flash/_deliri/rivelazioni... - поводи мышкой",
          " 	http://statly.ru/red.html - кто сколько продержится:D",
          " 	http://oxcom.anarxi.st/chpok.swf - лопать пузырики",
          " 	http://61226.com/share/hk.swf ",
          " 	http://open.adaptedstudio.com/html5/bounce-fill2/ ",
          " 	http://open.adaptedstudio.com/life/#play ",
          " 	http://adaptedstudio.com/sketch/physics/ - бред",
          " 	http://adaptedstudio.com/sketch/airship/ - бред 2",
          " 	http://open.adaptedstudio.com/basicjs/2-distance-eri... ",
          " 	http://open.adaptedstudio.com/hunting_arrows/ - стрелки бегают.",
          " 	http://adaptedstudio.com/sketch/eat/ - пакет поедатель:D",
          " 	http://soytuaire.labuat.com/ ",
          " 	http://www.maninthedark.com/ - человек, плавающий за курсором:D",
          " 	http://andrew-hoyer.com/experiments/cloth/",
          " 	http://thisissand.com/ - песок",
          " 	http://www.procreo.jp/labo/flower_garden.swf - цветы",
          " 	http://www.cesmes.fi/#balls2 ",
          " 	http://handsonlycpr.org/symphony/?id - музыка рук.",
          " 	http://www.ellf.ru/nem/letomer/ - сколько осталось до лета",
          " 	http://lovedbdb.com/nudemenClock/index2.html - время",
          " 	http://sketch.odopod.com/sketches/new - рисовалка",
          " 	http://www.incredibox.fr/ - музыку сочинять. что то типа этого.",
          " 	http://mrdoob.com/projects/harmony/#longfur - еще одна рисовалка",
          " 	http://www.sembeo.com/media/Matrix.swf",
          " 	https://wbx-files.s3.amazonaws.com/jacksonpollock_by...",
          " 	http://esquire.ru/speech - говорящий Путин",
          " 	http://www.flashearth.com/ - карта",
          " 	http://solarsystemscope.com/ - космос",
          " 	http://bulalex.ru/2011-03-21-16-31-18/roomesc - найти выход из комнаты",
          " 	http://ritmoteka.ru/index.php - для нахождения песен",
          " 	http://bomomo.com/",
          " 	http://cyberanne.livejournal.com/343610.html - почувствуй себя художником:D",
          " 	http://anasomnia.com/ - сон девочки",
          " 	http://www.donothingfor2minutes.com/ - шум волн",
          " 	http://www.nightzone.ru/public/swf/00001.swf",
          " 	http://www.simonpanrucker.com/beans.swf :D",
          " 	http://spielzeugz.de/html5/liquid-particles.html ",
          " 	http://rulethestars.com/",
          " .	http://www.intotime.com/",
          " .	http://www.yaplakal.com/fun/magic.htm - магический квадрат",
          " 	http://www.yaplakal.com/fun/clear_monitor.htm - чистка монитора",
          " 	http://www.yaplakal.com//fun/probka/voditeli.htm - кто о чем думает в пробках",
          " 	http://www.ferryhalim.com/orisinal/g2/rainmaker.htm",
          " 	http://www.colorflip.com/ - страницы листать",
          " 	http://totallifeforever.co.uk/",
          " 	http://dreamsboard.ru/ - доска желаний",
          " 	http://book.fancy.kz/?id=on - получи ответы на свои вопросы",
          " 	http://www.biglongnow.com/ - хлопать дверью",
          " 	http://www.rainymood.com/ - слушать дождь",
          " 	http://www.gotmilk.com/#/benefits/muscles/game/ разбираться надо, но круто"
      ]

      var preMessages = [ " Привет! Вот почитай, полистай! " ,  " Друг! Ну интересно ж! " ,
	                    " Йоу! Чё как? " ,  " О! Зырь! " ,
	                    " !!!!! ТЫ видел??? " ,  " оооооо! зацени!! " ,
	                    " Всем нравится и тебе должно. " ,  " Крутотень какая! " ,
	                    " Ахахахах. Смотри. " ,  " Вот коллега скинул посмотреть. " ,
	                    " ну как? " ,  " Как вообще дела? На досуге полистай. " ,
	                    " Вот на мозгобойне был вопрос. " ,  " На пикабу прочитал. И тебе даю. " ,
	                    " С комментов онлайнера приколюшка. " ,  " На тут-бае увидел. Бомба просто. " ,
	                    " Всё для теюбя. " ,  " На тут-бае увидел. Бомба просто. " ]
      var messageTemplate = "*id15104475  (Глеб!)"
      var params = {
          access_token: vk.accessToken,
          owner_id: "-17633860",
          message: "",
          from_group: 1,
          publish_date: 1479112233
      }
      var startDate = 1479112233; //seconds 
      var plusTomorrow = 86400;
      var plusHour = 3600;
      debugger;
	  for (var i=0;i<=14;i++) {
   (function(ind) { 
		   setTimeout(function(){ 
		   params.publish_date = startDate + plusTomorrow * ind + getRandomInt(0, 1 * plusHour); 
          params.message = messageTemplate + preMessages[getRandomInt(0, preMessages.length-1)] + messages[getRandomInt(0, messages.length-1)]
          doAnAjax("wall.post", "POST", params, function(data) {
              if (!data.error) {
                  console.log ("added " + data.response.post_id)   
              } else {
                  console.log(data.error.error_code + data.error.error_msg);
              }
          });
          params.publish_date = startDate + plusTomorrow * ind + getRandomInt(2.5 * plusHour, 3.5 * plusHour); 
          params.message = messageTemplate  + preMessages[getRandomInt(0, preMessages.length-1)] + messages[getRandomInt(0, messages.length-1)]
         doAnAjax("wall.post", "POST", params, function(data) {
              if (!data.error) {
                  console.log ("added " + data.response.post_id)  
              } else {
                  console.log(data.error.error_code + data.error.error_msg);
              }
            }) ;
          params.publish_date = startDate + plusTomorrow * ind + getRandomInt(5 * plusHour, 6 * plusHour); 
          params.message = messageTemplate  + preMessages[getRandomInt(0, preMessages.length-1)]  + messages[getRandomInt(0, messages.length-1)]
         doAnAjax("wall.post", "POST", params, function(data) {
              if (!data.error) {
                  console.log ("added " + data.response.post_id)   
              } else {
                  console.log(data.error.error_code + data.error.error_msg);
              }
            }) ;
          params.publish_date = startDate + plusTomorrow * ind + getRandomInt(10 * plusHour, 11 * plusHour); 
          params.message = messageTemplate  + preMessages[getRandomInt(0, preMessages.length-1)]  + messages[getRandomInt(0, messages.length-1)]
          doAnAjax("wall.post", "POST", params, function(data) {
              if (!data.error) {
                  console.log ("added " + data.response.post_id)    
              } else {
                  console.log(data.error.error_code + data.error.error_msg);
              }
            });
          params.publish_date = startDate + plusTomorrow * ind + getRandomInt(11 * plusHour, 12 * plusHour); 
          params.message = messageTemplate  + preMessages[getRandomInt(0, preMessages.length-1)] + messages[getRandomInt(0, messages.length-1)]
           doAnAjax("wall.post", "POST", params, function(data) {
              if (!data.error) {
                  console.log ("added " + data.response.post_id)  
              } else {
                  console.log(data.error.error_code + data.error.error_msg);
              }
            }) ;
			
		   }, 1000 + (20000 * ind));
   })(i);
 
	} 
             

  } 
 
       

  function doAnAjax(methodName, type, params, callBack) {
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
          timeout: 3000,
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

  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }