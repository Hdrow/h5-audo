//2016.5.25
var iaudio=importAudio();

function importAudio(){
	var audio={};
	
	audio.on=function(list,options){
		var _this=this;
		if(list.length>0){
			this.soundList={};
			this.soundMax=0;
			this.soundLoaded=0;
			this.onProgress=options.onProgress;
			this.onComplete=options.onComplete;
			this.webAudio=options.webAudio!=null?options.webAudio:1;
			for(var i=0; i<list.length; i++){
				var defaults = {src:'',volume:1,loop:0,autoPlay:0,continuePlay:0,currentTime:0,backgroundMusic:0};
				var opts = $.extend(defaults,list[i]);
				if(opts.src!=''){
					var str1=opts.src.split('/');
					var name=str1[str1.length-1].split('.')[0];
					var option={
						src:opts.src,
						volume:opts.volume,
						loop:opts.loop,
						autoPlay:opts.autoPlay,
						continuePlay:opts.continuePlay,
						currentTime:opts.currentTime,
						onListLoaded:this.onListLoaded,
						onLoaded:opts.onLoaded,
						onEnded:opts.onEnded,
						onPlay:opts.onPlay,
						onPause:opts.onPause,
						backgroundMusic:opts.backgroundMusic
					};
					console.log(this.webAudio?'web audio mode':'local audio mode');
					if(this.webAudio) this.soundList[name]=new webAudio(option);
					else this.soundList[name]=new localAudio(option);
				}//edn if
			}//end for
			this.soundMax=Object.keys(this.soundList).length;
			console.log('sound length:'+this.soundMax);
			return this.soundList;
		}//edn if
		
	}//end func
	
	audio.onListLoaded=function(){
		var _this=audio;
		_this.soundLoaded++;
		if(_this) _this.onProgress(_this.soundLoaded/_this.soundMax);
		if(_this.soundLoaded==_this.soundMax){
			console.log(_this.soundLoaded+' sounds load complete');
			if(_this.onComplete) _this.onComplete();
		}//end if
	}//end func
	
	function localAudio(opts){
		var _this=this;
	    this.src=opts.src;
	    this.volume=opts.volume;
	    this.loop=opts.loop;
	    this.autoPlay=opts.autoPlay;
	    this.continuePlay=opts.continuePlay;
	    this.currentTime =opts.currentTime;
	    this.startTime = 0;
	    this.onListLoaded=opts.onListLoaded;
	    this.onLoaded=opts.onLoaded;
	    this.onEnded=opts.onEnded;
	    this.onPlay=opts.onPlay;
	    this.onPause=opts.onPause;
	    this.loaded=0;
	    this.played=0;
	    this.ended=0;
		this.sound=new Audio();
		this.sound.src=this.src;
		this.sound.volume=this.volume;
		this.sound.loop=this.loop;//如果loop设置成true就无法正确获得ended事件
		this.sound.load();
		this.sound.addEventListener('loadeddata',init,false);
		this.sound.addEventListener('ended',onEnded,false);
		if(this.onListLoaded) this.sound.addEventListener('loadeddata',this.onListLoaded,false);
		if(this.onLoaded) this.sound.addEventListener('loadeddata',this.onLoaded,false);
		if(this.onPlay) this.sound.addEventListener('play',this.onPlay,false);
		if(this.onPause) this.sound.addEventListener('pause',this.onPause,false);
		
		function init(event){
			_this.loaded=1;
			if(_this.autoPlay) this.play(); 
		}//end func
		
		function onEnded(event){
			_this.ended=1;
			if(_this.onEnded) _this.onEnded();
		}//end func
		
	}//end func
	
	localAudio.prototype.play=function(){
		if(!this.played && this.loaded){
			console.log(get_src(this.src)+' play');
			this.played=1;
			this.ended=0;
			this.sound.volume=this.volume;
			this.sound.currentTime=this.continuePlay?this.currentTime:0;
			this.sound.play();
		}//edn if
	}//end func
	
	localAudio.prototype.pause=function(){
	    if(this.played && this.loaded){
	    	console.log(get_src(this.src)+' pause');
	    	this.played=0;
	    	this.currentTime = this.sound.currentTime;
	    	this.sound.pause();
		}//edn if
	}//end func
	
	function webAudio(opts){
		this.context=new window.webkitAudioContext();
	    this.buffer=null;
	    this.source=null;
	    this.src=opts.src;
	    this.volume=opts.volume;
	    this.loop=opts.loop;
	    this.autoPlay=opts.autoPlay;
	    this.continuePlay=opts.continuePlay;
	    this.currentTime =opts.currentTime;
	    this.startTime = 0;
	    this.onListLoaded=opts.onListLoaded;
	    this.onLoaded=opts.onLoaded;
	    this.onEnded=opts.onEnded;
	    this.onPlay=opts.onPlay;
	    this.onPause=opts.onPause;
	    this.loaded=0;
	    this.played=0;
	    this.ended=0;
	    this.load();
	}//end func
	
	webAudio.prototype.load=function(){
		var _this=this;
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', this.src, true);
	    xhr.responseType = 'arraybuffer';
	    xhr.onload = function(e) {
			console.log(get_src(_this.src)+' loaded');
			_this.loaded=1;
			if(_this.onListLoaded) _this.onListLoaded();
			if(_this.onLoaded) _this.onLoaded();
	        init(this.response);
	    };
	    xhr.send();
	    
	    function init(arrayBuffer){
			_this.context.decodeAudioData(arrayBuffer, function(buffer) {
				_this.buffer = buffer;
				if(_this.autoPlay) _this.play();
		    }, function(e) {
		        console.log('Error decoding file', e);
		    });
	    }//edn func
	    
	}//edn prototype
	
	webAudio.prototype.play=function(){
		var _this=this;
		if(!this.played && this.loaded){
			console.log(get_src(this.src)+' play');
			this.played=1;
			this.ended=0;
			this.source = this.context.createBufferSource();
		    this.source.buffer = this.buffer;
		    this.source.loop = this.loop;
		    this.source.connect(this.context.destination);
		    this.source.start(0,this.continuePlay?this.currentTime % this.buffer.duration:0); 
		    this.startTime = this.context.currentTime;
		    this.source.onended=function(){
		    	if(_this.played){
		    		console.log(get_src(_this.src)+' ended');
		    		_this.played=0;
		    		_this.ended=1;
		    		if(_this.onEnded) _this.onEnded();
		    	}//edn if
		    };
		    if(this.onPlay) this.onPlay();
		}//edn if
	}//end prototype
	
	webAudio.prototype.pause=function(){
	    if(this.played && this.loaded && this.source){
	    	console.log(get_src(this.src)+' pause');
	    	this.played=0;
			this.source.stop(0);
	    	this.currentTime += this.context.currentTime - this.startTime;
	    	if(this.onPause) this.onPause();
		}//edn if
	}//end prototype
	
	audio.bgm=function(options){
		var defaults = {src:'',btn:$('a.bgmBtn'),playClassName:'bgmPlay',stopClassName:'bgmStop'};
		var opts = $.extend(defaults,options);
		var bgm={};
		if(opts.src!=''){
			bgm.bgmPlay=sessionStorage.bgmPlay;
			bgm.bgmPlay=bgm.bgmPlay||1;
			bgm.bgmPlay=parseInt(bgm.bgmPlay);
			console.log('bgmPlay:'+bgm.bgmPlay);
			bgm.bgmTime=sessionStorage.bgmTime;
			bgm.bgmTime=bgm.bgmTime||0;
			bgm.bgmTime=Number(bgm.bgmTime);
			console.log('bgmTime:'+bgm.bgmTime);
			bgm.currentTime = bgm.bgmTime; 
			var startTime = 0;
			var context = new window.webkitAudioContext();
			var source = null;
			var buffer = null;
			load();
		}//edn if
		
		function load(){
			var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
		    xhr.open('GET', opts.src, true);
		    xhr.responseType = 'arraybuffer';
		    xhr.onload = function(e) { //下载完成
		        init(this.response);
		    };
		    xhr.send();
		    
		}//edn func
		
		function init(arrayBuffer) {
		    context.decodeAudioData(arrayBuffer, function(buf) { //解码成功时的回调函数
		        buffer = buf;
				if(bgm.bgmPlay) bgm.play();
				else bgm.pause();
		    }, function(e) { //解码出错时的回调函数
		        console.log('Error decoding file', e);
		    });
		}//end func
		
		bgm.play=function(e){
			bgm.bgmPlay=1;
			source = context.createBufferSource();
		    source.buffer = buffer;
		    source.loop = true;
		    source.connect(context.destination);
		    source.start(0,bgm.currentTime % buffer.duration);
		    startTime = context.currentTime;
			if(opts.btn.length>0) opts.btn.removeClass(opts.stopClassName).addClass(opts.playClassName).one('touchend',bgm.pause);
		}//end func
		
		bgm.pause=function(e){
			if(source){
				bgm.bgmPlay=0;
				source.stop(0);
		    	bgm.currentTime += context.currentTime - startTime;
		    	bgm.bgmTime=bgm.currentTime;
			}//edn if
			if(opts.btn.length>0) opts.btn.removeClass(opts.playClassName).addClass(opts.stopClassName).one('touchend',bgm.play);
		}//end func		
		
		return bgm;
		
	}//end func
	
	function get_src(str){
		var ary=str.split('/');
		return ary[ary.length-1];
	}//end func
	
	return audio;
}//end import