$(document).ready(function(){
	
	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox=$('aside.loadBox');
	var articleBox=$('article');
	
	//sound
	var soundList={},soundLoaded=0;
	var btnSound=$('a.btnSound');
	
	//----------------------------------------页面初始化----------------------------------------
	icom.screenTo169(true);//article标签高度适配，把iphone4拉伸至iphone5，默认值true
	//loadBox.show();
	
	//----------------------------------------微信用户登录验证----------------------------------------
	iuser.init(userGetted);
	
	function userGetted(data){
		console.log('用户头像：'+data.headimage);
		console.log('用户昵称：'+data.nickname);
		load_handler();
	}//end func
	
	//----------------------------------------加载页面图片----------------------------------------
	
	function load_handler(){
		//loadBox.show();
		var loader = new PxLoader();
		loader.addImage('images/common/turn.gif');
		
		loader.addProgressListener(function(e) {
			//var per=Math.round(e.completedCount/e.totalCount*100);
		}); 	

		loader.addCompletionListener(function() {
			console.log('页面图片加载完毕');
			//icom.fadeOut(loadBox,500);
			//sound_handler();
			init_handler();
			loader=null;
		});
		loader.start();	
	}//end func	
	
	//----------------------------------------加载声音及处理----------------------------------------
	function sound_handler(){
		//新SDK自动播放背景音乐
		if(os.weixin) wx.ready(sound_creat);
		else sound_creat();
	}//end func
	
	function sound_creat(){	
		soundList.bgm=iaudio.on({src:'sound/bgm.mp3',loop:true,onLoaded:bgm_play});
		console.log('sound length:'+soundMax);
	}//end func
	
	function sound_loaded(){
		soundLoaded++;
		console.log('soundLoaded:'+soundLoaded);
		if(soundLoaded==soundList.length){
			console.log('all sounds loaded');
			//icom.fadeOut(loadBox,500);
			//init_handler();
		}//end if
	}//end func
	
	function bgm_play(){
		soundList.bgm.play();
		if(btnSound.length>0) btnSound.show().removeClass('stop').addClass('play').one('touchend',bgm_stop);
	}//end func
	
	function bgm_stop(){
		soundList.bgm.pause();
		if(btnSound.length>0) btnSound.removeClass('play').addClass('stop').one('touchend',bgm_play);
	}//end func	
	
	
	//----------------------------------------页面逻辑代码----------------------------------------
	function init_handler(){
		//icom.fadeOut(loadBox,500);
		monitor_handler();
	}//end func
	
	//----------------------------------------页面监测代码----------------------------------------
	function monitor_handler(){
		//imonitor.add({obj:$('a.btnTest'),action:'touchend',category:'首页',label:'测试按钮'});
	}//end func
	
});//end ready
