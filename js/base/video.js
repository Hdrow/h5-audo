//2016.5.15
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
	
	video.getType=function(url){
		if(url.indexOf("youku.com")!=-1){
			return 'youku';
		}//edn if
		else if(url.indexOf("qq.com")!=-1){
			return 'qq';
		}//edn if
		else if(url.indexOf(".mp4")!=-1){
			return 'mp4';
		}//edn if
		else return false;
	}//end func
	
	video.getVid=function(url,type){
		if(type=='youku'){
			var str1=url.split('id_')[1];
			var str2=str1.split('==')[0];
			return str2;
		}//edn if
		else if(type=='qq'){
			if(url.indexOf('vid=')!=-1){
				var str1=url.split('vid=')[1];
				return str1;
			}//end if
			else{
				var str1=url.split('/');
				var str2=str1[str1.length-1].split('.')[0];
				return str2;
			}//edn else
		}//edn if
		else if(url.indexOf(".mp4")!=-1){
			return url;
		}//edn if
		else return url;
	}//end func
	
	video.insert=function(options){
		var defaults = {type:'youku',autoplay:false,controls:true,width:'100%',height:'100%'};
		var opts = $.extend(defaults,options);
		if(opts.box.length>0){
			if(opts.type=='youku') $('<iframe width='+opts.width+' height='+opts.height+' src=http://player.youku.com/embed/'+opts.vid+ (opts.autoplay?'?autoplay=true':'') + ' frameborder=0 allowfullscreen></iframe>').appendTo(opts.box);
			else if(opts.type=='qq') $('<iframe width='+opts.width+' height='+opts.height+' src=http://v.qq.com/iframe/player.html?vid='+opts.vid+'&tiny=0&auto='+(opts.autoplay?1:0)+' frameborder=0 allowfullscreen></iframe>').appendTo(opts.box);
			else if(opts.type=='mp4'){
				var container=$('<video type=video/mp4 webkit-playsinline>').attr({src:opts.vid,poster:opts.poster,controls:opts.controls,autoplay:opts.autoplay}).appendTo(opts.box);
				if(opts.onEnded) container[0].addEventListener('ended',opts.onEnded,false);
			}//end else
		}//edn if
	}//end func
	
	function video_play(e){
		e.stopPropagation();
		var autoplay=e.data.autoplay;
		var controls=e.data.controls;
		var onEnded=e.data.onEnded;
		var onClose=e.data.onClose;
		var box=$("<aside class='videoBox' id='videoBox'></aside>").appendTo($('body')).show();
		var url=$(this).data('url');
		var type=video.getType(url);
		var vid=video.getVid(url,type);
		if(vid && vid!=''){
			var ht=$(window).width()*9/16;
			var top=$(window).height()/2-ht/2;
			if(type=='youku') $('<iframe width=100% height='+ht+' src=http://player.youku.com/embed/'+vid+ (autoplay?'?autoplay=true':'') + ' frameborder=0 allowfullscreen></iframe>').css({top:top}).appendTo(box);
			else if(type=='qq') $('<iframe width=100% height='+ht+' src=http://v.qq.com/iframe/player.html?vid='+vid+'&tiny=0&auto='+(autoplay?1:0)+' frameborder=0 allowfullscreen></iframe>').css({top:top}).appendTo(box);
			else if(type=='mp4'){
				var container=$('<video type=video/mp4 webkit-playsinline>').attr({src:vid,poster:$(this).data('poster'),controls:controls,autoplay:autoplay}).css({height:ht,top:top}).appendTo(box);
				if(onEnded) container[0].addEventListener('ended',onEnded,false);
			}//end else
		}//end if
		var close=$("<a class='close'></a>").appendTo(box).one('touchend',function(e){
			box.remove();
			if(onClose) onClose();
		});
	}//end event
	
	return video;
}//end import
