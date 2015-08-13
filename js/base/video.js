//2015.8.13

var ivideo=importVideo();

function importVideo(){
	var video={};
	
	video.on=function(btn){
		btn=btn||$('a.btnVideo,#btnVideo');
		if(os.ios) ios_play(btn);
		else btn.on('touchend',android_play);
	}//end func

	function ios_play(btn){
		btn.each(function(i) {
			var vid=$(this).data('vid');
			if(vid && vid!=''){
				var type=$(this).data('type');
				type=type||'youku';
				if(type=='youku') $('<iframe src="http://player.youku.com/embed/'+vid+'" frameborder=0 allowfullscreen></iframe>').appendTo($(this));
				else $('<video type="video/mp4">').attr({src:vid}).appendTo($(this));
			}//end if
		});
	}//end func
	
	function android_play(e){
		var box=$("<aside class='videoBox' id='videoBox'><a class='close'></a></aside>").show().appendTo($('body'));
		var vid=$(this).data('vid');
		if(vid && vid!=''){
			var type=$(this).data('type');
			type=type||'youku';
			var ht=$(window).width()*9/16;
			var top=$(window).height()/2-ht/2;
			if(type=='youku'){
				var container=$('<iframe src="http://player.youku.com/embed/'+vid+'" frameborder=0 allowfullscreen isAutoPlay="true"></iframe>').css({height:ht,top:top}).prependTo(box);
			}//end if
			else{
				var container=$('<video type="video/mp4" controls autoplay>').attr({src:vid}).css({height:ht,top:top}).prependTo(box);
				videoPoser=$(this).data('poster');
				if(videoPoser) container.attr({poster:videoPoser});
				container[0].play();
			}//end else
		}//end if
		box.children('a.close').one('touchend',function(e){
			box.remove();
		});
	}//end event
	
	return video;
}//end import

