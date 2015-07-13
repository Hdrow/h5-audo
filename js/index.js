$(document).ready(function(){
	
	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox=$('aside.loadBox');
	
	//----------------------------------------加载页面图片----------------------------------------
	
	icom.screenTo169();//article标签适配，参数1:iphone4拉伸至iphone5,参数2：虚拟系统工具栏（无实体按键）的安卓把高度压缩至一屏
	//icom.addSignBar('本页面为测试版本,抽奖结果无效!');
	
	
	loadFunc();
	
	function loadFunc(){
		//loadBox.show();
		var loader = new PxLoader();
		loader.addImage('images/common/turn.gif');
		
		loader.addProgressListener(function(e) {
			//var per=Math.round(e.completedCount/e.totalCount*100);
		}); 	

		loader.addCompletionListener(function() {
			console.log('Load page images is completed!');
			//icom.fadeOut(loadBox,500);
			init();
			loader=null;
		});
		loader.start();	
	}//end func	
	
	
	//----------------------------------------页面逻辑代码----------------------------------------
	
	function init(){
		add_monitor();
	}//end func
	
	//----------------------------------------页面监测代码----------------------------------------
	function add_monitor(){
		//imonitor.add({obj:$('#btnTest'),action:'touchend',category:'首页',label:'测试按钮'});
	}//end func
	
});//end ready
