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

var addAdditionalBtn = function(){
	var shutffleHtml = '<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="light-shuffle-button" data-button-toggle="true" role="button" data-tooltip-text="Turn shuffle on" title="Turn shuffle on"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-shuffle" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span></button>';	
	var autoplayHtml = '<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="light-autoplay-button" data-button-toggle="true" role="button" data-tooltip-text="Turn autoplay on" title="Turn autoplay on"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-autoplay" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span></button>';
	//playlist-bar-prev-button
	var prevBtnHtml = '<button title="Previous video" type="button" id="playlist-bar-prev-button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" role="button" data-tooltip-text="Previous video"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-prev" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Previous video"><span class="yt-valign-trick"></span></span></button>';
	//playlist-bar-next-button
	var nextBtnHtml = '<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="playlist-bar-next-button" role="button" data-tooltip-text="Next video&lt;br&gt;"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-next" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span></button>';

	$('#watch-actions').append(prevBtnHtml).append(autoplayHtml).append(shutffleHtml).append(nextBtnHtml);
	
	$('#light-autoplay-button').click(function(){
		$('#light-shuffle-button').removeClass('yt-uix-button-toggled');
	});
	
	$('#light-shuffle-button').click(function(){
		$('#light-autoplay-button').removeClass('yt-uix-button-toggled');
	});
	
	$('#playlist-bar-next-button').click(function(){
		if(isExtensionBtnPressed('light-shuffle-button')){
			$.redirect(NextVideo.getUrl(), { exShuffle : 1 });
		}else{
			$.redirect(NextVideo.getUrl());
		}
	});
};

var isExtensionBtnPressed = function(btnId){
	var $btn = $('#' + btnId);
	
	return $btn.hasClass('yt-uix-button-toggled');
};

var setInitialButtonStatus = function(){
	if(getParameterByName('exShuffle') == 1){
		$('#light-shuffle-button').addClass('yt-uix-button-toggled');
	}else{
		$('#light-shuffle-button').removeClass('yt-uix-button-toggled');
	};
};

var addInfoDiv = function(){
	$('#watch-actions').after("<div><b>" + chrome.i18n.getMessage("InfoReplayCount") + " : </b><span id='extensionReplayCntNo'>0</span></div>");
};

var updateReplayInfo = function(){
	var $extensionReplayCnt = $('#extensionReplayCntNo');
	$extensionReplayCnt.text(parseInt($extensionReplayCnt.text())+1);
};

var pollingCheckAndSeek = function(){
	addInfoDiv();
	addAdditionalBtn();
	setInitialButtonStatus();
	addDebugMenu();	// debug menu
	
	
	// 1. push current video info
	//function( input_title, input_count, input_url ){
	pushVideoToShuffleList(CurrentVideo.getTitle(),10,CurrentVideo.getUrl());
	
	
    var playerObj = getPlayerObj();
    if(playerObj){
		intervalTimer = setInterval(function(){	
			if(playerObj.getPlayerState() == 0){
				if(isExtensionBtnPressed('light-autoplay-button')){
					playerObj.seekTo(0, true);
					// because of Youtube Bug.
					// registered on Youtube issue tracker
					playerObj.pauseVideo();
					playerObj.playVideo();
					// end of temp code
					updateReplayInfo();
				}else if(isExtensionBtnPressed('light-shuffle-button')){
					clearInterval(intervalTimer);
					$.redirect(NextVideo.getUrl(), { exShuffle : 1 });
				}	
			}
		}, 250);
    }
};

var addDebugMenu = function(){
    	//debug msg
	var currentIndex = 0;
	var totalIndex = 0;
	
	$('#watch-actions').after("<div id='debugMenu' style='background-color:#BDBAB2'>== DEBUG MENU==<br/>"
	+ "current url : " + CurrentVideo.getUrl() + "<br/>"
	+ "current title : " + CurrentVideo.getTitle() + "<br/>"
	+ "current Index : " + currentIndex + "<br/>"
	+ "total Index : " + totalIndex + "<br/>"
	
	
	+ "next url : " + NextVideo.getUrl() + "<br/>"
	+ "next title : " + NextVideo.getTitle() + "<br/>"
	+ "</div>");
}

setTimeout(function(){
    pollingCheckAndSeek();
}, 1000);
