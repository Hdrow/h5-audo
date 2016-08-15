//2016.8.15

var ibgm=importBgm();

function importBgm(){
	var bgm={};
	
	bgm.init=function(options){
		var defaults = {webAudio:0,src:''};
		var opts = $.extend(defaults,options);
		if(opts.src!=''){
			ibase.creatNode('a',null,'bgmBtn',null);
			bgm.audio=iaudio.bgm({src:opts.src,onLoaded:opts.onLoad,webAudio:opts.webAudio});
		}//edn if
	}//edn func
	
	return bgm;
	
}//edn func

