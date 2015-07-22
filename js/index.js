$(document).ready(function(){
	
	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox=$('aside.loadBox');
	var articleBox=$('article');
	
	//----------------------------------------页面初始化----------------------------------------
	icom.screenTo169();//article标签高度适配，参数1:iphone4拉伸至iphone5，默认值：true；参数2：虚拟系统工具栏（无实体按键）的安卓把高度压缩至一屏，默认值：true
	//icom.addSignBar('本页面为测试版本,抽奖结果无效!');
	
	//----------------------------------------微信用户登录验证----------------------------------------
//	iuser.init(userGetted);
//	
//	function userGetted(data){
//		console.log('用户头像：'+data.headimage);
//		console.log('用户昵称：'+data.nickname);
//		loadFunc();
//	}//end func
	
	//----------------------------------------加载页面图片----------------------------------------
	
	loadFunc();
	
	function loadFunc(){
		//loadBox.show();
		var loader = new PxLoader();
		loader.addImage('images/common/turn.gif');
		
		loader.addProgressListener(function(e) {
			//var per=Math.round(e.completedCount/e.totalCount*100);
		}); 	

		loader.addCompletionListener(function() {
			console.log('页面图片加载完毕');
			//icom.fadeOut(loadBox,500);
			init();
			loader=null;
		});
		loader.start();	
	}//end func	
	
	
	//----------------------------------------页面逻辑代码----------------------------------------
	
	function init(){
		
	}//end func
	
	//----------------------------------------页面监测代码----------------------------------------
	monitor_handler();
	function monitor_handler(){
		//imonitor.add({obj:$('a.btnTest'),action:'touchend',category:'首页',label:'测试按钮'});
	}//end func
	
});//end ready
