//2015.10.16
var iaudio=importAudio();

function importAudio(){
	var audio={};
	
	audio.on=function(option){
		if(option.src){
			var sound=new Audio();
			sound.src=option.src;
			sound.loop=option.loop!=null?option.loop:false;//如果loop设置成true就无法正确获得ended事件
			var volume=option.volume!=null?option.volume:1;
			var currentTime=option.currentTime!=null?option.currentTime:0;
			var autoplay=option.autoplay!=null?option.autoplay:false;
			var onLoadstart=option.onLoadstart;
			var onLoaded=option.onLoaded;
			var onEnded=option.onEnded;
			var onPlay=option.onPlay;
			var onPause=option.onPause;
			var onTimeupdate=option.onTimeupdate;
			sound.load();
			if(onLoadstart) sound.addEventListener('loadstart',onLoadstart,false);
			sound.addEventListener('loadeddata',sound_onloadeddata,false);
			if(onEnded) sound.addEventListener('ended',onEnded,false);
			if(onTimeupdate) sound.addEventListener('timeupdate',onTimeupdate,false);
			if(onPlay) sound.addEventListener('play',onPlay,false);
			if(onPause) sound.addEventListener('pause',onPause,false);
			return sound;
		}//end if
		
		function sound_onloadeddata(event){
			var src=get_src(this.src);
			console.log(src+' loaded');
			if(onLoaded) onLoaded(this);
			if(autoplay){
				this.volume=volume;
				this.currentTime=currentTime;
				this.play();
			}//end if
		}//end func
				
	}//end func
	
	audio.fadeIn=function(option){
		if(option && option.sound){
			var sound=option.sound;
			var speed=option.speed!=null?option.speed:0.1;
			var delay=option.delay!=null?option.delay:100;
			var volume=option.volume!=null?option.volume:0;
			var onComplete=option.onComplete;
		}//end if
		volume+=speed;
		volume=volume>1?1:volume;	
		sound.volume=volume;
		if(volume<1){
			option.volume=volume;
			setTimeout(audio.fadeIn,100,option);
		}//end if
		else if(onComplete) onComplete();
	}//end func
	
	audio.fadeOut=function(option){
		if(option && option.sound){
			var sound=option.sound;
			var speed=option.speed!=null?option.speed:0.1;
			var delay=option.delay!=null?option.delay:100;
			var volume=option.volume!=null?option.volume:1;
			var onComplete=option.onComplete;
		}//end if
		volume-=speed;
		volume=volume<0?0:volume;	
		sound.volume=volume;
		if(volume>0){
			option.volume=volume;
			setTimeout(audio.fadeOut,100,option);
		}//end if
		else if(onComplete) onComplete();
	}//end func
	
	function get_src(str){
		var ary=str.split('/');
		return ary[ary.length-1];
	}//end func
	
	return audio;
}//end import
