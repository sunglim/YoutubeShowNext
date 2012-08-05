var intervalTimer;
var getPlayerObj = function(){
    var flashPlayerObj = window.document.getElementById("movie_player");
    if(flashPlayerObj){
        return flashPlayerObj;
    }

    var html5PlayerObj = window.document.getElementsByTagName("video")[0];
    if(html5PlayerObj){
        html5PlayerObj.getPlayerState = function(){
            return html5PlayerObj.ended ? 0 : 1;
        }
        html5PlayerObj.seekTo = function(value){
            html5PlayerObj.currentTime = value;
            html5PlayerObj.play(); // why play() is necessary?
        }
        html5PlayerObj.pauseVideo= function(){
            html5PlayerObj.pause();
        }
        html5PlayerObj.playVideo= function(){
            html5PlayerObj.play();
        }
        return html5PlayerObj;
    }
    
    return null;
};

var addIcon = function(){
    var iconTag = document.createElement('IMG');
    iconTag.src = chrome.extension.getURL("icon2.png");
    iconTag.setAttribute("style","vertical-align:middle;float:right");
    document.getElementById("watch-actions").appendChild(iconTag);
	
	var likeCountTag = document.createElement('span');
	likeCountTag.className = "watch-likes-dislikes";
	likeCountTag.id = "replayCount";
	likeCountTag.innerHTML = "0" + chrome.i18n.getMessage("TimesAutoReplayed");
	
	var tagLocation = document.getElementById("watch-description-extra-info").getElementsByTagName("li")[0];
	if(tagLocation!=null){
		document.getElementById("watch-description-extra-info").insertBefore(likeCountTag,tagLocation);	
	}
};

var addAdditionalBtn = function(){
	var shutffleHtml = '<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="light-shuffle-button" data-button-toggle="true" role="button" data-tooltip-text="Turn shuffle on" title="Turn shuffle on"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-shuffle" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span></button>';	
	var autoplayHtml = '<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="light-autoplay-button" data-button-toggle="true" role="button" data-tooltip-text="Turn autoplay on" title="Turn autoplay on"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-autoplay" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span></button>';
	
	$('#watch-actions').append(autoplayHtml).append(shutffleHtml);
	
	$('#light-shuffle-button').click(function(){
		$('#light-autoplay-button').removeClass('yt-uix-button-toggled');
	});
	
	$('#light-autoplay-button').click(function(){
		$('#light-shuffle-button').removeClass('yt-uix-button-toggled');
	});
};

var isLightBtnPressed = function(btnId){
	var $btn = $('#' + btnId);
	
	return $btn.hasClass('yt-uix-button-toggled');
};

var pollingCheckAndSeek = function(){
    //addIcon();
	addAdditionalBtn();
    var playerObj = getPlayerObj();
    if(playerObj){
		intervalTimer = setInterval(function(){
			if(isLightBtnPressed('light-autoplay-button')){
				if(playerObj.getPlayerState() == 0){
				playerObj.seekTo(0, true);
						// because of Youtube Bug.
						// registered on Youtube issue tracker
						playerObj.pauseVideo();
						playerObj.playVideo();
						// end of temp code
				}
			}else if(isLightBtnPressed('light-shuffle-button')){
				if(playerObj.getPlayerState() == 0){
					clearInterval(intervalTimer);
					getNextVideoUrl();
				}	
			}
		}, 250);
    }
};

var addDebugMenu = function(){
    var div = document.createElement('div');
}

setTimeout(function(){
    pollingCheckAndSeek();
}, 1000);
