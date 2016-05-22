$(document).ready(function(){
	
	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox=$('aside.loadBox');
	var articleBox=$('article');
	
	var windowWd=$(window).width(),windowHt=$(window).height();
	console.log('window size:'+windowWd+'/'+windowHt);
	
	//----------------------------------------页面初始化----------------------------------------
	iorient.init();//屏幕翻转锁定，默认锁定竖屏，横屏提示
	icom.screenTo169(true,true);//把article标签拉伸至iphone5的高宽比例
//	loadBox.show();
	iuser.init(userGetted);
//	load_handler();
//	sound_handler();
	
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
		
		//实际加载进度
//		loader.addProgressListener(function(e) {
//			var per=Math.round(e.completedCount/e.totalCount*50);
//			loadPer.html(per+'%');
//		}); 	
		
		loader.addCompletionListener(function() {
			init_handler();
//			load_timer(50);//模拟加载进度
			loader=null;
		});
		loader.start();	
	}//end func
	
	//模拟加载进度
	function load_timer(per){
		per=per||0;
		per+=imath.randomRange(1,3);
		per=per>100?100:per;
		loadPer.html(per+'%');
		if(per==100) setTimeout(init_handler,200);
		else setTimeout(load_timer,33,per);
	}//edn func
	
	//----------------------------------------加载声音及处理----------------------------------------
	var soundList={},soundMax=0,soundLoaded=0,soundCreated=false;
	var bgmTime,bgmPlay,bgmBtn=$('a.bgmBtn');
	
	function sound_handler(){
		if(os.weixin) wx.ready(sound_creat);
		else{
			if(os.test) sound_creat();//测试环境
			else if(bgmBtn.length>0) bgmBtn.addClass('bgmStop').one('touchend',sound_creat);//手机非微信环境
		}//end else
	}//end func
	
	function sound_creat(){
		soundCreated=true;
		if(!os.weixin && bgmBtn.length>0) bgmBtn.off('touchend',sound_creat);
		soundList.bgm=iaudio.on('sound/bgm.mp3',{loop:true,onLoaded:sound_loaded});
		soundMax=Object.keys(soundList).length;
		console.log('sound length:'+soundMax);
	}//end func
	
	function sound_loaded(sound){
		soundLoaded++;
//		console.log('soundLoaded:'+soundLoaded);
		if(soundLoaded==soundMax){
			console.log(soundLoaded+' sounds loaded');
			if(soundList.bgm) bgm_init();
		}//end if
	}//end func
	
	function bgm_init(){
		bgmPlay=sessionStorage.bgmPlay;
		bgmPlay=bgmPlay||1;
		bgmPlay=parseInt(bgmPlay);
		bgmTime=sessionStorage.bgmTime;
		console.log('bgmTime:'+bgmTime);
		bgmTime=bgmTime||0;
		bgmTime=Number(bgmTime);
		if(bgmBtn.length>0) bgmBtn.show();
		if(bgmPlay==1) bgm_play();
		else bgm_stop();
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
//		imonitor.add({obj:$('a.btnTest'),action:'touchend',category:'首页',label:'测试按钮'});
	}//end func
	
});//end ready
