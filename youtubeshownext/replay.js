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

var getNextVideoUrl = function(){
	var aryVideoList = document.getElementsByClassName("video-list-item");
	var videoLink = aryVideoList[3].children[0].href;
	//window.location = videoLink;
	window.location = videoLink;
}

var pollingCheckAndSeek = function(){
    addIcon();
    var playerObj = getPlayerObj();
    if(playerObj){
	intervalTimer = setInterval(function(){
		if(playerObj.getPlayerState() == 0/*ended*/){
			clearInterval(intervalTimer);
			getNextVideoUrl();
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
