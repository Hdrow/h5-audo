$(document).ready(function(){
	
	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox=$('aside.loadBox');
	
	//----------------------------------------加载页面图片----------------------------------------
	
	/*
	loadFunc();
	
	function loadFunc(){
		loadBox.show();
		var loader = new PxLoader();
		loader.addImage('images/common/turn.gif');
		
		loader.addProgressListener(function(e) {
			//var per=Math.round(e.completedCount/e.totalCount*100);
		}); 	

		loader.addCompletionListener(function() {
			console.log('Load page images is completed!');
			icom.fadeOut(loadBox,500);
			init();
			loader=null;
		});
		loader.start();	
	}//end func	
	*/
	
	//----------------------------------------页面逻辑代码----------------------------------------
	
	init();
	
	function init(){
		icom.screenTo169(true,false);
		//icom.addSignBar('本页面为测试版本,抽奖结果无效!');
		//add_monitor();
	}//end func
	
	//----------------------------------------页面监测代码----------------------------------------
	function add_monitor(){
		//imonitor.add({obj:$('#btnTest'),action:'touchend',category:'首页',label:'测试按钮'});
	}//end func
	
});//end ready
