//2015.7.6

var ivideo=importVideo();

function importVideo(){
	var video={};
	
	video.type='ios';//值为'ios'的话，ios点击直接调用系统播放器，否则ios和安卓一样作为弹窗播放处理
	video.box=$("<aside class='videoBox' id='videoBox'><a class='close'></a></aside>");
	video.btn=$('a.btnShare,#btnShare');
	
	video.add=function(btn){
		if(btn) video.btn=btn;
		if(video.btn.length>0){
			if(!os.ios || (os.ios && video.type!='ios')){
				video.box.appendTo($('body'));
				video.btn.on('touchend',video.play);
			}//end else
			else video.ios();
		}//end if
	}//end func

	video.ios=function(){
		video.btn.each(function(i) {
			var vid=$(this).data('vid');
			if(vid && vid!=''){
				var type=$(this).data('type');
				type=type||'youku';
				if(type=='youku'){
					$(this).children('iframe').remove();
					var video=$('<iframe src="http://player.youku.com/embed/'+vid+'" frameborder=0 allowfullscreen></iframe>').appendTo($(this));
				}//end if
				else{
					$(this).children('video').remove();
					var video=$('<video type="video/mp4">').attr({src:vid}).appendTo($(this));
					var poster=$(this).data('poster');
					if(poster) video.attr({poster:poster});
				}//end else
			}//end if
		});
	}//end func
	
	video.play=function(e){
		var vid=$(this).data('vid');
		if(vid && vid!=''){
			var type=$(this).data('type');
			type=type||'youku';
			var ht=$(window).width()*9/16;
			var top=$(window).height()/2-ht/2;
			video.box.show();
			if(type=='youku') videoContainer=$('<iframe src="http://player.youku.com/embed/'+vid+'" frameborder=0 allowfullscreen isAutoPlay="true"></iframe>').css({height:ht,top:top}).prependTo(video.box);
			else{
				videoContainer=$('<video type="video/mp4" controls autoplay>').attr({src:vid}).css({height:ht,top:top}).prependTo(video.box);
				videoPoser=$(this).data('poster');
				if(videoPoser) videoContainer.attr({poster:videoPoser});
				videoContainer[0].play();
			}//end else
		}//end if
		video.box.children('a.close').one('touchend',video.close);
	}//end event
	
	video.close=function(e){
		videoContainer.remove();
		video.box.hide();
	}//end event
	
	return video;
}//end import

