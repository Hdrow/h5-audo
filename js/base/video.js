//2015.11.22
var ivideo=importVideo();

function importVideo(){
	var video={};
	
	video.add=function(src,options){
		if(src && src!=''){
			var defaults = {shell:$('body'),controls:false,autoplay:true};
			var opts = $.extend(defaults,options);
			if(os.iphone4) opts.controls=true;
			var container=$('<video webkit-playsinline="true" type="video/mp4">').attr({src:src,autoplay:opts.autoplay,controls:opts.controls,poster:opts.poster}).addClass(opts.classname).appendTo(opts.shell);
			if(opts.onLoadstart) container[0].addEventListener('loadstart',opts.onLoadstart,false);
			if(opts.onLoaded) container[0].addEventListener('loadeddata',opts.onLoaded,false);
			if(opts.onEnded) container[0].addEventListener('ended',opts.onEnded,false);
			if(opts.onTimeupdate) container[0].addEventListener('timeupdate',opts.onTimeupdate,false);
			if(opts.onPlay) container[0].addEventListener('play',opts.onPlay,false);
			if(opts.onPause) container[0].addEventListener('pause',opts.onPause,false);
			return container;
		}//end if
	}//end func
	
	video.on=function(options){
		var defaults = {btn:$('a.btnVideo,#btnVideo'),controls:true,autoplay:true};
		var opts = $.extend(defaults,options);
		if(opts.btn.length>0) opts.btn.on('touchend',opts,video_play);
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
