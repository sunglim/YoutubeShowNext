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
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

var getNextVideoUrl = function(){
	var aryVideoList = document.getElementsByClassName("video-list-item");
	var randomNo = (Math.random()*3|0) +1;
	var videoLink = aryVideoList[randomNo].children[0].href;
	//window.location = videoLink;
	return videoLink;
};

