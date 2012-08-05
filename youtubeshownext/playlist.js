var getNextVideoUrl = function(){
	var aryVideoList = document.getElementsByClassName("video-list-item");
	var videoLink = aryVideoList[3].children[0].href;
	//window.location = videoLink;
	window.location = videoLink;
};

var Videos = new Videos();
