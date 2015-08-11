//2015.7.7
var iaudio=importAudio();

function importAudio(){
	var audio={};
	
	audio.on=function(option){
		if(option && option.src && option.src!=""){
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
			sound.load();
			sound.addEventListener('loadstart',sound_loadstart,false);
			sound.addEventListener('loadeddata',sound_onloadeddata,false);
			sound.addEventListener('ended',sound_ended,false);
			sound.addEventListener('timeupdate',sound_timeupdate,false);
			sound.addEventListener('play',sound_play,false);
			sound.addEventListener('pause',sound_pause,false);
			return sound;
		}//end if
		
		function sound_loadstart(event){
			var src=get_src(this.src);
			console.log(src+' loadstart');
			if(onLoadstart) onLoadstart(this);
		}//end func
		
		function sound_onloadeddata(event){
			var src=get_src(this.src);
			console.log(src+' canplaythrough');
			console.log(src+' duration:'+this.duration);
			if(onLoaded) onLoaded(this);
			if(autoplay){
				this.volume=volume;
				this.currentTime=currentTime;
				this.play();
			}//end if
		}//end func
		
		function sound_ended(event){
			var src=get_src(this.src);
			console.log(src+' ended');
			if(onEnded) onEnded(this);
		}//end func
		
		function sound_timeupdate(event){
			//console.log('audio currentTime:'+this.currentTime);
		}//end func
		
		function sound_play(event){
			var src=get_src(this.src);
			console.log(src+' play');
			if(onPlay) onPlay(this);
		}//end func
		
		function sound_pause(event){
			var src=get_src(this.src);
			console.log(src+' pause');
			if(onPause) onPause(this);
		}//end func
		
		function get_src(str){
			var ary=str.split('/');
			return ary[ary.length-1];
		}//end func
		
	}//end func
	
	audio.play=function(sound,volume){
		if(sound){
			volume=volume!=null?volume:1;
			console.log('volume:'+volume);
			sound.volume=volume;
			sound.play();
		}//end if
	}//end func
	
	audio.stop=function(sound){
		if(sound){
			sound.currentTime=0;
			sound.pause();
		}//end if		
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
	
	return audio;
}//end import
