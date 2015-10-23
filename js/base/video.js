//2015.10.23

var ivideo=importVideo();

function importVideo(){
	var video={};
	
	video.add=function(option){
		if(option.src && option.src!=''){
			var src=option.src;
			var shell=option.shell||$('body');
			var classname=option.classname;
			var controls=option.controls!=null?option.controls:false;
			if(os.iphone4) controls=true;
			var autoplay=option.autoplay!=null?option.autoplay:true;
			var poster=option.poster;
			var onLoadstart=option.onLoadstart;
			var onLoaded=option.onLoaded;
			var onEnded=option.onEnded;
			var onPlay=option.onPlay;
			var onPause=option.onPause;
			var onTimeupdate=option.onTimeupdate;
			var container=$('<video webkit-playsinline="true" type="video/mp4">').attr({src:src,autoplay:autoplay,controls:controls,poster:poster}).addClass(classname).appendTo(shell);
			if(onLoadstart) container[0].addEventListener('loadstart',onLoadstart,false);
			if(onLoaded) container[0].addEventListener('loadeddata',onLoaded,false);
			if(onEnded) container[0].addEventListener('ended',onEnded,false);
			if(onTimeupdate) container[0].addEventListener('timeupdate',onTimeupdate,false);
			if(onPlay) container[0].addEventListener('play',onPlay,false);
			if(onPause) container[0].addEventListener('pause',onPause,false);
//			container[0].play();
			return container;
		}//end if
	}//end func
	
	video.on=function(option){
		if(option){
			var btn=option.btn||$('a.btnVideo,#btnVideo');
			var controls=option.controls!=null?option.controls:true;
			var autoplay=option.autoplay!=null?option.autoplay:true;
			var onEnded=option.onEnded;
			if(btn.length>0) btn.on('touchend',{onEnded:onEnded,controls:controls,autoplay:autoplay},video_play);
		}//end if
	}//end func
	
	function video_play(e){
		var autoplay=e.data.autoplay;
		var controls=e.data.controls;
		var onEnded=e.data.onEnded;
		var box=$("<aside class='videoBox' id='videoBox'></aside>").appendTo($('body')).show();
		var vid=$(this).data('vid');
		if(vid && vid!=''){
			var type=$(this).data('type');
			type=type||'youku';
			var ht=$(window).width()*9/16;
			var top=$(window).height()/2-ht/2;
			if(type=='youku') $('<iframe src="http://player.youku.com/embed/'+vid+'" frameborder="0" allowfullscreen></iframe>').css({height:ht,top:top}).appendTo(box);
			else if(type=='qq') $('<iframe src="http://v.qq.com/iframe/player.html?vid='+vid+'&tiny=0&auto=0" frameborder="0" allowfullscreen></iframe>').css({height:ht,top:top}).appendTo(box);
			else if(type=='mp4'){
				var container=$('<video type="video/mp4" webkit-playsinline>').attr({src:vid,poster:$(this).data('poster'),controls:controls,autoplay:autoplay}).css({height:ht,top:top}).appendTo(box);
//				container[0].play();
				if(onEnded) container[0].addEventListener('ended',onEnded,false);
			}//end else
		}//end if
		var close=$("<a class='close'></a>").appendTo(box).one('touchend',function(e){box.remove();});
	}//end event
	
	return video;
}//end import
