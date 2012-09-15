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
	var magicNumber = Math.random()*5;
	var randomNo = (magicNumber|0) +1;
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

var PrevVideo = (function(){
	return {
		getUrl : function(){
			try{
			return listShuffleVideo[getCurrentShfflePosition - 1].url;
			}catch(err){}
		},
		getTitle: function(){
			try{
			return listShuffleVideo[getCurrentShfflePosition - 1].title;
			}catch(err){}
		}
	}
})();

var minusCurrentPosition = function(){
	getCurrentShfflePosition--;
};

// start with idx 1
var listShuffleVideo = [];
var getCurrentShfflePosition;

var pushVideoToShuffleList = function( input_title, input_count, input_url ){
	if(getCurrentShfflePosition == null || getCurrentShfflePosition === 'undefined'){
		getCurrentShfflePosition = -1;
	};
	
	listShuffleVideo.push( { title:input_title, view_count:input_count, url:input_url } );
	getCurrentShfflePosition++;
};

var pushJsToStorage = function( input_title, input_count, input_url ){
	$('#debugMenu').append('<br />pushJsToStorage called');
	
	// load sessionStorage 
	// assign to json
	var sessionRawData = sessionStorage.getItem('XtensionShuffleList');
	if(sessionRawData == null){
		
	}else{
		listShuffleVideo = JSON.parse(sessionRawData);	
	}
	
	// push to json
	pushVideoToShuffleList(input_title, input_count, input_url);
	getCurrentShfflePosition = listShuffleVideo.length -1;//because array start from 0
	
	//assign to sessionStorage
	sessionStorage.setItem('XtensionShuffleList',JSON.stringify(listShuffleVideo));	
	
	//debug
	$('#debugMenu').append('<br />getCurrentShufflePosition : ' + getCurrentShfflePosition);
	$.each(listShuffleVideo,function(i){
		$('#debugMenu').append('<br />javscript: listShuffleVideo : [' + i + ']' + this.title);
	});
	var dummy = JSON.parse(sessionStorage.getItem('XtensionShuffleList'));
	
	$.each(dummy,function(i){
		$('#debugMenu').append('<br />sessionStorage: listShuffleVideo : [' + i + ']' + this.title);
	});
};