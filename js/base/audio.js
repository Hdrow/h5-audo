//2016.5.24
var iaudio=importAudio();

function importAudio(){
	var audio={};
	
	audio.load=function(list,options){
		var _this=this;
		if(list.length>0){
			_this.soundList={};
			_this.soundCreated=false;
			_this.soundMax=0;
			_this.soundLoaded=0;
			_this.soundCreated=true;
			for(var i=0; i<list.length; i++){
				var src=list[i].src||'';
				var loop=list[i].loop||0;
				if(src!=''){
					var str1=src.split('/');
					var name=str1[str1.length-1].split('.')[0];
					_this.soundList[name]=_this.on(src,{loop:loop,onLoaded:sound_loaded});
				}//edn if
			}//end for
			_this.soundMax=Object.keys(_this.soundList).length;
			console.log('sound length:'+_this.soundMax);
		}//edn if
		
		function sound_loaded(sound){
			_this.soundLoaded++;
			if(options.onProgress) options.onProgress(_this.soundLoaded/_this.soundMax);
			if(_this.soundLoaded==_this.soundMax){
				console.log(_this.soundLoaded+' sounds loaded');
				if(options.onComplete) options.onComplete(_this.soundList);
			}//end if
		}//end func
		
	}//end func
	
	
	
	audio.on=function(src,options){
		var _this=this;
		if(src && src!=''){
			var sound=new Audio();
			var defaults = {loop:false,volume:1,currentTime:0,autoplay:false};
			var opts = $.extend(defaults,options);
			sound.src=src;
			sound.volume=opts.volume;
			sound.loop=opts.loop;//如果loop设置成true就无法正确获得ended事件
			sound.load();
			if(opts.onLoadstart) sound.addEventListener('loadstart',opts.onLoadstart,false);
			sound.addEventListener('loadeddata',sound_onloadeddata,false);
			if(opts.onEnded) sound.addEventListener('ended',opts.onEnded,false);
			if(opts.onTimeupdate) sound.addEventListener('timeupdate',opts.onTimeupdate,false);
			if(opts.onPlay) sound.addEventListener('play',opts.onPlay,false);
			if(opts.onPause) sound.addEventListener('pause',opts.onPause,false);
			return sound;
		}//end if
		
		function sound_onloadeddata(event){
			var src=get_src(this.src);
			console.log(src+' loaded');
			if(opts.onLoaded) opts.onLoaded(this);
			if(opts.autoplay) _this.play(this,{volume:opts.volume,currentTime:opts.currentTime}); 
		}//end func
				
	}//end func
	
	audio.play=function(sound,options){
		var _this=this;
		if(sound){
			var defaults = {volume:1,currentTime:0,autoplay:false};
			var opts = $.extend(defaults,options);
			sound.volume=opts.volume;
			sound.currentTime=opts.currentTime;
			sound.play();
		}//end if
	}//end func
	
	/*
	audio.fadeIn=function(sound,options){
		if(sound){
			var defaults = {speed:0.1,delay:100,volume:0};
			var opts = $.extend(defaults,options);
			if(opts.volume==0) sound.play();
			opts.volume+=opts.speed;
			opts.volume=opts.volume>1?1:opts.volume;	
			sound.volume=opts.volume;
			if(opts.volume<1) setTimeout(audio.fadeIn,opts.delay,sound,opts);
			else if(opts.onComplete) opts.onComplete();
		}//end if
	}//end func
	
	audio.fadeOut=function(sound,options){
		if(sound){
			var defaults = {speed:0.1,delay:100,volume:1};
			var opts = $.extend(defaults,options);
			opts.volume-=opts.speed;
			opts.volume=opts.volume<0?0:opts.volume;	
			sound.volume=opts.volume;
			if(opts.volume>0) setTimeout(audio.fadeOut,opts.delay,sound,opts);
			else{
				sound.pause();
				if(opts.onComplete) opts.onComplete();
			}//end else
		}//end if
	}//end func
	*/
	
	function get_src(str){
		var ary=str.split('/');
		return ary[ary.length-1];
	}//end func
	
	return audio;
}//end import
