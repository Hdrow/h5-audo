//2015.9.1

var ivideo=importVideo();

function importVideo(){
	var video={};
	
	video.on=function(btn){
		btn=btn||$('a.btnVideo,#btnVideo');
		if(os.ios) ios_play(btn);
		else btn.on('touchend',pop_play);
	}//end func
	
	function ios_play(btn){
		btn.each(function(i) {
			var vid=$(this).data('vid');
			if(vid && vid!=''){
				var type=$(this).data('type');
				type=type||'youku';
				if(type=='youku') btn_play($(this));
				else if(type=='qq'){
					if(os.iphone4 || os.iphone5) btn_play($(this));
					else $(this).on('touchend',pop_play);
				}//end if
				else if(type=='mp4') btn_play($(this));
			}//end if
		});
	}//end func

	function btn_play(btn){
		var vid=btn.data('vid');
		if(vid && vid!=''){
			var type=btn.data('type');
			type=type||'youku';
			if(type=='youku') $('<iframe src="http://player.youku.com/embed/'+vid+'" frameborder=0 allowfullscreen></iframe>').appendTo(btn);
			else if(type=='qq') $('<iframe src="http://v.qq.com/iframe/player.html?vid='+vid+'&tiny=0&auto=0" frameborder="0" allowfullscreen></iframe>').appendTo(btn);
			else container=$('<video type="video/mp4">').attr({src:vid}).appendTo(btn);
		}//end if
	}//end func
	
	function pop_play(e){
		var box=$("<aside class='videoBox' id='videoBox'><a class='close'></a></aside>").show().appendTo($('body'));
		var vid=$(this).data('vid');
		if(vid && vid!=''){
			var type=$(this).data('type');
			type=type||'youku';
			var ht=$(window).width()*9/16;
			var top=$(window).height()/2-ht/2;
			if(type=='youku') $('<iframe src="http://player.youku.com/embed/'+vid+'" frameborder=0 allowfullscreen></iframe>').css({height:ht,top:top}).prependTo(box);
			else if(type=='qq') $('<iframe src="http://v.qq.com/iframe/player.html?vid='+vid+'&tiny=0&auto=0" frameborder="0" allowfullscreen></iframe>').css({height:ht,top:top}).prependTo(box);
			else if(type=='mp4'){
				var container=$('<video type="video/mp4" controls preload="auto" webkit-playsinline>').attr({src:vid}).css({height:ht,top:top}).prependTo(box);
				var poster=$(this).data('poster');
				if(poster) container.attr({poster:poster});
				container[0].play();
			}//end else
		}//end if
		box.children('a.close').one('touchend',function(e){
			box.remove();
		});
	}//end event
	
	return video;
}//end import
