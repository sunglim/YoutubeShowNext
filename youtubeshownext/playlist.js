// jqeury func
jQuery.redirect = function(url, params) {

	url = url || window.location.href || '';
	url =  url.match(/\?/) ? url : url + '?';

	for ( var key in params ) {
		var re = RegExp( ';?' + key + '=?[^&;]*', 'g' );
		url = url.replace( re, '');
		url += '&' + key + '=' + params[key]; 
	}  
	// cleanup url 
	url = url.replace(/[;&]$/, '');
	url = url.replace(/\?[;&]/, '?'); 
	url = url.replace(/[;&]{2}/g, ';');
	// $(location).attr('href', url);
	window.location.replace( url ); 
};
//
function getParameterByName(name)
{
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if(results == null){
		return "";
	}else{
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
}

// start with idx 1
var listShuffleVideo = [];
var getCurrentShfflePosition;

var pushVideoToShuffleList = function( input_title, input_count, input_url ){
	if(getCurrentShfflePosition == null || getCurrentShfflePosition === 'undefined'){
		getCurrentShfflePosition = -1;
	};
	$('#debugMenu').append('<br />pushVideoToShuffleList : ' + input_title + ", " + input_count + ", " + input_url);
	listShuffleVideo.push( { title:input_title, view_count:input_count, url:input_url } );
	getCurrentShfflePosition++;

	$each(listShuffleVideo,function(){
		$('#debugMenu').append('<br />listShuffleVideo : ' + this.url);
	});
};

var CurrentVideo = (function(){
	return {
		getUrl : function(){
			return document.URL;
		},
		getTitle : function(){
			return $('#eow-title').attr('title');
		}
	}
})();

var NextVideo = (function(){
	var aryVideoList = document.getElementsByClassName("video-list-item");
	var randomNo = (Math.random()*3|0) +1;
	var randomVideoDom = aryVideoList[randomNo];
	return {
		getUrl : function(){
			return randomVideoDom.children[0].href;
		},
		getTitle : function(){
			return randomVideoDom.children[0].children[1].getAttribute('title');
		}
	}
})();