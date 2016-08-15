//2016.8.15
var ibgm=importBgm();

function importBgm(){
	var bgm={};
	var defaults = {webAudio:0,src:''};
	var opts={};
	
	bgm.init=function(options){
		opts = $.extend(defaults,options);
		if(opts.src!=''){
			ibase.creatNode('a',null,'bgmBtn',null);
			bgm.audio=iaudio.bgm({src:opts.src,onLoaded:opts.onLoad,webAudio:opts.webAudio});
		}//edn if
	}//edn func
	
	bgm.href=function(url){
		if(url && url!=''){
			sessionStorage.bgmPlay=ibgm.audio.bgmPlay;
			var bgmTime=opts.webAudio?ibgm.audio.currentTime+ibgm.audio.context.currentTime-ibgm.audio.startTime:ibgm.audio.audio.currentTime;
			sessionStorage.bgmTime=ibgm.audio.bgmPlay?bgmTime:ibgm.audio.currentTime;
			location.href=url;
		}//edn func
	}//edn func
	
	return bgm;
	
}//edn func