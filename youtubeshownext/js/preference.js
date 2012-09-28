var Preference = (function(){
	var storage = chrome.storage.local;
	
	return {
		loadPreference : function(item){
			storage.get(item, function(buttonPressed) {
				if(buttonPressed.isAutoReplay) {
					setBtnFromStorage(true);
				};
			});	
		},
		setAutoReplayTrue : function(){
			storage.set({'isAutoReplay':true},function(){
				//do nothing
			});
		},
		removeAutoReplayPref : function(){
			storage.remove('isAutoReplay', function(buttonPressed){
				//do nothing
			});
		}
	}
})();

// innerClass of Prefernce class
var setBtnFromStorage = function(isPressed){
	if(isPressed){
		$('#light-autoplay-button').addClass('yt-uix-button-toggled');
	}
	return;
};