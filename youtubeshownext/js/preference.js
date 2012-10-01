var Preference = (function(){
	var storage = chrome.storage.local;
	
	return {
		loadPreference : function(item){
			storage.get(item, function(buttonPressed) {
				if(buttonPressed.isAutoReplay) {
					setAutoBtnPressed(true);
				};
			});	
		},
		setAutoReplayBool : function(boolVal){
			if(boolVal){
				storage.set({'isAutoReplay':boolVal},function(){
					//do nothing
				});
			}else{
				storage.remove('isAutoReplay', function(buttonPressed){
					//do nothing
				});
			};
		},
		removeAutoReplayPref : function(){
			storage.remove('isAutoReplay', function(buttonPressed){
				//do nothing
			});
		}
	}
})();

// innerClass of Prefernce class
var setAutoBtnPressed= function(boolPress){
	if(boolPress){
		$('#light-autoplay-button').addClass('yt-uix-button-toggled');
	}else{
		$('#light-autoplay-button').removeClass('yt-uix-button-toggled');
	}
};