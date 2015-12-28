$(document).ready(function(){
	
	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox=$('aside.loadBox');
	var articleBox=$('article');
	
	var windowWd=$(window).width(),windowHt=$(window).height();
	console.log('window size:'+windowWd+'/'+windowHt);
	
	//sound
	var soundList={},soundMax=0,soundLoaded=0;
	var bgmTime,bgmPlay,bgmBtn;
	
	//----------------------------------------页面初始化----------------------------------------
	iOrient.init();//屏幕翻转锁定，默认锁定竖屏，横屏提示
	icom.screenTo169(true,true);//把article标签拉伸至iphone5的高宽比例
	//icom.screenToPx(320,504,true);//把以px为单位的article标签拉伸到适应屏幕的高宽比例，iphone4默认等比压缩左右留白
	loadBox.show();
	//iuser.init(userGetted);
	load_handler();
	
	//----------------------------------------微信用户登录验证----------------------------------------	
	function userGetted(data){
		console.log('用户头像：'+data.headimage);
		console.log('用户昵称：'+data.nickname);
		load_handler();
	}//end func
	
	//----------------------------------------加载页面图片----------------------------------------
	function load_handler(){
		var loader = new PxLoader();
		loader.addImage('images/common/turn.gif');
		
		loader.addProgressListener(function(e) {
			//var per=Math.round(e.completedCount/e.totalCount*100);
		}); 	

		loader.addCompletionListener(function() {
			console.log('页面图片加载完毕');
			//sound_handler();
			init_handler();
			loader=null;
		});
		loader.start();	
	}//end func	
	
	//----------------------------------------加载声音及处理----------------------------------------
	function sound_handler(){
		if(os.weixin) wx.ready(sound_creat);
		else sound_creat();
	}//end func
	
	function sound_creat(){	
		soundList.bgm=iaudio.on('sound/bgm.mp3',{loop:true,onLoaded:sound_loaded});
		soundMax=Object.keys(soundList).length;
		console.log('sound length:'+soundMax);
	}//end func
	
	function sound_loaded(){
		soundLoaded++;
		console.log('soundLoaded:'+soundLoaded);
		if(soundLoaded==soundMax){
			console.log('all sounds loaded');
			bgm_init();
			init_handler();
		}//end if
	}//end func
	
	function bgm_init(){
		if(soundList.bgm){
			bgmPlay=sessionStorage.bgmPlay;
			bgmPlay=bgmPlay||1;
			bgmPlay=parseInt(bgmPlay);
			bgmTime=sessionStorage.bgmTime;
			console.log('bgmTime:'+bgmTime);
			bgmTime=bgmTime||0;
			bgmTime=Number(bgmTime);
			bgmBtn=$('a.bgmBtn');
			if(bgmBtn.length>0) bgmBtn.show();
			if(bgmPlay==1) bgm_play();
			else bgm_stop();
		}//end if
	}//end func
	
	function bgm_play(){
		soundList.bgm.currentTime=bgmTime;
		soundList.bgm.play();
		bgmPlay=1;
		if(bgmBtn.length>0) bgmBtn.removeClass('bgmStop').addClass('bgmPlay').one('touchend',bgm_stop);
	}//end func
	
	function bgm_stop(){
		bgmTime=bgmPlay?soundList.bgm.currentTime:bgmTime;
		soundList.bgm.pause();
		bgmPlay=0;
		if(bgmBtn.length>0) bgmBtn.removeClass('bgmPlay').addClass('bgmStop').one('touchend',bgm_play);
	}//end func
	
	//----------------------------------------页面逻辑代码----------------------------------------
	function init_handler(){
		console.log('init handler');
		icom.fadeOut(loadBox,500);
		monitor_handler();
	}//end func
	
	//----------------------------------------页面监测代码----------------------------------------
	function monitor_handler(){
		//imonitor.add({obj:$('a.btnTest'),action:'touchend',category:'首页',label:'测试按钮'});
	}//end func
	
});//end ready
