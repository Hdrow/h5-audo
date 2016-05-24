//2016.5.24
var ibgm=importBgm();

function importBgm(){
	var bgm={};
	
	bgm.load=function(src,options){
		var _this=this;
		var defaults = {btn:$('a.bgmBtn'),playClassName:'bgmPlay',stopClassName:'bgmStop'};
		var opts = $.extend(defaults,options);
		if(src!=''){
			_this.btn=opts.btn;
			_this.playClassName=opts.playClassName;
			_this.stopClassName=opts.stopClassName;
			_this.onStop=opts.onStop;
			_this.bgmPlay=sessionStorage.bgmPlay;
			_this.bgmPlay=_this.bgmPlay||1;
			_this.bgmPlay=parseInt(_this.bgmPlay);
			console.log('bgmPlay:'+_this.bgmPlay);
			_this.bgmTime=sessionStorage.bgmTime;
			_this.bgmTime=_this.bgmTime||0;
			_this.bgmTime=Number(_this.bgmTime);
			console.log('bgmTime:'+_this.bgmTime);
			_this.currentTime = _this.bgmTime; 
			_this.startTime = 0;
			_this.context = new window.webkitAudioContext();
			_this.source = null;
			_this.audioBuffer = null;
			loadAudioFile(src);
		}//edn if
		
		function loadAudioFile(url) {
		    var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
		    xhr.open('GET', url, true);
		    xhr.responseType = 'arraybuffer';
		    xhr.onload = function(e) { //下载完成
		        initSound(this.response);
		    };
		    xhr.send();
		}//edn func
		
		function initSound(arrayBuffer) {
		    _this.context.decodeAudioData(arrayBuffer, function(buffer) { //解码成功时的回调函数
		        _this.audioBuffer = buffer;
				if(_this.bgmPlay) _this.play();
				else _this.pause();
		    }, function(e) { //解码出错时的回调函数
		        console.log('Error decoding file', e);
		    });
		}//edn func
		
	}//end func
	
	bgm.play=function(){
		var _this=bgm;
		_this.bgmPlay=1;
		_this.startTime = _this.context.currentTime;
		_this.source = _this.context.createBufferSource();
	    _this.source.buffer = _this.audioBuffer;
	    _this.source.loop = true;
	    _this.source.connect(_this.context.destination);
	    _this.source.start(0,_this.currentTime % _this.audioBuffer.duration); 
	    _this.source.onended=_this.onStop;
		if(_this.btn.length>0) _this.btn.removeClass(_this.stopClassName).addClass(_this.playClassName).one('touchend',_this.pause);
	}//end func
	
	bgm.pause=function(e){
		var _this=bgm;
		if(_this.source){
			_this.source.stop(0);
			_this.bgmPlay=0;
	    	_this.currentTime += _this.context.currentTime - _this.startTime;
	    	_this.bgmTime=_this.currentTime;
		}//edn if
		if(_this.btn.length>0) _this.btn.removeClass(_this.playClassName).addClass(_this.stopClassName).one('touchend',_this.play);
	}//end func
	
	return bgm;
}//end import
